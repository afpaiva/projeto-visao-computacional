import React, { useState } from "react";
import Controlls from "./Controlls";
import DraggableDiv from "./draggableDiv";

const App = () => {
  const [controllerValues, setControllerValues] = useState({
    x: 0,
    y: 0,
    click: false,
  });

  return (
    <>
      <DraggableDiv
        click={controllerValues.click}
        x={controllerValues.x}
        y={controllerValues.y}
      />
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
          <td>{controllerValues.click ? "click!" : "---"}</td>
        </tr>
      </table>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Formulário de Contato</h1>

        <label for="name">Nome:</label>
        <input type="text" id="name" name="name" required />

        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" required />

        <label for="message">Mensagem:</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button onClick={() => alert("clicou")}>Enviar</button>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          left: "0",
          top: "0",
        }}
        // onClick={() => }
      ></div>
    </>
  );
};

export default App;
