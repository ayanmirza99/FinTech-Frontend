import { createContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line react-refresh/only-export-components
export const ModalContext = createContext({});

const initialState = {
  title: "",
  description: "",
  showModal: false,
  onConfirm: () => {},
  child: undefined,
};

export const ModalProvider = ({ children }) => {
  const [dialogData, setDialogData] = useState(initialState);

  const handleModalClose = () => setDialogData(initialState);

  return (
    <ModalContext.Provider value={{ setDialogData, handleModalClose }}>
      <Dialog open={dialogData.showModal} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{dialogData.title}</DialogTitle>
          </DialogHeader>

          <div className="py-2 text-sm text-muted-foreground">
            {dialogData.description}
          </div>

          {dialogData.child}

          {!dialogData.child && (
            <DialogFooter>
              <Button
                onClick={dialogData.onConfirm}
                className="bg-primary hover:bg-primary/70"
              >
                Confirm
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {children}
    </ModalContext.Provider>
  );
};
