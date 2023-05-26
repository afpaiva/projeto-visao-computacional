const VideoCanvas = ({ size }) => {
  const { width, height } = size
  const videoSize = {
    width: `${width}px`,
    height: `${height}px`,
  }

  return (
    <div className="video">
      <video
        id="pose-video"
        className="layer"
        playsInline
        style={videoSize}
      ></video>
      <canvas
        id="pose-canvas"
        className="layer"
        width={width}
        height={height}
      ></canvas>
    </div>
  );
};

export default VideoCanvas;
