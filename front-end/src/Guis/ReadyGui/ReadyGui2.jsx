import { AvatarCreator } from "@readyplayerme/react-avatar-creator";
import { Avatar } from "@readyplayerme/visage";
import { useState } from "react";
import addAvatarLayer from "@/Models/AvatarModel/AvatarModel";
import { addAvatarLogics } from "@/Logics/AvatarLogic/AvatarLogic";
import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";

const config = {
  clearCache: true,
  bodyType: "fullbody",
  quickStart: true,
  language: "en",
};

const style = { width: "100%", height: "100vh", border: "none" };
const ReadyGui = () => {
  // const [avatarUrl, setAvatarUrl] = useState("");
  // const { mapRef } = useMapboxContext();
  addAvatarLayer({ glbUrl: "./models/ready.glb" });
  addAvatarLogics();
  // const handleOnAvatarExported = (event) => {
  //   console.log(event.data);
  //   setAvatarUrl(event.data.url);
  //   addAvatarLayer({ glbUrl: event.data.url });
  // };
  
  // return (
  //   <>
  //     {/* <div hidden={avatarUrl}>
  //       <AvatarCreator subdomain="demo" config={config} style={style} onAvatarExported={handleOnAvatarExported} />
  //     </div> */}
  //     {/* {avatarUrl && <Avatar cameraInitialDistance={1} cameraTarget={1} background={"white"} modelSrc={avatarUrl} />} */}
  //   </>
  // );
};

export default ReadyGui;
