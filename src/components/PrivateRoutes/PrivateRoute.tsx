import { FunctionComponent } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_PATHES } from "../../utils/constants";

export interface IPrivateRoutesProps {
  role: string;
}

export const PrivateRoutes: FunctionComponent<IPrivateRoutesProps> = ({
  role,
}) => {
  let auth = true;
  // let user = {
  //   role: "user",
  // };
  //return auth && role === user.role ? (
  return auth ? <Outlet /> : <Navigate to={AUTH_PATHES[0].path} />;
};
