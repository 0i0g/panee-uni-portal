import React from 'react';

const ToggleButtonGroup = (props) => {
  const { children, name, value: checkedValues, onChange } = props;

  const onCheckboxChange = (checkboxValue, event) => {
    if (event.target.checked) {
      // if (!Array.isArray(checkedValues)) {
      //   checkedValues = [];
      // }
      onChange(checkedValues.concat(checkboxValue));
    } else {
      onChange(checkedValues.filter((v) => v !== checkboxValue));
    }
  };
  const ToggleButton = (checkboxProps) => {
    const {
      value: cbValue,
      disabled,
      children,
      className,
      ...rest
    } = checkboxProps;

    const checked = checkedValues ? checkedValues.indexOf(cbValue) >= 0 : false;
    const classList =
      'block w-full p-2 text-base font-medium text-center text-gray-700 transition bg-gray-100 rounded-md cursor-pointer toggle-day-btn hover:bg-green-500 btn-toggle';

    return (
      <label className={checked ? className + ' active' : className}>
        {children}
        <input
          {...rest}
          type="checkbox"
          name={name}
          disabled={disabled}
          checked={checked}
          onChange={onCheckboxChange.bind(null, cbValue)}
          value={cbValue}
          className="sr-only"
        />
      </label>
    );
  };

  return children(ToggleButton);
};

export default ToggleButtonGroup;
