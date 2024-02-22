import React from 'react'
import FallSvg from '../../../assets/svg/fall.svg';


interface User {
  _id: string;
  email: string;
  avatar: {
    url: string;
  }
  fname: string;
  lname: string;
  role: string;
  store?: {
    storeId?: string | number;
    name?: string
  }
}
interface CardProps {
  user: User | null;
}



const Card: React.FC<CardProps> = ({ user }) => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  return (
    <div className="relative w-100 h-40 shadow-md rounded-xl bg-gray-700">
      <div className="px-5 pt-5 text-lg text-white">
        Howdy! {user?.fname} {user?.lname}
      </div>
      <div className="px-5 mt-1 text-md text-white">
        {user?.role} {user?.role.toLowerCase() === "owner" && `- ${user?.store?.name}`}
      </div>
      <div className="px-5 mt-4 text-md text-white">
        {formattedDate}
      </div>


      <img
        className="absolute top-[-25%] right-0 lg:w-80 lg:h-full w-40 h-40"
        src={FallSvg}

        alt="Sample image"
      />
    </div>
  )
}

export default Card