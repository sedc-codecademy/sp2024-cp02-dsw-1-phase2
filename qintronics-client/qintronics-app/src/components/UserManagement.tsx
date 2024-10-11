import React, { useState, useEffect } from "react";

// Define the available roles for users
const roles = ["admin", "delivery person", "user"];

// Define a user interface
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    active: true,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "user",
    active: true,
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "delivery person",
    active: false,
  },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleRoleChange = (id: string, newRole: string) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
  };

  const toggleActiveStatus = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  useEffect(() => {
    // Fetch real users data if needed from DB
  }, []);

  return (
    <div>
      <h3 className="text-2xl font-medium text-gray-800 mb-6">Manage Users</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Active</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border rounded p-1"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2">
                {user.active ? "Active" : "Inactive"}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => toggleActiveStatus(user.id)}
                  className={`px-4 py-1 text-sm ${
                    user.active ? "bg-red-500" : "bg-green-500"
                  } text-white rounded`}
                >
                  {user.active ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
