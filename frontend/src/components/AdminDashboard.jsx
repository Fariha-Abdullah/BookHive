import { useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';
import BookList from './BookList';
import UploadBooks from './UploadBooks';
import Users from './Users';

// Import your tab components

const tabs = [
  { name: 'Upload', id: 'add' },
  { name: 'User List', id: 'list' },
  { name: 'Book List', id: 'book_list' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('add');
  const { user } = useContext(AuthContext);

  // if (!user?.isAdmin) {
  //   return <Redirect to="/signin" />;
  // }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow rounded-lg">
      {/* Tab headers */}
      <div className="border-b">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                `px-6 py-3 font-medium focus:outline-none border-b-2 transition-colors ` +
                (activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300')
              }
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab panels */}
      <div className="p-6">
        {activeTab === 'add' && <UploadBooks />}
        {activeTab === 'list' && <Users />}
        {activeTab === 'book_list' && <BookList />}
      </div>
    </div>
  );
};

export default AdminDashboard;
