import axios from "axios";
import React, { useEffect, useState } from "react";
import './Home.css'
import { NavLink } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Home = () => {


  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChnage = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(inputUser);
    const res = await axios.post("http://localhost:5000/employees/addemp", inputUser);
    console.log(res);
    fetchAllUser();
  };

  // data fetching all
  const [userData, setUserData] = useState([]);
  const fetchAllUser = async () => {
    const res = await axios.get("http://localhost:5000/employees/allemployees");
    console.log(res);
    setUserData(res.data);
  };
  useEffect(() => {
    fetchAllUser();
  },[]);

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/employees/delete/${id}`);
    if (res.status === 200) {
      fetchAllUser();

//  Toastify Notification added
      toast.error('User Deleted Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        }); 

    }
  };

  const ToastifyHandle = ()=>{

    toast.success('User Added Successfully!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  return (
    <div className="w-2/3 mx-auto mt-5">
      {/* creating form */}
      <form onSubmit={handleSubmit}>

      <h1 className="text-blue-500 font-medium">
        Fullstack CRUD RESTfull API's 
      </h1>
        <h1 className="text-orange-500 font-medium">Create User</h1>

        <div className="">
          <label className=" text-sm text-gray-500 ">Name</label>
          <input
            type="text"
            name="name"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter name"
            required
            value={inputUser.name}
            onChange={handleChnage}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Email</label>
          <input
            type="text"
            name="email"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter email "
            required
            value={inputUser.email}
            onChange={handleChnage}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Password</label>
          <input
            type="password"
            name="password"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter Password "
            required
            value={inputUser.password}
            onChange={handleChnage}
          />
        </div>


      
      <div className="flex justify-center my-4">

       <button type="submit" onClick={ToastifyHandle} className="px-4 py-2 bg-yellow-400 rounded-sm">
            Add User
       </button>

   <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>


     
        </div>
      </form>
      <p>    <FaAnglesRight /></p>
      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-lg text-center text-gray-500 ">
          <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                SN.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, i) => (
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.name}
                </th>
                <td className="px-6 py-4"> {item?.email}</td>
                <td className="px-6 py-4"> {item?.password}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-4 justify-center">
                    <NavLink
                      to={`/readuser/${item._id}`}
                  className="font-medium text-green-600 dark:text-yellow-500 hover:underline"
                    >
                      Read
                    </NavLink>
                    <NavLink
                      to={`/updateuser/${item._id}`}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </NavLink>
       <button
              onClick={() => handleDelete(item._id)}
              className="font-medium text-red-500  hover:underline"
                    >
         Delete
         {/* Toastify Notification */}

  <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </button>
                  </div>
                </td>
                
            
              </tr>
            ))}
          </tbody>
       
      <span className="iconArrowContainer">
       <FaAnglesRight />
      </span>
        </table>
      </div>
      <div>
             Fullstack CRUD application based on MERN 
            </div>
    </div>
  );
};
export default Home;