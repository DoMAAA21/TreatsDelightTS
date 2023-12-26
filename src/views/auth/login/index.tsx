import { FC } from 'react';
import LoginForm from './loginForm';
import Logo from '../../../assets/logo.png'
import BreakFastLogo from '../../../assets/svg/breakfast.svg';

const LoginPage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 rounded-lg">
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex rounded-tl-lg rounded-bl-lg">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat flex items-center"
          >
            <img src={BreakFastLogo} alt="Login Background" />
          </div>

        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src={Logo} className="w-48 mx-auto lg:w-32" />
          </div>
          <LoginForm />
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
