import { useModalStore } from "@/Zustands/ComponentStore/ModalStore";
import { useStoryStore } from "@/Zustands/StoryStore/StoryStore";

const StartButton = () => {
  const { setModalState } = useModalStore();
  const { setCurrentStory } = useStoryStore();
  return (
    <button onClick={() => setModalState("gateway")} type="button" className={"fixed w-80 h-20 bg-white/5 border-white/20 border bottom-10 z-10 mx-auto rounded-full hover:bg-white/10  text-xl left-0 right-0"}>
      Let's Explore the world
    </button>
    // <button onClick={() => setCurrentStory("StoryGameStarted")} type="button" className={"fixed w-80 h-20 bg-white/5 border-white/20 border bottom-10 z-10 mx-auto rounded-full hover:bg-white/10  text-xl left-0 right-0"}>
    //   Let's Explore the world
    // </button>
  );
};

export default StartButton;
