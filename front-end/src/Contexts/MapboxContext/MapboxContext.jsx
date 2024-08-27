import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { AZADI_TOWER_COORDINATES } from "@/Constants/Constants";
import { Threebox } from "threebox-plugin";
export const MapboxContext = createContext();

export const MapboxContextProvider = ({ children }) => {
  const mapRef = useRef(null);
  const mapContainer = useRef(null);
  const zoom = 1;
  const projection = "globe";
  const style = "mapbox://styles/mapbox/outdoors-v12";
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (mapRef.current) return;
    mapboxgl.setRTLTextPlugin(
      "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
      null,
      true // Lazy load the plugin
    );

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      projection: projection,
      center: AZADI_TOWER_COORDINATES,
      zoom: 28,
      antialias: true,
      // pitch: 60,
    });
    mapRef.current.on("load", () => {
      mapRef.current.setFog({
        range: [0, -20],
        color: "white",
      "star-intensity": ["interpolate", ["linear"], ["zoom"], 5, 0.35, 6, 1],

        "horizon-blend": 0.1,
      });
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    if (!window.tb) {
      window.tb = new Threebox(map, map.getCanvas().getContext("webgl"), {
        defaultLights: true,
        enableRotatingObjects: true,
        enableSelectingObjects: true,
        realSunlight: true,
        multiLayer: true,
      });
    }
  }, [mapRef]);
  return <MapboxContext.Provider value={{ mapRef, mapContainer }}>{children}</MapboxContext.Provider>;
};
export const useMapboxContext = () => useContext(MapboxContext);
