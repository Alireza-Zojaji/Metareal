import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";
import { useEffect } from "react";
const LogCoordinate = () => {
  const { mapRef } = useMapboxContext();
let gems = [];
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on("click", (e) => {
        gems.push(e.lngLat);
        console.log(gems);
      });
    }
  }, [mapRef]);
};

export default LogCoordinate;
