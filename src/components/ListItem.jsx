function ListItem({ className, children, title }) {
  return (
    <>
      <li className={className}>
        {children}
        {title}
      </li>
    </>
  );
}

export default ListItem;
