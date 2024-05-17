function Paragraph({ onClick, className, title, children }) {
  return (
    <>
      <p onClick={onClick} className={className}>
        {title}
        {children}
      </p>
    </>
  );
}

export default Paragraph;
