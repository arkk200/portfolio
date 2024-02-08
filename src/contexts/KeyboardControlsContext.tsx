import { ReactNode, createContext, useEffect, useState } from "react";

type KeyPressMap = Record<string, boolean>;
export const KeyboardControlsContext = createContext<KeyPressMap>({});

interface Props {
  map: { name: string; keys: string[] }[];
  children: ReactNode;
}
const KeyboardControls = ({ map, children }: Props) => {
  const [keyPressMap, setKeyPressMap] = useState<KeyPressMap>(
    map.reduce((out, { name }) => ({ ...out, [name]: false }), {})
  );

  useEffect(() => {
    const config = map.map(({ name, keys }) => ({
      keys,
      fn: (value: boolean) => {
        setKeyPressMap((prev) => ({
          ...prev,
          [name]: value,
        }));
      },
    }));

    type Out = Record<string, { fn: (value: boolean) => void }>;
    const keyMap = config.reduce<Out>((out, { keys, fn }) => {
      keys.forEach((key) => {
        out[key] = { fn };
      });
      return out;
    }, {});

    const keydownHandler = ({ key, code }: KeyboardEvent) => {
      const obj = keyMap[key] || keyMap[code];
      if (!obj) return;
      obj.fn(true);
    };
    const keyupHandler = ({ key, code }: KeyboardEvent) => {
      const obj = keyMap[key] || keyMap[code];
      if (!obj) return;
      obj.fn(false);
    };

    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("keyup", keyupHandler);

    const pointerlockchangeHandler = () => {
      setKeyPressMap(
        map.reduce((out, { name }) => ({ ...out, [name]: false }), {})
      );
    };
    document.addEventListener("pointerlockchange", pointerlockchangeHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("keyup", keyupHandler);
      document.removeEventListener(
        "pointerlockchange",
        pointerlockchangeHandler
      );
    };
  }, [map]);

  return (
    <KeyboardControlsContext.Provider value={keyPressMap}>
      {children}
    </KeyboardControlsContext.Provider>
  );
};

export default KeyboardControls;
