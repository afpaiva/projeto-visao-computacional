const VideoCanvas = ({ canvasWidth: width, canvasHeight: height }) => {
  return (
    <div className="video">
      <div id="video-container">
        <video
          id="pose-video"
          className="layer"
          playsInline
          style={{ width, height }}
        ></video>
        <canvas
          id="pose-canvas"
          className="layer"
          width={width}
          height={height}
        ></canvas>
        <div id="pose-result-left" className="layer pose-result"></div>
        <br />
        <div id="pose-result-right" className="layer pose-result"></div>
      </div>
    </div>
  );
};

export default VideoCanvas;
