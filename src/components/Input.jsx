function Input({ id, className, name, onChange, type, value, placeholder }) {
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
      />
    </>
  );
}

export default Input;
