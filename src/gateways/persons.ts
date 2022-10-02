import axios from "axios";
import { IPerson } from "../types/person";

const baseUrl = "https://61af86a73e2aba0017c493ea.mockapi.io/api/v1/persons";

export const fetchPersons = async () => {
  try {
    const response = await axios({
      method: "get",
      url: baseUrl,
    }).then((response) => response);

    if (response.status >= 300) {
      throw new Error(response.statusText);
    }
    return response;
  } catch (error) {
    alert(`${error}`);
  }
};

export const putPerson = async (person: IPerson) => {
  try {
    const response = await axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${baseUrl}/${person.id}`,
      data: person,
    }).then((response) => response);

    if (response.status >= 300) {
      throw new Error(response.statusText);
    }
    return response;
  } catch (error) {
    alert(`${error}`);
  }
};

export const postNewPerson = async (person: IPerson) => {
  try {
    const response = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${baseUrl}`,
      data: person,
    }).then((response) => response);

    if (response.status >= 300) {
      throw new Error(response.statusText);
    }
    return response;
  } catch (error) {
    alert(`${error}`);
  }
};

export const asyncDeletePerson = async (id: string) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${baseUrl}/${id}`,
    }).then((response) => response);

    if (response.status >= 300) {
      throw new Error(response.statusText);
    }
    return response;
  } catch (error) {
    alert(`${error}`);
  }
};
