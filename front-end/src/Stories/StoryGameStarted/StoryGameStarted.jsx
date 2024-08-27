import { AZADI_TOWER_COORDINATES, GLOBAL_PITCH } from "@/Constants/Constants";
import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";
import { useGuiStore } from "@/Zustands/GuiStore/GuiStore";
import { useStoryStore } from "@/Zustands/StoryStore/StoryStore";
import { useEffect } from "react";
const StoryGameStarted = () => {
  const { currentStory } = useStoryStore();
  const { setGuiStates } = useGuiStore();
  const { mapRef } = useMapboxContext();
  useEffect(() => {
    if (currentStory !== "StoryGameStarted" || !mapRef || !mapRef.current) return;
    const map = mapRef.current;
    map.stop();
    // map.setStyle("mapbox://styles/subdanial/clmotdjxu01ys01pba6z08b3m");
    let flyInterval = setInterval(() => {
      // if (map.isStyleLoaded() && map.getStyle().sprite == "mapbox://sprites/subdanial/clmotdjxu01ys01pba6z08b3m/0fiv850njnvwhs9bcoah4chlc") {
      if (true) {
        setGuiStates({ showGatewayGui: false, showGlassGui: true });
        map.flyTo({
          center: AZADI_TOWER_COORDINATES,
          zoom: 24,
          bearing: -90,
          pitch: GLOBAL_PITCH,
          // duration: 100,
          duration: 5000,
          essential: true,
        });
        map.once("moveend", () => {
          setGuiStates({ showGlassGui: false, showMinimap: true });
        });
        clearInterval(flyInterval);
      }
    }, 1000);









  }, [currentStory]);
};
export default StoryGameStarted;
