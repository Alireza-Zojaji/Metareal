import MapboxComponent from "@/Components/MapboxComponent/MapboxComponent";
import Stories from "./Stories/Stories";
import Guis from "./Guis/Guis";
import CarModel from "./Models/CarModel/CarModel";
// import CarLogics from "./Logics/CarLogic/CarLogic";
import RoadModel from "./Models/RoadModel/RoadModel";
import GemModel from "./Models/GemModel/GemModel";
import LogCoordinate from "./Developer/LogCoordinate";
import { useGemStore } from "./Zustands/Models/GemStore/GemStore";
import { useEffect } from "react";
import ReadyGui from "./Guis/ReadyGui/ReadyGui";
import AvatarModel from "./Models/AvatarModel/AvatarModel";
import KeyModel from "./Models/KeyModel/KeyModel";
import StreetExporter from "./Developer/StreetExporter";
function App() {
  return (
    <>
      <ReadyGui />
      <MapboxComponent className={cn("h-dvh w-dvw")} />
      <Stories />
      <Guis />
      <RoadModel />
      <CarModel />
      <AvatarModel />
      <GemModel />
      <KeyModel />
      <StreetExporter />
      {/* developer */}
      <LogCoordinate />
    </>
  );
}
export default App;
