import React, { useState } from "react";
import { validateInput } from "../../validation/validationInput";

interface IItemCell {
  isEditing: boolean;
  name: string;
  value: string | number | undefined;
  changePersonData: (name: "name" | "age" | "about", value: string, isValidInput: boolean) => void;
}

const ItemCell: React.FC<IItemCell> = ({ isEditing, name, value, changePersonData }) => {
  const type = name === "age" ? "number" : "text";
  const [className, setClassName] = useState<"" | "invalid">("");

  const changeHandler = (event: any) => {
    const { name, value } = event.target;

    const isValidInput = validateInput(name, value);
    changePersonData(name, value, isValidInput);
    setClassName(isValidInput ? "" : "invalid");
  };
  return isEditing && name !== "id" ? (
    <th className='item__th-input'>
      <input className={className} onChange={changeHandler} name={name} type={type} value={value} />
    </th>
  ) : (
    <th>{value}</th>
  );
};

export default ItemCell;
