
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaEdit, FaTrash, FaFileInvoiceDollar, FaUserCircle } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import Pagination from "./Pagination";

const Table = () => {
  const [username, setUsername] = useState("Loading...");
  const [employees, setEmployees] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:4001/api/auth/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await axios.get("http://localhost:4001/api/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      setEmployees(response.data.employees);
    } catch (error) {
      console.log("Error in fetching employees:", error);
    }
  };

  const handleUpdate = (employeeId) => {
    console.log("Update employee with ID:", employeeId);
  };

  const handleDelete = (employeeId) => {
    console.log("Delete employee with ID:", employeeId);
  };

  const handleExport = () => {
    console.log("Exporting employee data");
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchItem.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchItem.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchItem]);

  useEffect(() => {
    fetchUserProfile();
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-cyan-700 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
              <p className="text-gray-500">Welcome back, {username}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative flex items-center w-full sm:w-64">
              <input
                type="text"
                placeholder="Search employees..."
                onChange={handleSearchChange}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-00 focus:border-transparent shadow-sm"
              />
              <FaSearch className="absolute right-3 text-gray-400" />
            </div>
            {/* <button 
              onClick={handleExport}
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FiDownload className="mr-2" />
              Export
            </button> */}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cyan-700 text-white">
                <tr>
                  {['First Name', 'Last Name', 'Email', 'National ID', 'Position','Department' ,'Actions'].map((heading, index) => (
                    <th 
                      key={index} 
                      className={`py-4 px-6 text-left font-semibold ${index === 0 ? 'rounded-tl-xl' : ''} ${index === 7 ? 'rounded-tr-xl' : ''}`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      <FaUserCircle className="mx-auto text-4xl text-gray-300 mb-2" />
                      No employees found
                    </td>
                  </tr>
                ) : (
                  currentEmployees.map((employee, index) => (
                    <tr
                      key={employee.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">{employee.firstName}</td>
                      <td className="py-4 px-6 text-gray-700">{employee.lastName}</td>
                      <td className="py-4 px-6 text-gray-700">{employee.email}</td>
                      <td className="py-4 px-6 text-gray-700">{employee.nationalId}</td>
                      
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-medium">
                          {employee.department}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{employee.position}</td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleUpdate(employee.id)}
                            className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => handleDelete(employee.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                          <button 
                            onClick={() => console.log("View details for:", employee.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FaFileInvoiceDollar />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination and Status Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 border-t border-gray-100 rounded-b-xl">
            <div className="text-sm text-gray-500 mb-2 md:mb-0">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredEmployees.length)} of {filteredEmployees.length} entries
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaSearch } from "react-icons/fa";
// import Pagination from "./Pagination";

// const Table = () => {
//   const [username, setUsername] = useState("Loading...");
//   const [employees, setEmployees] = useState([]);
//   const [searchItem, setSearchItem] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage] = useState(5);

//   const handleSearchChange = (e) => {
//     setSearchItem(e.target.value);
//   };

//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const response = await axios.get("http://localhost:4001/api/auth/users/current", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-type": "application/json",
//         },
//       });
//       setUsername(response.data.username);
//     } catch (error) {
//       console.log("Error fetching user data:", error);
//     }
//   };

//   const fetchEmployees = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;
//       const response = await axios.get("http://localhost:4001/api/employee", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-type": "application/json",
//         },
//       });
//       setEmployees(response.data.employees);
//     } catch (error) {
//       console.log("Error in fetching employees:", error);
//     }
//   };

//   const filteredEmployees = employees.filter((employee) =>
//     employee.firstName.toLowerCase().includes(searchItem.toLowerCase()) ||
//     employee.lastName.toLowerCase().includes(searchItem.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredEmployees.length / usersPerPage);
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentEmployees = filteredEmployees.slice(indexOfFirstUser, indexOfLastUser);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchItem]);

//   useEffect(() => {
//     fetchUserProfile();
//     fetchEmployees();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="flex items-center space-x-4 mb-6">
//         <div className="w-12 h-12 bg-cyan-700 rounded-full flex items-center justify-center text-white font-semibold">
//           {username.charAt(0).toUpperCase()}
//         </div>
//         <span className="text-lg font-semibold text-gray-700">Hi, {username}</span>
//       </div>

//       <div className="max-w-7xl w-full bg-white shadow-lg rounded-lg p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl text-cyan-600 font-semibold">Employees in RCA EMS</h2>
//           <div className="relative flex items-center w-64">
//             <input
//               type="text"
//               placeholder="Search users..."
//               onChange={handleSearchChange}
//               className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-600"
//             />
//             <FaSearch className="absolute right-3 text-cyan-700" />
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-300 rounded-lg bg-white shadow-lg">
//             <thead className="bg-cyan-700 text-white">
//               <tr>
//                 {['First Name', 'Last Name', 'Email', 'National Id', 'Phone', 'Department', 'Position', 'Laptop Manufacturer', 'Model', 'Serial Number'].map((heading, index) => (
//                   <th key={index} className="py-4 px-4 text-left font-medium">{heading}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {currentEmployees.length === 0 ? (
//                 <tr>
//                   <td colSpan={10} className="py-4 text-center text-gray-500">No Users Found</td>
//                 </tr>
//               ) : (
//                 currentEmployees.map((employee, index) => (
//                   <tr
//                     key={employee.id}
//                     className={`hover:bg-cyan-50 transition-colors cursor-pointer ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
//                   >
//                     <td className="py-4 px-4 border-b border-gray-200">{employee.firstName}</td>
//                     <td className="py-4 px-4 border-b border-gray-200">{employee.lastName}</td>
//                     <td className="py-4 px-4 border-b border-gray-200">{employee.email}</td>
//                     <td className="py-4 px-4 border-b border-gray-200">{employee.nationalId}</td>
//                     <td className="py-4 px-4 border-b border-gray-200">{employee.Phone}</td>
//                     <td className="py-4 px-4 border-b border-gray-200">{employee.department}</td>
//                     <td className="py-4 px-4 border-b border-gray-200">{employee.position}</td>
//                     <td className="py-4 px-4 border-b border-gray-200">{employee.laptopManufacturer}</td>
//                     <td className="py-4 px-4 border-b border-gray-200">{employee.model}</td>
//                     <td className="py-4 px-4 border-b border-gray-200">{employee.serialNumber}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex justify-end mt-4">
//           <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Table;













// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { FaSearch } from "react-icons/fa";
// // import Pagination from "./Pagination";

// // const Table = () => {
// //   const [username, setUsername] = useState("Loading...");
// //   const [employees, setEmployees] = useState([]);
// //   const [searchItem, setSearchItem] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [usersPerPage] = useState(1);

// //   const handleSearchChange = (e) => {
// //     const searchTerm = e.target.value;
// //     setSearchItem(searchTerm);
// //   };

// //   const fetchUserProfile = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) return;

// //       const response = await axios.get("http://localhost:4001/api/auth/users/current", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-type": "application/json",
// //         },
// //       });
// //       setUsername(response.data.username);
// //     } catch (error) {
// //       console.log("Error fetching user data:", error);
// //     }
// //   };

// //   const fetchEmployees = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) return;
// //       const response = await axios.get("http://localhost:4001/api/employee",{
// //         headers:{
// //           Authorization : `Bearer ${token}`,
// //           "Content-type":"application/json",
// //         }
// //       });
// //       setEmployees(response.data.employees);
// //     } catch (error) {
// //       console.log("Error in fetching employees :", error);
// //     }
// //   };



// //   const filteredEmployees = employees.filter((employee) =>
// //     employee.firstName.toLowerCase().includes(searchItem.toLowerCase()) || employee.lastName.toLowerCase().includes(searchItem.toLowerCase())
// //   );

// //   const totalPages = Math.ceil(filteredEmployees.length / usersPerPage);
// //   const indexOfLastUser = currentPage * usersPerPage;
// //   const indexOfFirstUser = indexOfLastUser - usersPerPage;
// //   const currentEmployees = filteredEmployees.slice(indexOfFirstUser, indexOfLastUser);

// //   useEffect(() => {
// //     setCurrentPage(1); 
// //   }, [searchItem]);

// //   useEffect(() => {
// //     fetchUserProfile();
// //     fetchEmployees();
// //   }, []);

// //   return (
// //     <div className="min-h-screen  p-8 ">

// //       <div className="flex items-center space-x-4 mb-6">
// //         <div className="w-12 h-12 bg-cyan-700 rounded-full flex items-center justify-center text-white font-semibold">
// //           {username.charAt(0).toUpperCase()}
// //         </div>
// //         <span className="text-lg font-semibold text-gray-700">Hi, {username}</span>
// //       </div>
// //       <div className="max-w-7xl w-fullbg-white shadow-lg rounded-lg p-6">
// //         {/* <section className="text-lg font-bold mb-4 text-gray-700">
// //           Hi👋, <span>{username}</span>
// //         </section> */}

// //         <div className="flex items-center justify-between mb-6">
// //           <h2 className="text-xl text-cyan-600 font-semibold">Employees in RCA EMS</h2>
// //           <div className="relative flex items-center w-64">
// //             <input
// //               type="text"
// //               placeholder="Search users..."
// //               onChange={handleSearchChange}
// //               className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-600"
// //             />
// //             <FaSearch className="absolute right-3 text-cyan-700" />
// //           </div>
// //         </div>

// //         <div className="overflow-x-auto " >
// //           <table className="w-full max-w-max border border-gray-300 rounded-lg bg-white shadow-lg">
// //             <thead className="bg-cyan-700 text-white sticky top-0 z-10">
// //               <tr>
// //                 <th className="py-4 px-4 text-left">First Name </th>
// //                 <th className="py-4 px-4 text-left">Last Name</th>
// //                 <th className="py-4 px-4 text-left">Email</th>
// //                 <th className="py-4 px-4 text-left">National Id</th>
// //                 <th className="py-4 px-4 text-left">Phone</th>
// //                 <th className="py-4 px-4 text-left">Department</th>
// //                 <th className="py-4 px-4 text-left">Position</th>
// //                 <th className="py-4 px-4 text-left">Laptop Manufacturer</th>
// //                 <th className="py-4 px-4 text-left">Model</th>
// //                 <th className="py-4 px-4 text-left">Serial Number</th>
// //               </tr>
// //             </thead>
// //             <tbody className="">
// //               {currentEmployees.length === 0 ? (
// //                 <tr>
// //                   <td colSpan={10} className="py-4 text-center text-gray-500">
// //                     No Users Found
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 currentEmployees.map((employee, index) => (
// //                   <tr
// //                     key={employee.id}
// //                     className={`hover:bg-gray-50 transition-colors cursor-pointer ${
// //                         index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
// //                     }`}
// //                   >
// //                     <td className="py-4 px-4 border-b border-gray-200">{employee.firstName}</td>
// //                     <td className="py-4 px-4 border-b border-gray-200">{employee.lastName}</td>
// //                     <td className="py-4 px-4 border-b border-gray-200">{employee.email}</td>
// //                     <td className="py-4 px-4 border-b border-gray-200">{employee.nationalId}</td>
// //                     <td className="py-4 px-4 border-b border-gray-200">{employee.Phone}</td>
// //                     <td className="py-4 px-4 border-b border-gray-200">{employee.department}</td>
// //                     <td className="py-4 px-4 border-b border-gray-200">{employee.position}</td>
// //                     <td className="py-4 px-4 border-b border-gray-200">{employee.laptopManufacturer}</td>
// //                     <td className="py-4 px-4 border-b border-gray-200">{employee.model}</td>
// //                     <td className="py-4 px-4 border-b border-gray-200">{employee.serialNumber}</td>
                 
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //         <div className="flex justify-end">
// //           <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Table;

























