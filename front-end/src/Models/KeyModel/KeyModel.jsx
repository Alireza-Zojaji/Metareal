import { useEffect } from "react";
import { createCustomLayer } from "@/Utils/modelUtils";
import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";
import { KEY_COORDINATE } from "@/Constants/Constants";
import { useKeyStore } from "@/Zustands/Models/KeyStore/KeyStore";
import { gsap } from "gsap";
export const addKeyLayer = () => {
  const { mapRef } = useMapboxContext();
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.on("load", function () {
        const layerId = "3dKeyLayer";
        if (!map.getLayer(layerId)) {
          map.addLayer(
            createCustomLayer({
              model: {
                obj: "./models/key/key.glb",
                origin: KEY_COORDINATE,
                scale: 20,
                rotation: { x: 180, y: 0, z: 0 },
              },
              layerId: layerId,
              store: useKeyStore,
            }),
            "waterway-label"
          );
        }
      });
    }
  }, [mapRef]);
};
const KeyModel = () => {
  const key = useKeyStore((state) => state.keyModel);
  if (key && !key.isRotating) {
    gsap.to(key.rotation, {
      z: "+=720",
      duration: 10,
      repeat: -1,
      ease: "none",
      onUpdate: () => key.set({ rotation: key.rotation }), // Update the key's rotation on each frame
    });
  }
  addKeyLayer();
};
export default KeyModel;
