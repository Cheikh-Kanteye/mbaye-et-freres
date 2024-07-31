import { CircleLoader } from "react-spinners";
const Loader = ({ color = "white", size = 10 }) => {
  return <CircleLoader color={color} size={size} />;
};

export default Loader;
