import { useEffect, useState } from "react";
import { initCamera, pose } from "./pose";
import VideoCanvas from "./components/videoCanvas";
import { createDetector } from "./pose";
import Game from "./components/game";
import Debug from "./components/debug";

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const fps = 30;
  const size = {
    width: 1024,
    height: 768,
  }

  useEffect(() => {
    initCamera(size, fps).then((video) => {
      video.play();
      video.addEventListener(
        "loadeddata",
        async () => await pose(createDetector, setPosition, size, fps)
      );
    });
  }, [size.width]);

  return (
    <div className="container">
      <VideoCanvas size={size}/>
      <Game x={position.x} y={position.y} />
      {/* <Debug/> */}
    </div>
  );
};

export default App;
