import React, { FunctionComponent } from "react";
import styles from "./CircleIcon.module.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface IAddCircleIconProps {
  onClick?: () => void;
}

export const CircleIcon: FunctionComponent<IAddCircleIconProps> = ({
  onClick,
}: IAddCircleIconProps) => {
  return (
    <div className={styles.addButtonWrapper}>
      <AddCircleIcon onClick={onClick} fontSize="large" />
    </div>
  );
};
