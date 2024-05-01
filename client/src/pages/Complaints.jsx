import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Complaint() {
  const [complaint, setComplaint] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getComplaint = async () => {
      try {
        const complaints = await axios.get(
          "http://localhost:3000/api/complaint/get"
        );
        setComplaint(complaints.data);
        console.log(complaints.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComplaint();
  }, []);
  
  const deleteHandler = async(id)=>{
    try{
      await axios.delete(`http://localhost:3000/api/complaint/delete/${id}`) ;
      alert("Complaint Deleted Successfully!");
      navigate('/admin/dashboard');
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
      <div className="absolute top-0 w-full">
        <AdminHeader />
      </div>
      <div>
        <p className="flex items-center justify-center w-full h-12 font-bold text-center bg-yellow-300">Complaints By The Users Which Should be taken into Action! </p>  

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
         
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
                <th scope="col" class="px-6 py-3">
                  Property Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Listed By
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Delete Complaint
                </th>
              </tr>
            </thead>
            <tbody>
              {complaint.map((singleComplaint, key) => {
                return (
                  <>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                     
                      <th
                        scope="row"
                        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div class="ps-3">
                          <div class="text-base font-semibold">{singleComplaint.name}</div>
                          <div class="font-normal text-gray-500">
                            {singleComplaint.email}
                          </div>
                        </div>
                      </th>
                      <td class="px-6 py-4">{singleComplaint.description}</td>
                      <td class="px-6 py-4">{singleComplaint.propertyName}</td>
                      <td class="px-6 py-4">{singleComplaint.listedBy}</td>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                          Online
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <button onClick={()=>deleteHandler(singleComplaint._id)}>Delete</button>
                      </td>
                    </tr>
                    ;
                  </>
                );
              })}
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
