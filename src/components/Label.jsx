function Label({ htmlFor, className, title }) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {title}
    </label>
  );
}

export default Label;
