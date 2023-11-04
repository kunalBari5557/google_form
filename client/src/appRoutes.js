import { AiFillHome, AiFillVideoCamera } from "react-icons/ai";
import { SiSimpleanalytics } from "react-icons/si";
import Home from "./components/Home";
import Shorts from "./components/Shorts";
import Analytics from "./components/Analytics";

const appRoutes = [
  {
    path: "/Home",
    element: <Home />,
    state: "Home",
    sidebarProps: {
      displayText: "Home",
      icon: <AiFillHome className="radius_icon" />,
    },
  },
  {
    path: "/Analytics",
    element: <Analytics />,
    state: "Analytics",
    sidebarProps: {
      displayText: "Analytics",
      icon: <SiSimpleanalytics className="radius_icon" />,
    },
  },
  {
    path: "/Shorts",
    element: <Shorts />,
    state: "Shorts",
    sidebarProps: {
      displayText: "Shorts",
      icon: <AiFillVideoCamera className="radius_icon" />,
    },
  },
];

export default appRoutes;
