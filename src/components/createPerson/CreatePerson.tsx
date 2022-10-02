import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TiDeleteOutline } from "react-icons/ti";
import { useAppDispatch } from "../../hooks/redux";
import { addPerson } from "../../store/actions/persons";
import "./createPerson.scss";

interface IFormInput {
  name: string;
  age: number;
  about: string;
}

interface ICreatePersonProps {
  hideFormHandle: () => void;
}

const CreatePerson: React.FC<ICreatePersonProps> = ({ hideFormHandle }) => {
  const dispatch = useAppDispatch();
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
  } = useForm<IFormInput>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const clickHideHandle = () => {
    hideFormHandle();
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(addPerson(data));
    hideFormHandle();
  };

  return (
    <div className='person-form'>
      <form className='person-form__form' onSubmit={handleSubmit(onSubmit)}>
        <span className='person-form__id'>Id</span>
        <div>
          <input
            {...register("name", {
              required: { message: "is required", value: true },
              maxLength: { message: "too long", value: 10 },
              minLength: { message: "too short", value: 2 },
            })}
          />
          {errors.name ? (
            <span className='person-form__label error'>{errors.name?.message}</span>
          ) : (
            <span className='person-form__label'>name</span>
          )}
        </div>
        <div>
          <input
            {...register("age", {
              required: { message: "isRequired", value: true },
              max: { message: "too big age", value: 100 },
            })}
          />
          {errors.age ? (
            <span className='person-form__label error'>{errors.age?.message}</span>
          ) : (
            <span className='person-form__label'>age</span>
          )}
        </div>
        <div>
          <input
            {...register("about", {
              required: { message: "is required", value: true },
              maxLength: { message: "too long", value: 30 },
              minLength: { message: "too short", value: 2 },
            })}
          />
          {errors.about ? (
            <span className='person-form__label error'>{errors.about?.message}</span>
          ) : (
            <span className='person-form__label'>about</span>
          )}
        </div>

        <button className='person-form__submit-btn' type='submit' disabled={!isValid}>
          +
        </button>
        <button onClick={clickHideHandle} className='person-form__hide-btn'>
          <TiDeleteOutline />
        </button>
      </form>
    </div>
  );
};

export default CreatePerson;
