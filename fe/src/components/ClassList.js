import React from 'react';

const ClassList = () => {
  return (
    <div>
      <a
        href="?class=<%- locals.classes[i].name %>"
        className="block p-2 pl-10 mb-2 text-base font-medium text-gray-700 transition bg-gray-100 rounded-md cursor-pointer hover:bg-green-500 <%- locals.currentClassName === locals.classes[i].name ? 'link-active' : ''%>">
        📚 Class Name
      </a>
    </div>
  );
};

export default ClassList;
