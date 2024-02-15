import './home.css';
import Logo from '../../assets/logo.png';
import MobileGrocery from '../../assets/home/mobilegrocery.svg';
import OrderConfirmed from '../../assets/home/orderconfirmed.svg';
import Pizza from '../../assets/home/pizza.svg';
import Burger from '../../assets/home/burger.svg';
import Hotdog from '../../assets/home/hotdogsandwich.svg';
import Donut from '../../assets/home/donut.svg';
import Fries from '../../assets/home/fries.svg';
import Bowl from '../../assets/home/bowl.svg';
import Egg from '../../assets/home/Egg.svg';
import Chicken from '../../assets/home/chicken.svg';
import Soup from '../../assets/home/soup.svg';

const HomePage = () => {
    return (
        <div className="overflow-x-hidden">
            <div className="w-full max-w-full" id="heading">
                <div
                    className="relative bg-cover bg-center h-screen flex flex-col lg:flex-row items-center homepage-container"
                    style={{ backgroundImage: `url(https://cdn.animaapp.com/projects/6543a2d33a69872920c03d1c/releases/65abbd4440ec8d74c3e49952/img/copy-of-invitation-for-seminar--1.png)` }}
                >
                    <div className="container lg:pl-16 px-4">
                        <div className="lg:flex items-center">
                            {/* Logo for mobile */}

                            <div className="flex-shrink-0 lg:hidden sm:h-80 sm:w-80 mt-20 mb-12 flex items-center" data-aos="fade-left" data-aos-delay={300}>
                                <img
                                    src={Logo}
                                    alt="Your Logo"
                                    className="h-full w-full "
                                />
                            </div>

                            <div className="text-white mr-8 " data-aos="fade-right" data-aos-delay={500}>
                                <h1 className="text-6xl font-bold lg:text-9xl mb-4">Treats Delight</h1>
                                <p className="text-2xl lg:text-2xl">A Digital Transformation of TUP-T Canteen</p>

                                <div className="flex mt-6" data-aos="fade-up" data-aos-delay={500}>
                                    <button className="bg-green-700 hover:bg-green-900 text-white font-bold  py-4 px-8  lg:px-12 mr-4 rounded-3xl">
                                        Shop Now
                                    </button>
                                    <button className="bg-transparent  hover:bg-green-500 text-white border border-white font-bold py-4 px-8 lg:px-12 rounded-3xl">
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


            <div className="flex flex-col items-center max-w-full mt-10 p-4" id="aboutme">
                <h2 className="text-4xl font-semibold text-center pt-4 text-indigo-600">About Us</h2>
                <div className="container flex items-center justify-center">

                    <div className="mx-1 my-2 p-4">
                        <div className="flex flex-col lg:flex-row max-w-8xl max-h-sm mb-4">
                            <div className="w-full p-4 bg-white shadow-lg rounded-lg overflow-hidden" data-aos="fade-right" data-aos-delay={300} data-aos-duration={800}>
                                <h2 className="text-2xl font-semibold italic mb-12 text-indigo-600">Canteen Inventory</h2>

                                <p className="text-gray-600">
                                    Welcome to our TreatsDelight Web! This web allows you to manage and track the stock of various items in your canteen with ease.
                                    Whether you're restocking snacks, managing beverages, or keeping track of kitchen supplies, our app has you covered.
                                    Take control of your inventory, streamline ordering processes, and ensure that your canteen operates smoothly.
                                </p>
                            </div>

                            <div className="w-full p-4 flex justify-center order-first lg:order-last" data-aos="fade-left" data-aos-delay={300} data-aos-duration={800}>
                                <img src={MobileGrocery} alt="Mobile Grocery" className="w-64 h-full object-cover rounded-lg" />
                            </div>
                        </div>


                        <div className="flex flex-col lg:flex-row max-w-8xl max-h-md mb-4">
                            <div className="w-full p-4 flex justify-center mr-16" data-aos="fade-right" data-aos-delay={300} data-aos-duration={800}>
                                <img src={OrderConfirmed} alt="Mobile Grocery" className="w-64 h-full object-cover rounded-lg" />
                            </div>

                            <div className="w-full p-4 bg-white shadow-lg rounded-lg overflow-hidden" data-aos="fade-left" data-aos-delay={300} data-aos-duration={800}>
                                <h2 className="text-2xl font-semibold italic mb-12 text-indigo-600">Ordering App</h2>
                                <p className="text-gray-600">
                                    Experience the convenience of smooth and efficient ordering, right at your fingertips.
                                    Explore a wide variety of dishes and place your orders effortlessly. Our app ensures a seamless process from selection to delivery.
                                    Dive into the world of nutrition with detailed facts provided for each dish. Make informed choices and prioritize your well-being.
                                </p>
                            </div>
                        </div>


                    </div>

                </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-green-100" id="functionalities">
                <h2 className="text-4xl font-semibold text-center pt-4 text-indigo-600 mb-4">Functionalities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-32 gap-y-10 p-4 justify-center ">
                    <div className="bg-white shadow h-40 w-72 p-4 flex items-center justify-center rounded-3xl" data-aos="fade-right" data-aos-delay={300} data-aos-duration={800}>
                        <div className="mr-4 w-4/5">
                            <p className="text-2xl text-indigo-500 font-bold">Inventory Management</p>

                        </div>
                        <div className="w-1/5">
                            <img src={Pizza} alt="Icon" className="w-16 h-16" />
                        </div>
                    </div>

                    <div className="bg-white shadow h-40 w-72 p-4 flex items-center justify-center rounded-3xl" data-aos="fade-right" data-aos-delay={300} data-aos-duration={800}>
                        <div className="mr-4 w-4/5">
                            <p className="text-2xl text-indigo-500 font-bold">Order Reservations</p>

                        </div>
                        <div className="w-1/5">
                            <img src={Bowl} alt="Icon" className="w-16 h-16" />
                        </div>
                    </div>

                    <div className="bg-white shadow h-40 w-72 p-4 flex items-center justify-center rounded-3xl" data-aos="fade-right" data-aos-delay={300} data-aos-duration={800}>
                        <div className="mr-4 w-4/5">
                            <p className="text-2xl text-indigo-500 font-bold">Menu Management</p>

                        </div>
                        <div className="w-1/5">
                            <img src={Burger} alt="Icon" className="w-16 h-16" />
                        </div>
                    </div>

                    <div className="bg-white shadow h-40 w-72 p-4 flex items-center justify-center rounded-3xl" data-aos="fade-left" data-aos-delay={300} data-aos-duration={800}>
                        <div className="mr-4 w-4/5">
                            <p className="text-2xl text-indigo-500 font-bold">Nutritional Factors</p>

                        </div>
                        <div className="w-1/5">
                            <img src={Hotdog} alt="Icon" className="w-16 h-16" />
                        </div>
                    </div>

                    <div className="bg-white shadow h-40 w-72 p-4 flex items-center justify-center rounded-3xl" data-aos="fade-left" data-aos-delay={300} data-aos-duration={800}>
                        <div className="mr-4 w-4/5">
                            <p className="text-2xl text-indigo-500 font-bold">Mobile Kiosk</p>

                        </div>
                        <div className="w-1/5">
                            <img src={Donut} alt="Icon" className="w-16 h-16" />
                        </div>
                    </div>

                    <div className="bg-white shadow h-40 w-72 p-4 flex items-center justify-center rounded-3xl" data-aos="fade-left" data-aos-delay={300} data-aos-duration={800}>
                        <div className="mr-4 w-4/5">
                            <p className="text-2xl text-indigo-500 font-bold">Order Reservations</p>

                        </div>
                        <div className="w-1/5">
                            <img src={Fries} alt="Icon" className="w-16 h-16" />
                        </div>
                    </div>

                    <div className="bg-white shadow h-40 w-72 p-4 flex items-center justify-center rounded-3xl" data-aos="fade-right" data-aos-delay={300} data-aos-duration={800}>
                        <div className="mr-4 w-4/5">
                            <p className="text-2xl text-indigo-500 font-bold">Inventory Management</p>

                        </div>
                        <div className="w-1/5">
                            <img src={Egg} alt="Icon" className="w-16 h-16" />
                        </div>
                    </div>

                    <div className="bg-white shadow h-40 w-72 p-4 flex items-center justify-center rounded-3xl" data-aos="fade-right" data-aos-delay={300} data-aos-duration={800}>
                        <div className="mr-4 w-4/5">
                            <p className="text-2xl text-indigo-500 font-bold">Order Reservations</p>

                        </div>
                        <div className="w-1/5">
                            <img src={Chicken} alt="Icon" className="w-16 h-16" />
                        </div>
                    </div>


                    <div className="bg-white shadow h-40 w-72 p-4 flex items-center justify-center rounded-3xl" data-aos="fade-right" data-aos-delay={300} data-aos-duration={800}>
                        <div className="mr-4 w-4/5">
                            <p className="text-2xl text-indigo-500 font-bold">Menu Management</p>

                        </div>
                        <div className="w-1/5">
                            <img src={Soup} alt="Icon" className="w-16 h-16" />
                        </div>
                    </div>

                </div>
            </div>


            <div className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div>
                        <p className="text-lg font-semibold">Treats Delight</p>
                        <p className="text-sm">Philippines</p>
                    </div>

                    <div>
                        <p className="text-sm">© 2024 TreatsDelight. All rights reserved.</p>
                    </div>
                </div>
            </div>



        </div>

    );
};

export default HomePage;
