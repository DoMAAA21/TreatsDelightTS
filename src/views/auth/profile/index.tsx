import React from 'react';
import { useAppSelector } from '../../../hooks';

const ProfilePage: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <div className="px-4 md:px-20"> 
            <div className="pt-1">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "linear-gradient(135deg, #b0cca9, #ffffff)",
                        padding: "20px",
                        borderRadius: "8px",
                        height: "80px",
                    }}
                    id="greenbox"
                >
                    <div className="p-4">
                        <h1 className="text-2xl font-semibold">User Profile</h1>
                    </div>
                </div>
            </div>
            <div className="pt-3">
                <div
                    id="graybox"
                    style={{
                        height: "auto",
                        borderRadius: "8px",
                        padding: "20px",
                        position: "relative", 
                    }}
                >
                    <div className="bg-[#E6EFE3] rounded-[20px] p-8 md:p-20">
                        <div className="pb-10">
                            <img src={user?.avatar?.url} alt="User Avatar" className="lg:h-4/4 lg:w-1/4 md:h-1/5 md:w-1/5 h-3/5 w-3/5 object-cover rounded-full mx-auto md:mx-0 mb-4 md:mb-0 md:float-left md:mr-4" />
                        </div>
                        <div className="flex text-2xl justify-between mb-2">
                            <div className="font-bold">First Name</div>
                            <div className="text-left">{user?.fname}</div>
                        </div>

                        <div className="flex text-xl justify-between mb-2">
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

                       {/* <div className="pt-20">
                        <button className={`${colors.primary} font-bold py-2 px-4 rounded-full absolute bottom-4 left-4 right-4 md:bottom-16 lg:right-[40%] md:left-auto md:right-8 `}>
                            Edit Profile
                        </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
