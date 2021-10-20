import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  enrollCode: yup.string().min(1).max(15),
});

const ClassList = () => {
  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      enrollCode: '',
    },
  });

  const submitForm = (data) => {
    console.log(JSON.stringify(data, null, 4));
  };

  const generateClass = () => {
    return `block p-2 mb-2 text-base font-medium text-gray-700 transition bg-gray-100 rounded-md cursor-pointer hover:bg-green-500 text-center`;
  };

  return (
    <div>
      <form
        className="flex items-center max-w-md gap-3"
        action="/class/enroll"
        method="POST"
        onSubmit={handleSubmit(submitForm)}>
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
        {errors.enrollCode?.message}
      </p>
      <div className="grid grid-cols-6 gap-4 mt-3">
        <div className={generateClass()}>📚 9</div>
        <div className={generateClass()}>📚 9</div>
        <div className={generateClass()}>📚 9</div>
        <div className={generateClass()}>📚 1</div>
        <div className={generateClass()}>📚 9</div>
      </div>
    </div>
  );
};

export default ClassList;
