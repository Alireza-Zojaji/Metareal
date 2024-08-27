import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";
import { useEffect, useState } from "react";

const RoadModel = () => {
  const { mapRef } = useMapboxContext();
  const [isLoaded, setIsLoaded] = useState(false);

  async function loadGeoJSON(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      return console.error("Error:", error);
    }
  }
  console.log('eee');

  useEffect(() => {
    if (mapRef.current && !isLoaded) {
      const map = mapRef.current;
      map.on('load', function() {
        loadGeoJSON("./roads/khomeiniRoad.geojson").then((data) => {
          if (!map.getSource("khomeiniRoadSource")) {
            map.addSource("khomeiniRoadSource", {
              type: "geojson",
              data: data,
            });
          }
          if (!map.getLayer("khomeiniRoadLayer")) {
            map.addLayer({
              id: "khomeiniRoadLayer",
              type: "line",
              source: "khomeiniRoadSource",
              paint: {
                "line-color": "green",
                "line-opacity": 0.1,
                "line-width": data.features[0].properties.lineWidth,
              },
            });
          }
          setIsLoaded(true);
        });
      });
    }
  }, [mapRef, isLoaded]);
};

export default RoadModel;
