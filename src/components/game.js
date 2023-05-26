import styled from "styled-components";

const Cursor = styled.div`
  width: 20px;
  height: 20px;
  position: fixed;
  background-color: red;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  transition: .5s;
`;

const Game = ({ x, y }) => {
  return <Cursor x={x.toFixed(2)*3} y={y.toFixed(2)*3} />;
};

export default Game;
