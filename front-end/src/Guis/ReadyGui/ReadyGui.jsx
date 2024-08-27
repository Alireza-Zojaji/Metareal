import { AvatarCreator } from "@readyplayerme/react-avatar-creator";
import { useReadyStore } from "@/Zustands/ReadyStore/ReadyStore";
import { useAvatarStore } from "@/Zustands/Models/AvatarStore/AvatarStore";
import { useState } from "react";
const config = {
  clearCache: false,
  bodyType: "fullbody",
  quickStart: true,
  language: "en",
};

const style = { width: "100%", height: "100vh", border: "none" };

const ReadyGui = () => {
  const { setReadyAvatar } = useReadyStore();
  const [isReadyGuiHidden, setIsReadyGuiHidden] = useState(false);
  const handleOnAvatarExported = (event) => {
    setIsReadyGuiHidden(true);
    setReadyAvatar(event.data.url);
  };
  const avatarAdded = useAvatarStore((state) => state.avatarAdded);
  // return null;
  return (
    <>
      {!avatarAdded && isReadyGuiHidden && (
        <div className="fixed  top-0 z-50 inset-0 bg-black flex items-center justify-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
      <div hidden={isReadyGuiHidden}>
        <AvatarCreator   subdomain="demo" config={config} style={style} onAvatarExported={handleOnAvatarExported} />
      </div>
    </>
  );
};

export default ReadyGui;
