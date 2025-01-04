const MenuCategory = ({ category, id, children }) => {
  return (
    <div id={id} className="my-4">
      <h2 className="text-xl font-bold">{category}</h2>
      <div>{children}</div>
    </div>
  );
};

export default MenuCategory;
