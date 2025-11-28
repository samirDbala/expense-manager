// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

// helpers functions
import { fetchUsername } from "../helpers";

// utils
import KeyboardManager from "../utils/KeyboardManager";

// loader
export async function mainLoader() {
  const username = await fetchUsername()
  return { username };
}

const Main = () => {
  const { username } = useLoaderData();
  return (
    <div className="layout">
      <KeyboardManager />
      <Nav username={username}/>
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};
export default Main;
