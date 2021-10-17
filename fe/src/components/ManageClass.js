import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ToggleButtonGroup from './ToggleButtonGroup';

const dowClassName =
  'block p-2 text-base font-medium text-center text-gray-700 transition bg-gray-100 rounded-md cursor-pointer toggle-day-btn hover:bg-green-500 btn-toggle';

const slotClassName =
  'block p-2 text-base font-medium text-center text-gray-700 transition bg-gray-100 rounded-md cursor-pointer toggle-day-btn hover:bg-green-500 btn-toggle';

const schema = yup.object().shape({
  subject: yup.string().required(),
  className: yup
    .string()
    .matches(
      /^([A-Z0-9]){4,10}$/,
      'Class Name must be uppercase character, digit and has length 4-10'
    ),
  fromDate: yup.date().required(),
  toDate: yup.date().required().min(yup.ref('fromDate')),
  dow: yup.array().min(1),
});

const ManageClass = () => {
  const [subjectOptions, setSubjectOptions] = useState([]);
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchSubjectOptions = async () => {
      axios.get('subject/all').then((res) => {
        const subjects = Array.from(res.data).map((x) => ({
          value: x.code,
          label: `${x.name} - ${x.code}`,
        }));
        setSubjectOptions(subjects);
      });
    };
    fetchSubjectOptions();
  }, []);

  const submitForm = (data) => {
    console.log(JSON.stringify(data, null, 4));
  };

  return (
    <form
      className="w-full p-4"
      action="/class"
      method="POST"
      onSubmit={handleSubmit(submitForm)}>
      {/* form */}
      <div className="grid grid-cols-2 gap-2">
        {/* left */}
        <div>
          <div className="mb-3 form-field">
            <label className="block mb-1 font-bold text-gray-700">
              Subject
            </label>
            <Controller
              control={control}
              name="subject"
              defaultValue=""
              render={({ onChange, value, ref }) => (
                <Select
                  options={subjectOptions}
                  innerRef={ref}
                  placeholder="Select subject"
                  value={subjectOptions.find((c) => c.value === value)}
                  onChange={(val) => onChange(val.value)}
                />
              )}
            />
            <p className="block text-sm text-red-500 form-message">
              {errors.subject?.message}
            </p>
          </div>
          <div className="mb-3 form-field">
            <label className="block mb-1 font-bold text-gray-700">
              Name of class
            </label>
            <input
              className="w-full px-3 text-base font-medium text-gray-700 placeholder-gray-400 transition border rounded-lg h-9"
              type="text"
              placeholder="Ex: SE1304"
              name="className"
              ref={register}
            />
            <p className="block text-sm text-red-500 form-message">
              {errors.className?.message}
            </p>
          </div>
          <div className="mb-3 form-field">
            <label className="block mb-1 font-bold text-gray-700">
              Start Date
            </label>
            <Controller
              control={control}
              name="fromDate"
              render={({ onChange, onBlur, value }) => (
                <ReactDatePicker
                  placeholderText="dd/MM/yyy"
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  dateFormat="dd/MM/yyyy"
                />
              )}
            />
            <p className="block text-sm text-red-500 form-message">
              {errors.fromDate?.message}
            </p>
          </div>
          <div className="mb-3 form-field">
            <label className="block mb-1 font-bold text-gray-700">
              End Date
            </label>
            <Controller
              control={control}
              name="toDate"
              render={({ onChange, onBlur, value }) => (
                <ReactDatePicker
                  placeholderText="dd/MM/yyy"
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  dateFormat="dd/MM/yyyy"
                />
              )}
            />
            <p className="block text-sm text-red-500 form-message">
              {errors.toDate?.message}
            </p>
          </div>
        </div>
        {/* end left */}
        {/* right */}
        <div>
          <div className="mb-3 form-field">
            <label className="block mb-1 font-bold text-gray-700">
              Day of week
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Controller
                control={control}
                name="dow"
                defaultValue={[]}
                render={({ onChange, value }) => (
                  <ToggleButtonGroup value={value} onChange={onChange}>
                    {(ToggleButton) => (
                      <>
                        <ToggleButton className={dowClassName} value="1">
                          Monday ✨
                        </ToggleButton>
                        <ToggleButton className={dowClassName} value="2">
                          Tuesday 🎉
                        </ToggleButton>
                        <ToggleButton className={dowClassName} value="3">
                          Wednesday 🎄
                        </ToggleButton>
                        <ToggleButton className={dowClassName} value="4">
                          Thursday 💊
                        </ToggleButton>
                        <ToggleButton className={dowClassName} value="5">
                          Friday 🎨
                        </ToggleButton>
                        <ToggleButton className={dowClassName} value="6">
                          Saturday 🎈
                        </ToggleButton>
                        <ToggleButton className={dowClassName} value="0">
                          Sunday 🎁
                        </ToggleButton>
                      </>
                    )}
                  </ToggleButtonGroup>
                )}
              />
            </div>
            <p className="block text-sm text-red-500 form-message">
              {errors.dow?.message}
            </p>
          </div>
          <div className="mb-3 form-field">
            <label className="block mb-1 font-bold text-gray-700">Slot</label>
            <div className="grid grid-cols-2 gap-2">
              <Controller
                control={control}
                name="slot"
                defaultValue={[]}
                render={({ onChange, value }) => (
                  <ToggleButtonGroup value={value} onChange={onChange}>
                    {(ToggleButton) => (
                      <>
                        <ToggleButton className={slotClassName} value="1">
                          Slot 1 🔊 7h 00
                        </ToggleButton>
                        <ToggleButton className={slotClassName} value="2">
                          Slot 2 🔊 7h 00
                        </ToggleButton>
                        <ToggleButton className={slotClassName} value="3">
                          Slot 3 🔊 7h 00
                        </ToggleButton>
                        <ToggleButton className={slotClassName} value="4">
                          Slot 4 🔊 7h 00
                        </ToggleButton>
                        <ToggleButton className={slotClassName} value="5">
                          Slot 5 🔊 7h 00
                        </ToggleButton>
                        <ToggleButton className={slotClassName} value="6">
                          Slot 6 🔊 7h 00
                        </ToggleButton>
                      </>
                    )}
                  </ToggleButtonGroup>
                )}
              />
            </div>
            <p className="block text-sm text-red-500 form-message">
              {errors.dow?.message}
            </p>
          </div>
        </div>
        {/* end right */}
      </div>
      <button
        className="w-full font-extrabold transition bg-green-500 rounded-lg text-indigo-50 hover:bg-green-600 hover:text-indigo-100"
        type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto w-9 h-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      {/* end form */}
    </form>
  );
};

export default ManageClass;
