function Video({ width, height, src, type }) {
  return (
    <video width={width} height={height} controls>
      <source src={src} type={type} />
    </video>
  );
}

export default Video;
