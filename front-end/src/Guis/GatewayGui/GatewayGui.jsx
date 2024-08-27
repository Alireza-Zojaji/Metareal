import { Fixed, Flex } from "@/Components/Tags/Tags";
import StartButton from "./StartButton/StartButton";
import Modal from "@/Components/Modal/Modal";
import { Button, Input } from "@/Components/Inputs/Inputs";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useMainStore } from "@/Zustands/MainStore/MainStore";
import { useStoryStore } from "@/Zustands/StoryStore/StoryStore";
import { useModalStore } from "@/Zustands/ComponentStore/ModalStore";
const GatewayGui = () => {
  const { open } = useWeb3Modal();
  const { closeModal } = useModalStore();
  const { username, setUsername } = useMainStore();
  const { setCurrentStory } = useStoryStore();
  return (
    <>
      <Fixed className={"z-1 inset-0"}>
        <Modal
          title={"Authentication"}
          footer={
            <Flex className={"justify-end gap-2"}>
              <Button onClick={open} className={"btn btn-secondary"}>
                Already signed up?
              </Button>
              <Button
                onClick={() => {
                  closeModal();
                  setCurrentStory("StoryGameStarted");
                }}
              >
                Submit
              </Button>
            </Flex>
          }
          state="gateway"
        >
          <Input onChange={(e) => setUsername(e.target.value)} autoFocus label="Username" placeholder={"Choose your nickname"} />
        </Modal>
        <StartButton />
      </Fixed>
    </>
  );
};
export default GatewayGui;
