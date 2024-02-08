import { useMemo, useEffect, useCallback } from "react";

export function useMouseCapture() {
  const mouse = useMemo(() => ({ x: 0, y: 0 }), []);

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      if (document.pointerLockElement === document.body) {
        console.log(mouse);
        mouse.x += e.movementX;
        mouse.y += e.movementY;
      }
    },
    [mouse]
  );

  const capture = useCallback(() => {
    document.body.requestPointerLock();
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", mouseMove, false);
    document.addEventListener("click", capture, false);
    document.addEventListener("pointerlockchange", () => {
      document.dispatchEvent(new KeyboardEvent("keyup", { key: "KeyD" }));
    });

    return () => {
      document.removeEventListener("mousemove", mouseMove, false);
      document.removeEventListener("click", capture, false);
    };
  }, [mouseMove, capture]);

  return mouse;
}
