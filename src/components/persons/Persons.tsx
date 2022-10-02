import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getPersons } from "../../store/actions/persons";
import CreatePerson from "../createPerson/CreatePerson";
import Item from "../item/Item";

import "./persons.scss";
import { IItem } from "../../types/properties";
import { IPerson } from "../../types/person";

const Persons: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { persons } = useAppSelector((state) => state.persons);

  const [isShowForm, setIsShowForm] = useState<boolean>(false);

  const mapPersonsForStorage = useCallback(() => {
    console.log("mapPersonsForStorage");

    return persons.map((person: IPerson) => ({
      ...person,
      isEditing: false,
    }));
  }, [persons]);

  useEffect(() => {
    dispatch(getPersons());
  }, []);

  const hideFormHandle = () => {
    setIsShowForm(!isShowForm);
  };

  return (
    <div className='persons'>
      <h1 className='persons__title'>Persons</h1>
      {isShowForm && <CreatePerson hideFormHandle={hideFormHandle} />}

      <table className='persons__table'>
        {!isShowForm && (
          <thead>
            <tr>
              <th scope='col'>Id</th>
              <th scope='col'>Name</th>
              <th scope='col'>Age</th>
              <th scope='col'>About</th>
              <th scope='col'>
                <button onClick={hideFormHandle} className='persons__add-btn'>
                  +
                </button>
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {persons.map((person: IItem) => (
            <Item key={person.id} {...person} mapPersonsForStorage={mapPersonsForStorage} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
