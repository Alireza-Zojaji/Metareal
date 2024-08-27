import GatewayGui from "./GatewayGui/GatewayGui";
import GlassGui from "./GlassGui/GlassGui";
import TimerGui from "./TimerGui/TimerGui";
import { useGuiStore } from "@/Zustands/GuiStore/GuiStore";
const Guis = () => {
  const { guiStates } = useGuiStore();
  return (
    <>
      {guiStates.showTimerGui && <TimerGui />}
      {/* {guiStates.showGlassGui && <GlassGui />} */}
      {/* {guiStates.showGatewayGui && <GatewayGui />} */}
    </>
  );
};
export default Guis;
