import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";


const ReadUser = () => {
  const { id } = useParams();
  // data fetching single employee
  const [userData, setUserData] = useState([]);
  const fetchSingleUser = async () => {
    const res = await axios.get(`http://localhost:5000/employees/singleemployee/${id}`);
    console.log(res);
    setUserData(res.data);
  };
  useEffect(() => {
    fetchSingleUser();
  },[]);
  return (
    <div className="w-2/3 mx-auto mt-5">
       <h1 className="text-orange-500 font-medium text-xl">Read User Details</h1>

       <FaAnglesRight />
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
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {userData.name}
              </th>
              <td className="px-6 py-4"> {userData.email}</td>
              <td className="px-6 py-4">{userData.password}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{height:"40px",width:"130px",backgroundColor:"orange",color:"white",borderRadius:"0%", marginTop:"20px", display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Link to="/" className="hover:underline"> Back to Home</Link>
      </div>
    </div>
  );
};

export default ReadUser;