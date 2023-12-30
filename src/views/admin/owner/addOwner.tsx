import React, {  useState } from 'react';
import { religions } from '../../../components/inputs';


interface FormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: string;
  course: string;
  religion: string;
  store?: string;
  avatar: string;
}
const AddOwnerPage = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    religion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="lname" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="religion" className="block text-sm font-medium text-gray-700">
              Religion
            </label>
            <select
              id="religion"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="" disabled>
                Select Religion
              </option>
              {religions.map((religion) => (
                <option key={religion.label} value={religion.value}>
                  {religion.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default AddOwnerPage;
