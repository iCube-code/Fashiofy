import { useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "9876543210",
      isActive: true,
      role: "Admin",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "9876543211",
      isActive: false,
      role: "Customer",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      phone: "9876543212",
      isActive: true,
      role: "Manager",
    },
  ]);

  const toggleActive = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  return (
    <div className="p-5 bg-gray-100">
        <h2 className="text-xl text-black-600 font-bold p-5">Users</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-[600px] text-center">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-200">
                <th className=" border-r border-gray-300 p-4  text-gray-600 text-sm font-semibold text-center">User Name</th>
                <th className=" border-r border-gray-300 p-4  text-gray-600 text-sm font-semibold text-center">Email</th>
                <th className=" border-r border-gray-300 p-4  text-gray-600 text-sm font-semibold text-center">Phone Number</th>
                <th className=" border-r border-gray-300 p-4  text-gray-600 text-sm font-semibold text-center">Is Active</th>
                <th className=" border-r border-gray-300 p-4  text-gray-600 text-sm font-semibold text-center">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-300">
                  <td className="p-4 text-xs text-gray-500 font-medium">{user.name}</td>
                  <td className="p-4 text-xs text-gray-500 font-medium">{user.email}</td>
                  <td className="p-4 text-xs text-gray-500 font-medium">{user.phone}</td>
                  <td className="p-4 text-xs text-gray-500 font-medium">
                    <input
                      type="checkbox"
                      checked={user.isActive}
                      onChange={() => toggleActive(user.id)}
                    />
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-500 font-medium">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};
export default ManageUsers;
