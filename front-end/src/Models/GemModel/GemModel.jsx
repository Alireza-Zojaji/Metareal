import { useEffect } from "react";
import { addMultiModelCustomLayer } from "@/Utils/modelUtils";
import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";
import { useGemStore } from "@/Zustands/Models/GemStore/GemStore";
import { addCarGemLogic } from "@/Logics/CarGemLogic/CarGemLogic";
import { GemCoords } from "./GemCoords";
import _ from "lodash";
export const addGemLayer = () => {
  let models = [];
  const coords = GemCoords;
  let newcoords = _.uniqWith(coords, _.isEqual);
  newcoords.map((coord) => {
    models.push({
      obj: "./models/gem/scene.gltf",
      origin: coord,
      scale: 0.5,
      store: useGemStore,
      rotation: { x: 90, y: 0, z: 0 },
    });
  });
  const { mapRef } = useMapboxContext();
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.on("load", function () {
        map.addLayer(
          addMultiModelCustomLayer({
            models: models,
            layerId: "3dGemsLayer",
            store: useGemStore,
          }),
          "waterway-label"
        );
      });
    }
  }, [mapRef]);
};
const GemModel = () => {
  addGemLayer();
  addCarGemLogic();
};

export default GemModel;
