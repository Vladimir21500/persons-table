import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { RiSaveLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { deletePerson, updatePerson } from "../../store/actions/persons";
import { IPerson } from "../../types/person";
import { IItem } from "../../types/properties";
import { getPersonFromSessionStorage, setItemByIdToSessionStorage } from "../../sessionStorage";
import ItemCell from "../itemCell/ItemCell";

import "./item.scss";

const Item: React.FC<IItem> = (props) => {
  const { id, name, age, about, mapPersonsForStorage } = props;

  const dispatch = useAppDispatch();
  const { persons } = useAppSelector((state) => state.persons);

  const [personData, setPersonData] = useState<IPerson>({
    id,
    name,
    age,
    about,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    const personsItems = mapPersonsForStorage();

    if (personsItems.length && personsItems.length !== Number(sessionStorage.getItem("personsLength"))) {
      sessionStorage.setItem("personsLength", String(personsItems.length));
      sessionStorage.setItem("personsItems", JSON.stringify(personsItems));
    }

    if (sessionStorage.getItem("personsItems") !== null) {
      const item = getPersonFromSessionStorage(id);
      setIsEditing(item.isEditing);
      delete item.isEditing;
      setPersonData({
        ...item,
      });
    }
  }, [persons.length]);

  const clickSaveHandler = () => {
    const isIdentObjects = Object.keys(personData)
      .map((keyName) => personData[keyName as keyof IPerson] === props[keyName as keyof IItem])
      .every((el) => el === true);

    if (isIdentObjects) {
      setItemByIdToSessionStorage(id, {
        ...personData,
        isEditing: false,
      });
      setIsEditing(false);
      return;
    }
    if (!isValid) {
      alert("not valid Person data");
      return;
    }

    dispatch(updatePerson(personData));
    setItemByIdToSessionStorage(id, {
      ...personData,
      isEditing: false,
    });
    setIsEditing(false);
  };

  const clickEditHandler = () => {
    setIsEditing(true);
    setItemByIdToSessionStorage(id, {
      ...personData,
      isEditing: true,
    });
  };

  const clickDeleteHandler = () => {
    dispatch(deletePerson(id));
  };

  const changePersonData = useCallback(
    (name: "name" | "age" | "about", value: string, isValidInput: boolean) => {
      setPersonData({
        ...personData,
        [name]: value,
      });
      setItemByIdToSessionStorage(id, {
        ...personData,
        [name]: value,
        isEditing: true,
      });
      setIsValid(isValidInput);
    },
    []
  );

  return (
    <tr className='item'>
      <ItemCell isEditing={isEditing} name='id' value={personData.id} changePersonData={changePersonData} />
      <ItemCell
        isEditing={isEditing}
        name='name'
        value={personData.name}
        changePersonData={changePersonData}
      />
      <ItemCell isEditing={isEditing} name='age' value={personData.age} changePersonData={changePersonData} />
      <ItemCell
        isEditing={isEditing}
        name='about'
        value={personData.about}
        changePersonData={changePersonData}
      />

      <th>
        <div className='item__buttons'>
          {isEditing ? (
            <button onClick={clickSaveHandler} className='item__buttons_edit'>
              <RiSaveLine />
            </button>
          ) : (
            <button onClick={clickEditHandler} className='item__buttons_edit'>
              <MdOutlineModeEdit />
            </button>
          )}

          <button onClick={clickDeleteHandler} className='item__buttons_delete'>
            <AiOutlineDelete />
          </button>
        </div>
      </th>
    </tr>
  );
};

export default Item;
