import './home.css';
import Logo from '../../assets/logo.png';
import MobileGrocery from '../../assets/home/mobilegrocery.svg';

const HomePage = () => {
    return (
        <div>
            <div className='w-full'>
                <div
                    className="relative bg-cover bg-center h-screen flex flex-col lg:flex-row items-center homepage-container"
                    style={{ backgroundImage: `url(https://cdn.animaapp.com/projects/6543a2d33a69872920c03d1c/releases/65abbd4440ec8d74c3e49952/img/copy-of-invitation-for-seminar--1.png)` }}
                >
                    <div className="container lg:pl-20 pl-8">
                        <div className="lg:flex items-center">
                            {/* Logo for mobile */}

                            <div className="flex-shrink-0 lg:hidden mt-20 mb-12 flex items-center" data-aos="fade-left" data-aos-delay={300}>
                                <img
                                    src={Logo}
                                    alt="Your Logo"
                                    className="h-64 w-64"
                                />
                            </div>

                            <div className="text-white mr-8 " data-aos="fade-right" data-aos-delay={500}>
                                <h1 className="text-6xl font-bold lg:text-9xl mb-4">Treats Delight</h1>
                                <p className="text-2xl lg:text-2xl">A Digital Transformation of TUP-T Canteen</p>

                                <div className="flex mt-6" data-aos="fade-up" data-aos-delay={500}>
                                    <button className="bg-green-700 hover:bg-green-900 text-white font-bold  py-2 px-6 lg:py-4 lg:px-12 mr-4 rounded-3xl">
                                        Shop Now
                                    </button>
                                    <button className="bg-transparent  hover:bg-green-500 text-white border border-white font-bold py-2 px-6 lg:py-4 lg:px-12 rounded-3xl">
                                        Know More
                                    </button>
                                </div>
                            </div>

                            {/* Logo for larger screens */}
                            <div className="flex-shrink-0 hidden lg:block" data-aos="fade-left" data-aos-delay={500}>
                                <img
                                    src={Logo}
                                    alt="Your Logo"
                                    className="h-full lg:w-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container  flex justify-center h-screen ">
                <div className="mx-1 my-2">
                    <div className="flex flex-col md:flex-row max-w-8xl max-h-sm mb-4">
                     
                        <div className="w-full p-4 bg-white shadow-lg rounded-lg overflow-hidden mr-10" data-aos="fade-right" data-aos-delay={300} data-aos-duration={800}>
                            <h2 className="text-xl font-bold mb-2">Card Title</h2>
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <div className="w-full p-4" data-aos="fade-left" data-aos-delay={300} data-aos-duration={800}>
                            <img src={MobileGrocery} alt="Mobile Grocery" className="w-64 h-full object-cover rounded-lg" />
                        </div>

                        
                    </div>

                    <div className="flex flex-col md:flex-row max-w-8xl max-h-md mb-4">
                     
                        <div className="w-full p-4 bg-white shadow-lg rounded-lg overflow-hidden mr-10" data-aos="fade-right" data-aos-delay={300} data-aos-duration={800}>
                            <h2 className="text-xl font-bold mb-2">Card Title</h2>
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <div className="w-full p-4" data-aos="fade-left" data-aos-delay={300} data-aos-duration={800}>
                            <img src={MobileGrocery} alt="Mobile Grocery" className="w-64 h-full object-cover rounded-lg" />
                        </div>

                        
                    </div>


                    <div className="flex flex-col md:flex-row max-w-8xl max-h-md mb-4">
                     
                        <div className="w-full p-4 bg-white shadow-lg rounded-lg overflow-hidden mr-10" data-aos="fade-right" data-aos-delay={300} data-aos-duration={800}>
                            <h2 className="text-xl font-bold mb-2">Card Title</h2>
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <div className="w-full p-4" data-aos="fade-left" data-aos-delay={300} data-aos-duration={800}>
                            <img src={MobileGrocery} alt="Mobile Grocery" className="w-64 h-full object-cover rounded-lg" />
                        </div>

                        
                    </div>

                
                </div>

            </div>
        </div>

    );
};

export default HomePage;
