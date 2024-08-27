import { useEffect } from "react";
import { createCustomLayer } from "@/Utils/modelUtils";
import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";
import { AVATAR_COORDINATE, CAR_COORDINATE } from "@/Constants/Constants";
import { useAvatarStore } from "@/Zustands/Models/AvatarStore/AvatarStore";
import { addAvatarLogics } from "@/Logics/AvatarLogic/AvatarLogic";
import { useReadyStore } from "@/Zustands/ReadyStore/ReadyStore";
import { addAvatarGemLogic } from "@/Logics/AvatarGemLogic/AvatarGemLogic";

export const hideAvatarLayer = () => {
  const avatarModel = useAvatarStore((state) => state.avatarModel);
  if (avatarModel) {
    avatarModel.visible = false;
  }
};
export const addAvatarLayer = () => {
  const { mapRef } = useMapboxContext();
  const readyAvatar = useReadyStore((state) => state.readyAvatar);
  useEffect(() => {
    if (mapRef.current && readyAvatar) {
      console.log(readyAvatar);
      const map = mapRef.current;
      const layerId = "3dAvatarLayer";
      const addLayer = () => {
        if (!map.getLayer(layerId)) {
          map.addLayer(
            createCustomLayer({
              model: {
                obj: readyAvatar,
                origin: AVATAR_COORDINATE,
                scale: 2,
                rotation: { x: 90, y: 0, z: 0 },
              },
              layerId: layerId,
              store: useAvatarStore,
            }),
            "waterway-label"
          );
        }
      };
      if (map.loaded()) {
        addLayer();
      } else {
        map.on("load", addLayer);
      }
    }
  }, [mapRef, readyAvatar]);

  //   useEffect(() => {
  //     if (mapRef.current) {
  //       const map = mapRef.current;
  //       const layerId = "3dAvatarLayer";
  //       const addLayer = () => {
  //         if (!map.getLayer(layerId)) {
  //           map.addLayer(
  //             createCustomLayer({
  //               model: {
  //                 obj: "https://models.readyplayer.me/65ef60e60d14e501b719813b.glb",
  //                 origin: AVATAR_COORDINATE,
  //                 scale: 2,
  //                 rotation: { x: 90, y: 0, z: 0 },
  //               },
  //               layerId: layerId,
  //               store: useAvatarStore,
  //             }),
  //             "waterway-label"
  //           );
  //         }
  //       };
  //       if (map.loaded()) {
  //         addLayer();
  //       } else {
  //         map.on("load", addLayer);
  //       }
  //     }
  //   }, [mapRef]);
  // };
};
const AvatarModel = () => {};

export default AvatarModel;
