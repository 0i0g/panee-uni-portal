import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

const ClassList = ({ load }) => {
  const [classNamelist, setClassNamelist] = useState([]);
  const { className } = useParams();
  console.log(className);
  useEffect(() => {
    const loadClassName = async () => {
      axios
        .get('class/all')
        .then((res) => {
          console.log(res.data);
          setClassNamelist(res.data);
        })
        .catch((err) => {
          setClassNamelist([]);
        });
    };
    loadClassName();
  }, [load]);

  const generateClass = (currentClassName) => {
    return `block p-2 pl-10 mb-2 text-base font-medium text-gray-700 transition bg-gray-100 rounded-md cursor-pointer hover:bg-green-500${
      className === currentClassName ? ' link-active' : ''
    }`;
  };

  return (
    <div>
      {classNamelist.map((className) => (
        <Link key={className} to={`/class/${className}`}>
          <span className={generateClass(className)}>📚 {className}</span>
        </Link>
      ))}
    </div>
  );
};

export default ClassList;
