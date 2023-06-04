import React, { useState } from "react";
import Controlls from "./Controlls";

const App = () => {
  const [controllerValues, setControllerValues] = useState({
    x: 0,
    y: 0,
    click: false,
  });

  return (
    <>
      <Controlls setControllerValues={setControllerValues} />
      <table>
        <tr>
          <th>controle</th>
          <th>Ação</th>
        </tr>
        <tr>
          <td>x</td>
          <td>{controllerValues.x.toFixed()}</td>
        </tr>
        <tr>
          <td>y</td>
          <td>{controllerValues.y.toFixed()}</td>
        </tr>
        <tr>
          <td>mouse</td>
          <td>{controllerValues.click ? 1 : 'clicou'}</td>
        </tr>
      </table>
    </>
  );
};

export default App;
