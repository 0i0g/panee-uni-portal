import { Link } from 'react-router-dom';
import Attendance from './lecturer/Attendance';
import ManageClass from './lecturer/ManageClass';
import ClassList from './lecturer/ClassList';

const LecturerHome = () => {
  return (
    <div>
      <div className="bg-indigo-400 rounded-lg managa-class">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <ManageClass />
          </div>
          <div className="min-h-0 p-4 overflow-y-auto bg-indigo-100 rounded-md srollbar-custom">
            <div className="text-center">
              <Link to="/">
                <button className="px-3 mb-3 font-extrabold transition bg-green-500 rounded-lg h-9 text-indigo-50 hover:bg-green-600 hover:text-indigo-100">
                  Create New
                </button>
              </Link>
            </div>
            <ClassList />
          </div>
        </div>
      </div>
      <Attendance />
    </div>
  );
};

export default LecturerHome;
