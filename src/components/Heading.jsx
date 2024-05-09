function Heading(props) {
  return (
    <>
      <props.tagName className={props.className}>{props.title}</props.tagName>
    </>
  );
}

export default Heading;
