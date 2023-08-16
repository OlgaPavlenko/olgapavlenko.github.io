import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Links } from "./components/Links";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { Wrapper } from "./components/Wrapper";
import "./reset.css";
import { PATHES, AUTH_PATHES, ADMIN_PATHES } from "./utils/constants";

function App() {
  return (
    <div className="App">
      <Links />
      <Routes>
        {AUTH_PATHES.map((item) => (
          <Route key={item.path} path={item.path} element={<item.element />} />
        ))}

        <Route element={<PrivateRoutes role="user" />}>
          {PATHES.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>

        <Route element={<PrivateRoutes role="admin" />}>
          {ADMIN_PATHES.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={
                <Wrapper>
                  <item.element />
                </Wrapper>
              }
            />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
