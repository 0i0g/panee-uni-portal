import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SearchClassAsync from './SearchClassAsync';
import axios from 'axios';

const schema = yup.object().shape({
  enrollCode: yup
    .string()
    .min(1, 'Enroll Code must be at least 1 characters')
    .max(15, 'Enroll Code must be at most 15 characters'),
  name: yup.object().required('Class is a required field'),
});

const ClassList = ({ classSelected, dateSelected, setClassSelected }) => {
  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      enrollCode: '',
      name: '',
    },
  });
  const [formMessage, setFormMessage] = useState(null);
  const [classList, setClassList] = useState([]);
  const [reloadClassList, setReloadClassList] = useState(false);

  useEffect(() => {
    const loadClassList = async () => {
      axios.get('class/enrolled').then((res) => {
        setClassList(res.data);
      });
    };
    loadClassList();
  }, [reloadClassList]);

  const submitForm = (data) => {
    setFormMessage(null);
    const { enrollCode, name } = data;
    const _data = { classId: name.value, enrollCode };
    console.log(JSON.stringify(_data, null, 4));
    axios
      .post('class/enroll', { ..._data })
      .then((res) => {
        setFormMessage([`Enroll successfully`, 'green-500']);
        reset({
          enrollCode: '',
          name: '',
        });
        setReloadClassList(!reloadClassList);
      })
      .catch((err) => {
        setFormMessage([
          `Incorrect enroll code or you are currently in this class`,
          'red-500',
        ]);
      });
  };

  const generateClass = (current) => {
    return `block p-2 mb-2 text-base font-medium text-gray-700 transition bg-gray-100 rounded-md cursor-pointer hover:bg-green-500 text-center${
      current === classSelected ? ' link-active' : ''
    }`;
  };

  return (
    <div>
      <div className="p-5 bg-indigo-400 rounded-lg managa-class">
        <form
          className="flex items-center gap-3"
          action="/class/enroll"
          method="POST"
          onSubmit={handleSubmit(submitForm)}>
          <label className="block font-bold text-gray-700 whitespace-nowrap">
            Class
          </label>
          <Controller
            control={control}
            name="name"
            render={({ onChange, onBlur, value }) => (
              <SearchClassAsync
                className="mr-3 w-96"
                onChange={onChange}
                value={value}
              />
            )}
          />

          <label className="block font-bold text-gray-700 whitespace-nowrap">
            Enroll code
          </label>
          <div className="flex form-field">
            <input
              className="w-full px-3 text-base font-medium text-gray-700 placeholder-gray-400 transition border rounded-lg h-9"
              type="text"
              placeholder="Code"
              name="enrollCode"
              ref={register}
            />
          </div>
          <button
            className="px-3 font-extrabold transition bg-green-500 rounded-lg h-9 text-indigo-50 hover:bg-green-600 hover:text-indigo-100"
            type="submit">
            Enroll
          </button>
        </form>
        <p className="block text-sm font-bold text-red-500 form-message">
          {errors.name?.message}
        </p>{' '}
        <p className="block text-sm font-bold text-red-500 form-message">
          {errors.enrollCode?.message}
        </p>
        {formMessage ? (
          <span
            className={`bg-white font-bold w-full block rounded-tr-md rounded-br-md p-2 mt-2 border-l-8 border-${formMessage[1]} text-${formMessage[1]}`}>
            {formMessage[0]}
          </span>
        ) : (
          ''
        )}
      </div>

      <div className="grid grid-cols-6 gap-4 mt-3">
        {classList.map((x) => (
          <div
            className={generateClass(x.classId)}
            key={x._id}
            onClick={() => setClassSelected(x.classId)}>
            📚 {x.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassList;
