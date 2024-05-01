import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ComplaintPost() {
    const [complaint, setComplaint] = useState({
        name: '',
        description: '',
        propertyName: '',
        listedBy: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComplaint(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/complaint/create', complaint);
            console.log(response.data); // Log the response if needed
            // Optionally, you can reset the form fields after successful submission
            setComplaint({
                name: '',
                description: '',
                propertyName: '',
                listedBy: '',
            });
            alert("Complaint Submitted Successfully!")
            navigate('/');
        } catch (error) {
            console.error('Error creating complaint:', error);
        }
    };

    return (
        <div className="max-w-md p-6 mx-auto mt-8 bg-white rounded-lg shadow-lg">
            <h1 className="mb-6 text-3xl font-bold text-center">Raise A Complaint</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={complaint.name}
                        onChange={handleChange}
                        className="block w-full mt-1 border-gray-300 rounded-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={complaint.description}
                        onChange={handleChange}
                        rows="4"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm resize-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700">Property Name:</label>
                    <input
                        id="propertyName"
                        type="text"
                        name="propertyName"
                        value={complaint.propertyName}
                        onChange={handleChange}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="listedBy" className="block text-sm font-medium text-gray-700">Listed By:</label>
                    <input
                        id="listedBy"
                        type="text"
                        name="listedBy"
                        value={complaint.listedBy}
                        onChange={handleChange}
                        className="block w-full mt-1 border-gray-300 rounded-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit Complaint
                </button>
            </form>
        </div>
    );
}
