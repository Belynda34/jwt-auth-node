import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
    const [users, setUsers] = useState([]);
    const [searchItem, setSearchItem] = useState("");

    //   const users = [
    //     { id: 1, username: 'ntore', email: 'ntore@gmail.com' },
    //     { id: 2, username: 'belynda', email: 'belynda@gmail.com' },
    //     { id: 3, username: 'john', email: 'john@gmail.com' },
    //     // Add more dummy users or fetch from API
    //   ];

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/users");
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching in users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchItem.toLowerCase())
    );

    return (
        <div className="p-8">
            <div className="flex flex-col items-center mb-6">
                <h1 className="text-3xl font-bold text-cyan-700 mb-4">User Table</h1>
                <input
                    type="text"
                    placeholder="Search by username..."
                    value={searchItem}
                    onChange={handleSearchChange}
                    className="border-2 border-cyan-700 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-cyan-700">
                    <thead className="bg-cyan-700 text-white">
                        <tr>
                            <th className="py-2 px-4 border border-cyan-700">ID</th>
                            <th className="py-2 px-4 border border-cyan-700">Username</th>
                            <th className="py-2 px-4 border border-cyan-700">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="text-center py-4 text-cyan-700 font-semibold"
                                >
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-cyan-100">
                                    <td className="py-2 px-4 border border-cyan-700">
                                        {user.id}
                                    </td>
                                    <td className="py-2 px-4 border border-cyan-700">
                                        {user.username}
                                    </td>
                                    <td className="py-2 px-4 border border-cyan-700">
                                        {user.email}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
