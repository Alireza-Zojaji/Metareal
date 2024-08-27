import { useCallback, useEffect, useMemo, useRef } from "react";
import { useAvatarStore } from "@/Zustands/Models/AvatarStore/AvatarStore";
import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useStoryContext } from "@/Contexts/StoryContext/StoryContext";
import { gsap } from "gsap";
import { GLOBAL_PITCH } from "@/Constants/Constants";
const keys = { a: false, s: false, d: false, w: false, k: false, l: false };
const glftAnimations = {
  gltfStand: null,
  gltfWalk: null,
  gltfRun: null,
  load: function () {
    new GLTFLoader().load("/animations/Standing.glb", (gltfLoaded) => {
      this.gltfStand = gltfLoaded;
    });
    new GLTFLoader().load("/animations/Walk.glb", (gltfLoaded) => {
      this.gltfWalk = gltfLoaded;
    });
    new GLTFLoader().load("/animations/Run.glb", (gltfLoaded) => {
      this.gltfRun = gltfLoaded;
    });
  },
};
glftAnimations.load();
let loadedFlag = false;
export const addAvatarLogics = () => {
  const { currentCharacter } = useStoryContext();
  const currentCharacterRef = useRef(currentCharacter);
  useEffect(() => {
    currentCharacterRef.current = currentCharacter;
  }, [currentCharacter]);

  const { mapRef } = useMapboxContext();
  const avatar = useAvatarStore((state) => state.avatarModel);
  const setAvatarAdded = useAvatarStore((state) => state.setAvatarAdded);
  const clock = new THREE.Clock();
  const mixer = useMemo(() => new THREE.AnimationMixer(avatar), [avatar]);
  const handleKey = useCallback((e, isDown) => {
    const key = e.code.replace("Key", "").toLowerCase();
    if (key in keys) keys[key] = isDown;
  }, []);
  const easing = (t) => t * (2 - t);
  const toDeg = (rad) => (rad / Math.PI) * 180;
  const toRad = (deg) => (deg * Math.PI) / 180;

  useEffect(() => {
    const handleKeyDown = (e) => handleKey(e, true);
    const handleKeyUp = (e) => handleKey(e, false);
    document.body.addEventListener("keydown", handleKeyDown);
    document.body.addEventListener("keyup", handleKeyUp);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
      document.body.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKey]);
  useEffect(() => {
    if (!avatar || !glftAnimations || !mapRef.current) return;
    setAvatarAdded(true);

    if (!loadedFlag) {
      avatar.set({
        worldTranslate: new THREE.Vector3(0, 0, 0),
        quaternion: [new THREE.Vector3(0, 0, 1), toRad(270)],
      });
      mapRef.current.flyTo({
        center: avatar.coordinates,
        bearing: 50,
        pitch: GLOBAL_PITCH,
      });
    }
    const api = { acceleration: 1, inertia: 0.01 };
    avatar.animations.length = 0;
    avatar.animations.push(glftAnimations.gltfStand.animations[0], glftAnimations.gltfWalk.animations[0], glftAnimations.gltfRun.animations[0]);
    let is_key_s_pressed = false;
    let hasRotated = false; // Add this flag
    gsap.ticker.add(() => {
      if (currentCharacterRef.current !== "avatar") return;
      const playAnimation = (animation) => {
        if (animation?.uuid && !mixer.clipAction(animation).isRunning()) {
          Object.values(avatar.animations).forEach((anim) => {
            if (anim.uuid && anim !== animation) mixer.clipAction(anim).stop();
          });
          mixer.clipAction(animation).play();
        }
      };
      const animationToPlay = keys.l ? avatar.animations[2] : keys.a || keys.s || keys.d || keys.w ? avatar.animations[1] : avatar.animations[0];
      playAnimation(animationToPlay);
      mixer.update(clock.getDelta());
      avatar.getObjectByName("Hips").position.set(0, avatar.getObjectByName("Hips").position.y, 0);
      // const speed = (keys.w || keys.s ? api.acceleration : 0) * (keys.l ? 0.004 : 0.002);
      const speed = (keys.w || keys.s ? api.acceleration : 0) * (keys.l ? 0.008 : 0.002);
      avatar.set({ worldTranslate: new THREE.Vector3(0, -speed, 0) });
      const rotationDirection = keys.d ? -1 : 1;
      const rad = toRad(keys.k ? 1 : 1) * (keys.a || keys.d ? rotationDirection : 0);
      if (keys.a || keys.d) avatar.set({ quaternion: [new THREE.Vector3(0, 0, 1), avatar.rotation.z + rad] });
      if (keys.s && !is_key_s_pressed && !hasRotated) {
        hasRotated = true;
        avatar.set({ quaternion: [new THREE.Vector3(0, 0, 1), avatar.rotation.z + Math.PI] });
        is_key_s_pressed = true;
      } else if (!keys.s) {
        is_key_s_pressed = false;
      }
      if (!keys.w && !keys.s && !keys.a && !keys.d) return;
      const bearingCalculation = (keys.a && !keys.s) || (keys.d && !keys.s) || keys.w ? -toDeg(avatar.rotation.z) : hasRotated ? 180 - toDeg(avatar.rotation.z) : mapRef.current.getBearing();
      mapRef.current.jumpTo({
        pitch: GLOBAL_PITCH,
        center: avatar.coordinates,
        bearing: bearingCalculation,
        easing,
        zoom:25,
      });
    });
  }, [avatar, mapRef, glftAnimations, currentCharacter]);
  return null;
};
