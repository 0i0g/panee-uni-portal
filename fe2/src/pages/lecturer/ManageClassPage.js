import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ManageClass from '../../components/lecturer/ManageClass';
import ClassList from '../../components/lecturer/ClassList';

const ManageClassPage = ({ history }) => {
  const [loadClassList, setLoadClassList] = useState(false);
  return (
    <div>
      <div className="bg-indigo-400 rounded-lg managa-class">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <ManageClass
              setLoadClassList={setLoadClassList}
              loadClassList={loadClassList}
              history={history}
            />
          </div>
          <div className="min-h-0 p-4 overflow-y-auto bg-indigo-100 rounded-md srollbar-custom">
            <div className="text-center">
              <Link to="/manageclass">
                <button className="px-3 mb-3 font-extrabold transition bg-green-500 rounded-lg h-9 text-indigo-50 hover:bg-green-600 hover:text-indigo-100">
                  Create New
                </button>
              </Link>
            </div>
            <ClassList load={loadClassList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClassPage;
