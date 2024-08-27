import { useEffect, useRef } from "react";
import { useCarStore } from "@/Zustands/Models/CarStore/CarStore";
import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";
import * as THREE from "three";
import { useCallback } from "react";
import { useStoryContext } from "@/Contexts/StoryContext/StoryContext";
import gsap from "gsap";
import { GLOBAL_PITCH } from "@/Constants/Constants";
export const addCarLogics = () => {
  const { currentCharacter } = useStoryContext();
  const currentCharacterRef = useRef(currentCharacter);
  useEffect(() => {
    currentCharacterRef.current = currentCharacter;
  }, [currentCharacter]);
  const { mapRef } = useMapboxContext();
  const car = useCarStore((state) => state.carModel);
  const keys = {
    a: false,
    s: false,
    d: false,
    w: false,
    k: false,
    l: false,
  };
  const handleKey = useCallback(
    (e, isDown) => {
      const key = e.code.replace("Key", "").toLowerCase();
      if (key in keys) keys[key] = isDown;
    },
    [keys]
  );
  useEffect(() => {
    document.body.addEventListener("keydown", (e) => handleKey(e, true));
    document.body.addEventListener("keyup", (e) => handleKey(e, false));
    return () => {
      document.body.removeEventListener("keydown", (e) => handleKey(e, true));
      document.body.removeEventListener("keyup", (e) => handleKey(e, false));
    };
  }, [handleKey]);
  useEffect(() => {
    if (!car) return;
    const api = { acceleration: 1, inertia: 0.01 };
    let velocity = 0.0;
    let ds = 0.005;
    const easing = (t) => t * (2 - t);
    const toDeg = (rad) => (rad / Math.PI) * 180;
    const toRad = (deg) => (deg * Math.PI) / 180;
    car.set({
      worldTranslate: new THREE.Vector3(0, 0, 0),
      quaternion: [new THREE.Vector3(0, 0, 1), 1.41],
    });
    const map = mapRef.current;
    const inertia = api.inertia;
    const acceleration = api.acceleration;
    gsap.ticker.add(() => {
      if (currentCharacterRef.current != "car") return;

      ds = keys.l ? 0.02 : 0.005;
      let speed = 0.0;
      if (!keys.w && !keys.s) {
        if (Math.abs(velocity) < 0.0008) {
          velocity = 0.0;
        } else {
          speed = velocity > 0 ? -inertia * ds : inertia * ds;
        }
      } else {
        speed = keys.w ? acceleration * ds : -acceleration * ds;
      }
      velocity += (speed - velocity) * acceleration * ds;
      if (speed === 0.0) velocity = 0;
      car.set({ worldTranslate: new THREE.Vector3(0, -velocity, 0) });
      let rad = (keys.k ? 1 : 0.05) * (keys.d ? -1 : keys.a ? 1 : 0) * toRad(1);
      if (keys.a || keys.d) {
        car.set({ quaternion: [new THREE.Vector3(0, 0, 1), car.rotation.z + rad] });
      }
      map.jumpTo({
        center: car.coordinates,
        bearing: keys.a || keys.d ? -toDeg(car.rotation.z) : map.getBearing(),
        easing,
        pitch: GLOBAL_PITCH,
        zoom: 30,
      });
    });
  }, [car, mapRef, currentCharacter]);
  return null;
};
