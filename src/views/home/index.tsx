import './home.css';
import Logo from '../../assets/1128Logo.png';
import Drinks from '../../assets/home/drinks.svg';


const HomePage = () => {
    return (
        <div className="overflow-x-hidden">
            <div className="w-full max-w-full" id="heading">
                <div
                    className="relative bg-cover bg-center h-screen flex flex-col lg:flex-row items-center homepage-container"
                    style={{ backgroundImage: `url(https://cdn.animaapp.com/projects/6543a2d33a69872920c03d1c/releases/65abbd4440ec8d74c3e49952/img/copy-of-invitation-for-seminar--1.png)` }}
                >
                    <div className="container lg:pl-20 px-4">
                        <div className="lg:flex items-center mt-[-50px]">
                            {/* Logo for mobile */}

                            <div className="flex-shrink-0 lg:hidden sm:h-80 sm:w-80 mt-20 mb-12 flex items-center" data-aos="fade-left" data-aos-delay={300}>
                                <img
                                    src={Logo}
                                    alt="Your Logo"
                                    className="h-full w-full "
                                />
                            </div>

                            <div className="text-white mr-10 " data-aos="fade-right" data-aos-delay={500}>
                                <h1 className="text-6xl font-bold lg:text-9xl mb-4">1128 Bonapetite</h1>
                                {/* <p className="text-2xl lg:text-2xl">A Digital Transformation of TUP-T Canteen</p> */}

                                <div className="flex mt-6" >
                                    <button className="bg-neutral-800 hover:bg-neutral-600 text-white font-bold  py-4 px-8  lg:px-12 mr-4 rounded-3xl">
                                        Order Now
                                    </button>
                                    <button className="bg-transparent  hover:bg-neutral-600 text-white border border-white font-bold py-4 px-8 lg:px-12 rounded-3xl">
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
                {/* <h2 className="text-4xl font-semibold text-center pt-4 text-indigo-600">About Us</h2> */}
                <div className="container flex items-center justify-center">

                    <div className="mx-1 my-2 p-4">
                        <div className="flex flex-col lg:flex-row max-w-8xl max-h-sm mb-4">
                            <div className="w-full p-4 bg-white shadow-lg rounded-lg overflow-hidden" data-aos="fade-right" data-aos-delay={300} data-aos-duration={800}>
                                <h2 className="text-2xl font-semibold italic mb-12 text-indigo-600">About Us</h2>

                                <p className="text-gray-600">
                                Welcome to 1128, your go-to destination for a great drinking experience in the heart of TUP Taguig! At 1128, 
                                we take pride in creating a varied range of beverages to satisfy every taste. We have something for everyone, 
                                from refreshing fruit teas overflowing with natural flavors to rich frappes that give the right balance of 
                                sweetness and cold. Whether you're a coffee lover looking for a pick-me-up or a matcha fan who enjoys the green 
                                deliciousness, our menu has been carefully designed to satisfy your demands. 
                                We understand the student lifestyle, so we believe in offering high-quality beverages at reasonable pricing. 
                                We are committed to ensuring that you may enjoy your favorite drinks without breaking the wallet.
                                </p>
                            </div>

                            <div className="w-full p-4 flex justify-center order-first lg:order-last" data-aos="fade-left" data-aos-delay={300} data-aos-duration={800}>
                                <img src={Drinks} alt="Mobile Grocery" className="w-3/5 h-full object-cover rounded-lg" />
                            </div>
                        </div>


                        {/* <div className="flex flex-col lg:flex-row max-w-8xl max-h-md mb-4">
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
                        </div> */}


                    </div>

                </div>
            </div>


            <div className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div>
                        <p className="text-lg font-semibold">Bonapetite</p>
                        <p className="text-sm">Philippines</p>
                    </div>

                    <div>
                        <p className="text-sm">© 2024 1128-Bonapetite TUPT. All rights reserved.</p>
                    </div>
                </div>
            </div>



        </div>

    );
};

export default HomePage;
