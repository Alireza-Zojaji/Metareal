import { useGemStore } from "@/Zustands/Models/GemStore/GemStore";
import storyBeforeLogin from "./StoryBeforeLogin/StoryBeforeLogin";
import StoryGameStarted from "./StoryGameStarted/StoryGameStarted";
import { addAvatarLayer, hideAvatarLayer } from "@/Models/AvatarModel/AvatarModel";
import { addAvatarLogics } from "@/Logics/AvatarLogic/AvatarLogic";
import { addAvatarGemLogic } from "@/Logics/AvatarGemLogic/AvatarGemLogic";
import { useAvatarStore } from "@/Zustands/Models/AvatarStore/AvatarStore";
import { addCarLayer } from "@/Models/CarModel/CarModel";
import { addCarLogics } from "@/Logics/CarLogic/CarLogic";
import { useEffect } from "react";
import { useStoryStore } from "@/Zustands/StoryStore/StoryStore";

const Stories = () => {

  storyBeforeLogin();
  // StoryGameStarted();
};
export default Stories;
