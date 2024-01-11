import React from 'react'
import FallSvg from '../../../assets/svg/fall.svg';

interface CardProps {
  name: string;
}

const Card: React.FC<CardProps> = ({ name }) => {
  return (
    <div className="relative w-100 h-40 shadow-md rounded-xl bg-gray-700">
      <div className="p-5 text-lg text-white">
        Hello {name}!  
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