import ClassList from './ClassList';
import ManageClass from './ManageClass';

const LecturerHome = () => {
  return (
    <div className="bg-indigo-400 rounded-lg managa-class">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <ManageClass />
        </div>
        <div className="min-h-0 p-4 overflow-y-auto bg-indigo-100 rounded-md srollbar-custom">
          <ClassList />
        </div>
      </div>
    </div>
  );
};

export default LecturerHome;
