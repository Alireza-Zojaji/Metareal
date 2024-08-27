import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";
import { useAvatarStore } from "@/Zustands/Models/AvatarStore/AvatarStore";
import { useGemStore } from "@/Zustands/Models/GemStore/GemStore";
import { useEffect } from "react";
import { quadtree } from "d3-quadtree";
import { useStoryContext } from "@/Contexts/StoryContext/StoryContext";
import { useKeyStore } from "@/Zustands/Models/KeyStore/KeyStore";
export const DISTANCE_THRESHOLD = 0.00002;
export const addAvatarGemLogic = () => {
  const avatar = useAvatarStore((state) => state.avatarModel);
  const key = useKeyStore((state) => state.keyModel);
  const { setKeyPicked } = useKeyStore();
  const gems = useGemStore((state) => state.gemModels);
  const { increaseGemPoints } = useStoryContext();
  const { mapRef } = useMapboxContext();
  useEffect(() => {
    if (!key || !avatar || !gems) return;
    const qt = quadtree()
      .x((d) => d.coordinates[0])
      .y((d) => d.coordinates[1])
      .addAll(gems);
    const keyQt = quadtree()
      .x((d) => d.coordinates[0])
      .y((d) => d.coordinates[1])
      .addAll([key]);
    const handleObjectChangedGem = () => {
      const closeGems = qt.find(avatar.coordinates[0], avatar.coordinates[1], DISTANCE_THRESHOLD);
      if (closeGems && mapRef.current.getLayer("3dGemsLayer")) {
        if (closeGems.visible == true) {
          closeGems.visible = false;
          increaseGemPoints();
        }
      }
    };
    const handleObjectChangedkey = () => {
      const closekeys = keyQt.find(avatar.coordinates[0], avatar.coordinates[1], DISTANCE_THRESHOLD);
      if (closekeys && mapRef.current.getLayer("3dKeyLayer")) {
        if (closekeys.visible == true) {
          closekeys.visible = false;
          setKeyPicked(true);
        }
      }
    };
    if (avatar) {
      avatar.addEventListener("ObjectChanged", handleObjectChangedGem);
      avatar.addEventListener("ObjectChanged", handleObjectChangedkey);
      return () => {
        avatar.removeEventListener("ObjectChanged", handleObjectChangedGem);
        avatar.removeEventListener("ObjectChanged", handleObjectChangedkey);
      };
    }
  }, [avatar, gems, key]);
};
