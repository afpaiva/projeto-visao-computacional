import React, { useEffect, useRef, useLayoutEffect } from "react";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/hands";
import { Canvas, Video } from "./styles";
import { triggerClickAtPosition } from "./mouseControlls";

const Controlls = ({ setControllerValues }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const runHandpose = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;

      const constraints = { audio: false, video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;

      const model = await handpose.load();
      console.log("Handpose model loaded");

      const convertVideoToCanvasCoordinates = (x, y) => {
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const scaleX = canvasWidth / videoWidth;
        const scaleY = canvasHeight / videoHeight;

        const canvasX = x * scaleX;
        const canvasY = y * scaleY;

        return { x: canvasX, y: canvasY };
      };

      const drawLine = (start, end, color, lineWidth) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      };

      const drawPoint = (position, color, radius) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
        ctx.fill();
      };

      const estimateHands = async () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const predictions = await model.estimateHands(video);
        if (predictions.length > 0) {
          const hand = predictions[0].landmarks;

          const thumbTip = hand[4];
          const indexTip = hand[8];

          const thumbTipCanvas = convertVideoToCanvasCoordinates(
            thumbTip[0],
            thumbTip[1]
          );
          const indexTipCanvas = convertVideoToCanvasCoordinates(
            indexTip[0],
            indexTip[1]
          );

          const diameter = Math.sqrt(
            Math.pow(indexTipCanvas.x - thumbTipCanvas.x, 2) +
            Math.pow(indexTipCanvas.y - thumbTipCanvas.y, 2)
          );

          const radius = diameter / 2;

          const centerX = (thumbTipCanvas.x + indexTipCanvas.x) / 2;
          const centerY = (thumbTipCanvas.y + indexTipCanvas.y) / 2;

          // Draw connections
          const connections = [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4], // Thumb
            [0, 5],
            [5, 6],
            [6, 7],
            [7, 8], // Index finger
            [0, 9],
            [9, 10],
            [10, 11],
            [11, 12], // Middle finger
            [0, 13],
            [13, 14],
            [14, 15],
            [15, 16], // Ring finger
            [0, 17],
            [17, 18],
            [18, 19],
            [19, 20], // Pinky finger
          ];

          for (let i = 0; i < connections.length; i++) {
            const [from, to] = connections[i];
            const start = convertVideoToCanvasCoordinates(hand[from][0], hand[from][1]);
            const end = convertVideoToCanvasCoordinates(hand[to][0], hand[to][1]);

            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Draw circle contour
          let click = diameter < 50;
          ctx.strokeStyle = click ? "#ff0000" : "#00ff00";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          ctx.stroke();

          // Draw midpoint
          ctx.fillStyle = "#00ff00";
          ctx.beginPath();
          ctx.arc(centerX, centerY, 1.5, 0, 2 * Math.PI);
          ctx.fill();

          // Draw diameter line
          drawLine(thumbTipCanvas, indexTipCanvas, "#ffffff", 1);

          // Render finger points
          for (let i = 0; i < hand.length; i++) {
            const fingerPoint = hand[i];
            const fingerPointCanvas = convertVideoToCanvasCoordinates(
              fingerPoint[0],
              fingerPoint[1]
            );
            drawPoint(fingerPointCanvas, "#ffffff", 1);
          }

          // setState circle midpoint coordinates
          let posX = Math.abs(centerX - canvas.width);
          let posY = centerY;
          setControllerValues({
            x: posX,
            y: posY,
            click,
          })

          if (click) {
            triggerClickAtPosition(posX, posY);
          }
        }

        requestAnimationFrame(estimateHands);
      };

      estimateHands();
    };

    runHandpose();
  }, []);

  return (
    <div style={{ position: "fixed", width: "100%", height: "100%" }}>
      <Video ref={videoRef} autoPlay></Video>
      <Canvas ref={canvasRef}></Canvas>
    </div>
  );
};

export default Controlls;
