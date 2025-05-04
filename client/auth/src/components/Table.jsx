import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Table = () => {
  const [username, setUsername] = useState("Loading...");

  const [users,setUsers] =  useState([]);


  const [searchItem,setSearchItem] = useState();


  const handleSearchChange = (e) => {
    const searchTerm = e.target.value
  }

  // const filteredUsers = [
  //   // {id:1,username:'Ntore Habimana',email:'ntoreh@gmail.com',address:'Kimihurura'},
  //   // {id:2,username:'Rusizana Belinda',email:'belynda@gmail.com',address:'Kanombe'},
  //   // {id:3,username:'Ntore Brian',email:'brian@gmail.com',address:'Kabeza'}
  // ]

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }
      const response = await axios.get(
        "http://localhost:4000/api/users/current",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      setUsername(response.data.username);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };


  const fetchUsers = async () => { 
    try{
      const response = await axios.get("http://localhost:4000/api/users");
      setUsers(response.data.users);
    }catch(error){
      console.log('Error in fetching users :',error);
    }
  }

  useEffect(() => {
    fetchUserProfile();
    fetchUsers();
  }, []);
  return (
    <div className="h-screen w-full">
      <div className='max-w-full h-32 bg-white shadow-lg'>
            
      </div>
      <div className="w-full space-y-10 py-10">
        <div className="">
          <section className="text-lg  font-bold ">
            Hi👋,<span>{username}</span>
          </section>
        </div>
        <div className="flex items-center justify-between w-full">
            <h2 className="text-xl text-cyan-600 font-semibold">Employees in RCA EMS</h2>
            <div className=" relative flex items-center  rounded-full">
              <input type="text" placeholder="search" className="outline-none w-full h-[34px] bg-gray-100 rounded-full focus:border-2 focus:bg-white focus:border-gray-300 pl-4 font-semibold" />
              <FaSearch className="absolute right-3  text-cyan-700 " />
            </div>
        </div>
        {/* Table layout */}

<div className="overflow-x-auto">
        <table className="min-w-full border border-cyan-700 text-sm">
            <thead className="bg-cyan-700 text-white">
                <tr>
                    <th className="py-2 px-32">Id</th>
                    <th className="py-2 px-32">Username</th>
                    <th className="py-2 px-32">Email</th>
                    <th className="py-2 px-32">Address</th>
                </tr>
            </thead>
            <tbody>
                {users == 0  ? (
                    <tr>

                        <td colSpan={3}className="text-center font-semibold text-cyan-700">No Users Found</td>
                    </tr>
                ) : (
                    users.map((user) => (
                        <tr>
                            <td className="py-4 px-32">{user.id}</td>
                            <td className="py-4 px-32">{user.username}</td>
                            <td className="py-4 px-32">{user.email}</td>
                            <td className="py-4 px-32">{user.address}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
</div>
      </div>
    </div>
  );
};

export default Table;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Table = () => {
//     const [users, setUsers] = useState([]);
//     const [searchItem, setSearchItem] = useState("");

//     //   const users = [
//     //     { id: 1, username: 'ntore', email: 'ntore@gmail.com' },
//     //     { id: 2, username: 'belynda', email: 'belynda@gmail.com' },
//     //     { id: 3, username: 'john', email: 'john@gmail.com' },
//     //     // Add more dummy users or fetch from API
//     //   ];

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get("http://localhost:4000/api/users");
//             setUsers(response.data.users);
//         } catch (error) {
//             console.error("Error fetching in users:", error);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const handleSearchChange = (e) => {
//         const searchTerm = e.target.value;
//         setSearchItem(searchTerm);
//     };

//     const filteredUsers = users.filter((user) =>
//         user.username.toLowerCase().includes(searchItem.toLowerCase())
//     );

//     return (
//         <div className="p-8">
//             <div className="flex flex-col items-center mb-6">
//                 <h1 className="text-3xl font-bold text-cyan-700 mb-4">User Table</h1>
//                 <input
//                     type="text"
//                     placeholder="Search by username..."
//                     value={searchItem}
//                     onChange={handleSearchChange}
//                     className="border-2 border-cyan-700 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-cyan-700"
//                 />
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full border border-cyan-700">
//                     <thead className="bg-cyan-700 text-white">
//                         <tr>
//                             <th className="py-2 px-4 border border-cyan-700">ID</th>
//                             <th className="py-2 px-4 border border-cyan-700">Username</th>
//                             <th className="py-2 px-4 border border-cyan-700">Email</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredUsers.length === 0 ? (
//                             <tr>
//                                 <td
//                                     colSpan="3"
//                                     className="text-center py-4 text-cyan-700 font-semibold"
//                                 >
//                                     No users found
//                                 </td>
//                             </tr>
//                         ) : (
//                             filteredUsers.map((user) => (
//                                 <tr key={user.id} className="hover:bg-cyan-100">
//                                     <td className="py-2 px-4 border border-cyan-700">
//                                         {user.id}
//                                     </td>
//                                     <td className="py-2 px-4 border border-cyan-700">
//                                         {user.username}
//                                     </td>
//                                     <td className="py-2 px-4 border border-cyan-700">
//                                         {user.email}
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Table;
