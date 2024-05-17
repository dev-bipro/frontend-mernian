function Input({
  id,
  className,
  name,
  onChange,
  type,
  value,
  placeholder,
  accept,
}) {
  return (
    <>
      <input
        id={id}
        className={className}
        name={name}
        onChange={onChange}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        accept={accept}
        // multiple
      />
    </>
  );
}

export default Input;
