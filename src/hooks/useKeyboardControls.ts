import { useContext } from "react";
import { KeyboardControlsContext } from "../contexts/KeyboardControlsContext";

const useKeyboardControls = (name: string): boolean => {
  const value = useContext(KeyboardControlsContext);
  return value[name];
};

export default useKeyboardControls;
