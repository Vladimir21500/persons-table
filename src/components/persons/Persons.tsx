import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getPersons } from "../../store/actions/persons";
import CreatePerson from "../createPerson/CreatePerson";
import Item from "../item/Item";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IItem } from "../../types/properties";
import { IPerson } from "../../types/person";

import "./persons.scss";

const Persons: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { persons } = useAppSelector((state) => state.persons);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isShowForm, setIsShowForm] = useState<boolean>(false);

  const perPage = 12;

  const mapPersonsForStorage = useCallback(() => {
    return persons.map((person: IPerson) => ({
      ...person,
      isEditing: false,
    }));
  }, [persons]);

  useEffect(() => {
    dispatch(getPersons());
    if (sessionStorage.getItem("currentPage") === null) {
      sessionStorage.setItem("currentPage", "0");
    } else {
      setCurrentPage(Number(sessionStorage.getItem("currentPage")));
    }
  }, []);

  const hideFormHandle = () => {
    setIsShowForm(!isShowForm);
  };

  const clickPrevPageHandler = () => {
    setCurrentPage(currentPage - 1);
    sessionStorage.setItem("currentPage", `${currentPage - 1}`);
  };

  const clickNextPageHandler = () => {
    setCurrentPage(currentPage + 1);
    sessionStorage.setItem("currentPage", `${currentPage + 1}`);
  };

  const personsForPage = persons.slice(currentPage * perPage, currentPage * perPage + perPage);
  const isDisableNextButton = Math.trunc(persons.length / perPage) === currentPage;
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
          {personsForPage.map((person: IItem) => (
            <Item key={person.id} {...person} mapPersonsForStorage={mapPersonsForStorage} />
          ))}
        </tbody>
      </table>
      <div className='persons__pagination'>
        <button onClick={clickPrevPageHandler} disabled={currentPage === 0}>
          <AiOutlineLeft />
        </button>
        <span className='persons__page'>{currentPage + 1}</span>
        <button onClick={clickNextPageHandler} disabled={isDisableNextButton}>
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
};

export default Persons;
