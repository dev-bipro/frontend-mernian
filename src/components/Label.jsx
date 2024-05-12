function Label({ htmlFor, className, title, children }) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {title}
      {children}
    </label>
  );
}

export default Label;
