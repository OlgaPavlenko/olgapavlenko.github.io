import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ADMIN_PATHES, PATHES } from "../../utils/constants";

const Links: FunctionComponent = () => {
  return (
    <div>
      <ul style={{ display: "flex", listStyle: "none", flexWrap: "wrap" }}>
        {/* {PATHES.map((item) => (
          <li key={item.path} style={{ paddingLeft: "10px" }}>
            <Link to={item.path}>{item.element.name}</Link>
          </li>
        ))} */}
        {ADMIN_PATHES.map((item) => (
          <li key={item.path} style={{ paddingLeft: "10px" }}>
            <Link to={item.path}>{item.element.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Links;
