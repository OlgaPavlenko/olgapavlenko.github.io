import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FunctionComponent, ReactElement } from "react";
import styles from "./Modal.module.scss";

interface IModalProps {
  children: ReactElement | string;
  title: string;
  okText?: string;
  cancelText?: string;
  onOkClick: () => void;
  onCancelClick: () => void;
}

export const Modal: FunctionComponent<IModalProps> = (props) => {
  const { onOkClick, onCancelClick, okText, cancelText, title, children } =
    props;

  return (
    <div>
      <Dialog
        open={true}
        onClose={onCancelClick}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent className={styles.contentWrapper}>
          {children}
        </DialogContent>
        <DialogActions className={styles.actionButtonWrapper}>
          <Button onClick={onOkClick}>{okText || "Add"}</Button>
          <Button onClick={onCancelClick}>{cancelText || "Cancel"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
