import styled from "styled-components";

export const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
`;

export const Video = styled.video`
  position: fixed;
  transform: scaleX(-1);
  width: 100%;
  height: 100%;
  opacity: 0;
`;
