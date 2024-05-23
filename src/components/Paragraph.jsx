function Paragraph({ onClick, showText, className, title, children }) {
  return (
    <>
      <p onClick={onClick} title={showText} className={className}>
        {title}
        {children}
      </p>
    </>
  );
}

export default Paragraph;
