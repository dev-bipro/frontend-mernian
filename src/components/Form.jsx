function Form({ className, action, onSubmit, children }) {
  return (
    <>
      <form className={className} action={action} onSubmit={onSubmit}>
        {children}
      </form>
    </>
  );
}

export default Form;
