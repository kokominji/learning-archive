import { useState } from "react";

export const Test = () => {
  const [countState, setCountState] = useState<number>(0);

  const onCount = () => {
    setCountState((prev) => prev + 1);
  };

  return (
    <div>
      <div>{countState}</div>
      <button onClick={onCount}>선택</button>
    </div>
  );
};
