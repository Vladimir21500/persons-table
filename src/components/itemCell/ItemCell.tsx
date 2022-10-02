import React, { useEffect } from "react";

interface IItemCell {
  isEditing: boolean;
  name: string;
  value: string | number | undefined;
  changePersonData: (name: string, value: string) => void;
}

const ItemCell: React.FC<IItemCell> = ({ isEditing, name, value, changePersonData }) => {
  const type = typeof value === "number" ? "number" : "text";

  useEffect(() => {
    console.log("render ItemCell");
  }, []);

  const changeHandler = (event: any) => {
    const { name, value } = event.target;
    changePersonData(name, value);
  };
  return isEditing && name !== "id" ? (
    <th className='item__th-input'>
      <input onChange={changeHandler} name={name} type={type} value={value} />
    </th>
  ) : (
    <th>{value}</th>
  );
};

export default ItemCell;
