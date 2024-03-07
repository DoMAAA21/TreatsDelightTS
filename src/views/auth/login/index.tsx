import { Link } from 'react-router-dom';
import LoginForm from './loginForm';
import Logo from '../../../assets/logo.png';
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
              <div className="w-full flex-1 mt-36">
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