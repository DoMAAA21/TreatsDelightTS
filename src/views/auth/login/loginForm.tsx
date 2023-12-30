import { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { colors } from '../../../components/theme';
import { clearErrors, login } from '../../../store/reducers/auth/authenticationSlice';
import { topErrorMsg } from '../../../components/toast';


const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, error, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
    if (error) {
      topErrorMsg(error);
      dispatch(clearErrors());
    }
  }, [isAuthenticated, error])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="mx-auto max-w-xs">
      <form onSubmit={handleSubmit}>
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
        <button
          className={`mt-5 tracking-wide ${colors.primary} font-semibold w-full py-4 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
          disabled={loading}
        >
          <span className="ml-3">
            {loading ? 'Logging in...' : 'Log in'}
          </span>
        </button>
      </form>

    </div>
  );
};

export default LoginForm;
