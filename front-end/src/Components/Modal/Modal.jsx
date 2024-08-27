import { useModalStore } from "@/Zustands/ComponentStore/ModalStore";
import { Body, Container, Icon, Inside } from "@/Components/Tags/Tags";
import { X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../Inputs/Inputs";
const Modal = ({ children, state, dialogClass, title, header, footer, buttonAction, buttonText = "Continue", className }) => {
  const { modalState, closeModal } = useModalStore();
  const animationClass = modalState == state ? "animate__fadeIn" : "animate__fadeOut";
  return (
    <>
      <AnimatePresence mode="wait">
        {modalState == state && (
          <motion.dialog initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.0 }} open={modalState == state}>
            <Container onClick={closeModal} className={cn("inset-0 fixed bg-black/70 flex-center", dialogClass)}>
              <Inside onClick={(e) => e.stopPropagation()} className={cn("rounded-box max-w-xl w-full bg-neutral p-5", className)}>
                {!header ? (
                  <>
                    <header className={"flex justify-between border-b border-base-100  pb-4 items-center "}>
                      <div className={"text-lg font-semibold"}>{title}</div>
                      <Icon onClick={closeModal} className={"cursor-pointer"}>
                        <X weight="bold" />
                      </Icon>
                    </header>
                  </>
                ) : (
                  header
                )}
                <Body className={"py-4"}>{children}</Body>
                {!footer ? (
                  <>
                    <footer className={"flex  justify-end"}>
                      <Button onClick={buttonAction || closeModal}>{buttonText}</Button>
                    </footer>
                  </>
                ) : (
                  footer
                )}
              </Inside>
            </Container>
          </motion.dialog>
        )}
      </AnimatePresence>
    </>
  );
};
export default Modal;
