import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { colors } from '../../../components/theme';
import hide from '../../../assets/svg/hide-password.svg'
import show from '../../../assets/svg/show-password.svg'
interface CardProps {}

interface Employee {
  _id: number | string;
  firstname: string;
  lastname: string;
  email: string;
  religion: string;
  role: string;
}

const Profile: React.FC<CardProps> = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className='pt-1'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #b0cca9, #ffffff)',
            padding: '20px',
            borderRadius: '8px',
            height: '80px',
          }}
          id='greenbox'
        >
          <div className='p-4'>
            <h1 className='text-2xl font-semibold'>User Profile</h1>
          </div>
        </div>
      </div>
      <div className='pt-3'>
        <div
          id='graybox'
          style={{
            height: 'auto',
            borderRadius: '8px',
            padding: '20px',
            position: 'relative', // Set position to relative
          }}
          className='bg-[#657D51]/30'
        >
          <div className='p-4 pl-19 justify-center'>
            <img src={user?.avatar?.url} alt='User Avatar' className='h-2/5 w-2/5 object-cover rounded-full' />
          </div>

          <div className='Rectangle66 absolute bg-[#E6EFE3] rounded-[20px]'
          style={{
            width: '50%', // Set width to 80% of the parent container (graybox) for responsiveness
            height: '85%', // Set height to 85% of the parent container (graybox)
    left: '70%', // Center horizontally within the graybox
    top: '50%', // Center vertically within the graybox
    transform: 'translate(-50%, -50%)', // Centering trick
  }}
>
  <div className='p-8 md:p-20'> {/* Use smaller padding for smaller screens */}
    <div className="flex justify-between mb-2">    
      <div className="font-bold">First Name</div>
      <div className='text-left'>{user?.fname}</div>
    </div>
    
    <div className="flex justify-between mb-2">
      <div className="font-bold">Last Name</div>
      <div >{user?.lname}</div>
    </div>
    
    <div className="flex justify-between mb-2">
      <div className="font-bold">Religion</div>
      <div >{user?.religion}</div>
    </div>
    
    <div className="flex justify-between mb-2">
      <div className="font-bold">Role</div>
      <div >{user?.role}</div>
    </div>
    
    <div className="flex justify-between mb-2">
      <div className="font-bold">Email</div>
      <div >{user?.email}</div>
    </div>
    
    <div className="flex justify-between mb-2">
      <div className="flex items-center">
        <div className="font-bold">Password</div>
        <button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (<img src={hide} alt="Hide Password" className="svg-icon" />
                      ) : (<img src={show} alt="Show Password" className="svg-icon" />)}
                    </button>
                  </div>
                    <div style={{ width: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginLeft: '0%' }}>
                      {showPassword? (<>{user?.password}</>): '*'.repeat(Math.min(30, user?.password.length))}
                      </div>
    </div>
  </div>
  <button className={`${colors.primary} font-bold py-1 px-4 rounded-full absolute bottom-16 right-8 md:right-[40%]`}>
  Edit Profile
</button>

</div>

        </div>
      </div>
    </>
  );
};

export default Profile;
