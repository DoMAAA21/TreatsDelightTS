import './home.css';
import Logo from '../../assets/logo.png';
import AOS from 'aos';

AOS.refresh();

const HomePage = () => {
    return (
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

                        <div className="text-white mr-8" data-aos="fade-right" data-aos-delay={300}>
                            <h1 className="text-6xl font-bold lg:text-9xl mb-4">Treats Delight</h1>
                            <p className="text-2xl lg:text-2xl">A Digital Transformation of TUP-T Canteen</p>
                        </div>
                        {/* Logo for larger screens */}
                        <div className="flex-shrink-0 hidden lg:block" data-aos="fade-left" data-aos-delay={300}>
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

    );
};

export default HomePage;
