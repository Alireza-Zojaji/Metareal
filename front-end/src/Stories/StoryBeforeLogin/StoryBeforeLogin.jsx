import { useEffect } from "react";
import { useGuiStore } from "@/Zustands/GuiStore/GuiStore";
import initialMapBox from "./initialMapBox/initialMapBox";
import { addAvatarLayer } from "@/Models/AvatarModel/AvatarModel";
import { addAvatarLogics } from "@/Logics/AvatarLogic/AvatarLogic";
import { addAvatarGemLogic } from "@/Logics/AvatarGemLogic/AvatarGemLogic";
import { useAvatarStore } from "@/Zustands/Models/AvatarStore/AvatarStore";
import { addCarLayer } from "@/Models/CarModel/CarModel";
import { addCarLogics } from "@/Logics/CarLogic/CarLogic";
import { useStoryContext } from "@/Contexts/StoryContext/StoryContext";
import { useCarStore } from "@/Zustands/Models/CarStore/CarStore";
import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";
import { CAR_COORDINATE, GLOBAL_PITCH } from "@/Constants/Constants";
import { useKeyStore } from "@/Zustands/Models/KeyStore/KeyStore";
import { useState } from "react";
import { addCarRoadLogic } from "@/Logics/CarRoadLogic/CarRoadLogic";
const storyBeforeLogin = () => {
  const { setCurrentCharacter, currentCharacter } = useStoryContext();
  const { mapRef } = useMapboxContext();
  const { setGuiStates } = useGuiStore();
  const keyPicked = useKeyStore((state) => state.keyPicked);
  const avatarModel = useAvatarStore((state) => state.avatarModel);
  const { gemPoints } = useStoryContext();
  const [flyDone, setFlyDone] = useState(false);
  initialMapBox();
  addAvatarLayer();
  addAvatarLogics();
  addCarLayer();
  addCarLogics();
  addCarRoadLogic();
  addAvatarGemLogic();
  useEffect(() => {
    if (!currentCharacter) {
      setCurrentCharacter("avatar");
    }
    if (keyPicked && !flyDone) {
      // Modify this line
      avatarModel.visible = false;
      setCurrentCharacter(null);
      setTimeout(() => {
        mapRef.current.flyTo({
          center: CAR_COORDINATE,
          bearing: 50,
          duration: 3000,
          pitch: GLOBAL_PITCH,
        });
      }, 10);
      setTimeout(() => {
        setCurrentCharacter("car");
        setFlyDone(true);
        setGuiStates({ showTimerGui: true });
      }, 3000);
    }
  }, [currentCharacter, gemPoints, keyPicked, flyDone]);
};

export default storyBeforeLogin;
