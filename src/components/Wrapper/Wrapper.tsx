import { FunctionComponent, ReactElement } from "react";
import { Admin } from "../../pages/Admin";
import Links from "../Links/Links";
import styles from "./Wrapper.module.scss";

interface IWrapperProps {
  children: ReactElement;
}

export const Wrapper: FunctionComponent<IWrapperProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      {/* <Links /> */}
      {/* <Admin /> */}
      {children}
    </div>
  );
};
