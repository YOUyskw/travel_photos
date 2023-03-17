import { useEffect, useState } from "react";
import { throttle } from "throttle-debounce";

export const useScroll = <Value = void>(
  filter: (scrollAmount: { x: number; y: number }) => Value,
  { delay = 200 } = {}
) => {
  const [state, setState] = useState(() =>
    filter({ x: globalThis?.scrollX ?? 0, y: globalThis?.scrollY ?? 0 })
  );

  useEffect(() => {
    const handler = throttle(delay, (e: Event) => {
      const x = globalThis?.scrollX ?? 0;
      const y = globalThis?.scrollY ?? 0;
      const res = filter({ x, y });
      setState(res);
    });
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [delay, filter]);

  return state;
};

export const useScrollDirection = <Value = void>(
  filter: (scrollAmount: { x: number; y: number }) => Value,
  { delay = 200 } = {}
) => {
  const [state, setState] = useState(
    filter({
      x: globalThis?.scrollX ?? 0,
      y: globalThis?.scrollY ?? 0,
    })
  );

  const [prevState, setPrevState] = useState({
    x: globalThis?.scrollX ?? 0,
    y: globalThis?.scrollY ?? 0,
  });

  useEffect(() => {
    const handler = throttle(delay, (e: Event) => {
      const x = globalThis?.scrollX ?? 0;
      const y = globalThis?.scrollY ?? 0;
      const xDelta = prevState.x - x;
      const yDelta = prevState.y - y;
      setState(filter({ x: xDelta, y: yDelta }));
      setPrevState({ x, y });
    });
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [delay, filter, prevState.x, prevState.y]);

  return state;
};

export const useScrollUI = () => {
  const [state, setState] = useState(true);
  const isScrollInitial = useScroll(({ y }) => y < 40);
  const isScrollDown = useScrollDirection(({ y }) => y < -40);
  const isScrollUp = useScrollDirection(({ y }) => 0 < y);

  useEffect(() => {
    if (!isScrollInitial || isScrollDown) {
      setState(false);
    }

    if (isScrollUp) {
      setState(true);
    }
  }, [isScrollDown, isScrollInitial, isScrollUp]);

  return state;
};
