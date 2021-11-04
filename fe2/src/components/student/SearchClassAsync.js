import axios from 'axios';
import React from 'react';
import AsyncSelect from 'react-select/async';

const search = (keyword) => {
  return axios.get(`class/search?keyword=${keyword}`).then((res) => {
    return res.data.map((x) => ({ label: x.name, value: x._id }));
  });
};

const promiseOptions = (keyword) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(search(keyword));
    }, 1000);
  });

const SearchClassAsync = (props) => {
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      {...props}
    />
  );
};

export default SearchClassAsync;
