import { Link } from 'react-router-dom';
import LoginForm from './loginForm';
import Logo from '../../../assets/logo.png'
import LoginSVG from '../../../assets/svg/login.svg';
import MetaData from '../../../components/MetaData';

const LoginPage = () => {
  return (
    <>
      <MetaData title={'Login'} />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center max-h-screen">
        <div className="max-w-screen-xl sm:m-2  bg-white shadow sm:rounded-lg flex justify-center  rounded-lg">
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex rounded-tl-lg rounded-bl-lg">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat flex items-center"
            >
              <img src={LoginSVG} alt="Login Background by Storyset" />
            </div>

          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img src={Logo} className="w-32 mx-auto lg:w-32" />
            </div>
            <div className="mt-4 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Log in
              </h1>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4" />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853" />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04" />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335" />
                      </svg>
                    </div>
                    <span className="ml-4">
                      Sign Up with Google
                    </span>
                  </button>
                </div>

                <div className="my-5 border-b text-center">
                  <div
                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or
                  </div>
                </div>
                <LoginForm />
              </div>
              <p className="text-gray-600 text-sm mt-4">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default LoginPage;