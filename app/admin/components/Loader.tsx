import { SyncLoader } from "react-spinners";
const Loader = ({ color = "white", size = 10 }) => {
  return <SyncLoader color={color} size={size} />;
};

export default Loader;
