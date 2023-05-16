import { useEffect } from "react";
import { initCamera, pose } from "./pose";
import VideoCanvas from "./components/videoCanvas";
import { createDetector } from "./pose";

const App = () => {
  const config = {
    video: { width: 640, height: 480, fps: 30 },
  };

  useEffect(() => {
    initCamera(config.video.width, config.video.height, config.video.fps).then(
      (video) => {
        video.play();
        video.addEventListener(
          "loadeddata",
          async (event) => await pose(createDetector)
        );
      }
    );
  }, [config.video.width, config.video.height, config.video.fps]);

  return (
    <div className="container">
      <VideoCanvas
        canvasWidth={config.video.width}
        canvasHeight={config.video.height}
      />

      <div className="debug">
        <h2>Mão Esquerda</h2>
        <table id="summary-left" className="summary">
          <thead>
            <tr>
              <th>Idx</th>
              <th>Dedo</th>
              <th style={{ width: "110px" }}>Fechado</th>
              <th style={{ width: "170px" }}>Direção</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>Dedão</td>
              <td>
                <span id="curl-0">-</span>
              </td>
              <td>
                <span id="dir-0">-</span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Indicador</td>
              <td>
                <span id="curl-1">-</span>
              </td>
              <td>
                <span id="dir-1">-</span>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Médio</td>
              <td>
                <span id="curl-2">-</span>
              </td>
              <td>
                <span id="dir-2">-</span>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Anelar</td>
              <td>
                <span id="curl-3">-</span>
              </td>
              <td>
                <span id="dir-3">-</span>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Mĩnimo</td>
              <td>
                <span id="curl-4">-</span>
              </td>
              <td>
                <span id="dir-4">-</span>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <h2>Mão Direita</h2>
        <table id="summary-right" className="summary">
          <thead>
            <tr>
              <th>Idx</th>
              <th>Dedo</th>
              <th style={{ width: "110px" }}>Fechado</th>
              <th style={{ width: "170px" }}>Direção</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>Dedão</td>
              <td>
                <span id="curl-0">-</span>
              </td>
              <td>
                <span id="dir-0">-</span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Indicador</td>
              <td>
                <span id="curl-1">-</span>
              </td>
              <td>
                <span id="dir-1">-</span>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Médio</td>
              <td>
                <span id="curl-2">-</span>
              </td>
              <td>
                <span id="dir-2">-</span>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Anelar</td>
              <td>
                <span id="curl-3">-</span>
              </td>
              <td>
                <span id="dir-3">-</span>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Mĩnimo</td>
              <td>
                <span id="curl-4">-</span>
              </td>
              <td>
                <span id="dir-4">-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
