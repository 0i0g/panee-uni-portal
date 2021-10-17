import ManageClass from './ManageClass';

const LecturerHome = () => {
  return (
    <div className="bg-indigo-400 rounded-lg managa-class">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <ManageClass />
        </div>
        <div className="min-h-0 p-4 overflow-y-auto bg-indigo-100 rounded-md srollbar-custom">
          <a
            href="?class=<%- locals.classes[i].name %>"
            className="block p-2 pl-10 mb-2 text-base font-medium text-gray-700 transition bg-gray-100 rounded-md cursor-pointer hover:bg-green-500 <%- locals.currentClassName === locals.classes[i].name ? 'link-active' : ''%>">
            📚 Class Name
          </a>
        </div>
      </div>
    </div>
  );
};

export default LecturerHome;
