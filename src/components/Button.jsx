function Button({ className, type, onClick, title }) {
  return (
    <>
      <button className={className} type={type} onClick={onClick}>
        {title}
      </button>
    </>
  );
}

export default Button;
