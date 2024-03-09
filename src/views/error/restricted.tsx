import { Link } from 'react-router-dom';
import MetaData from '../../components/MetaData';
import RestrictedIcon from  '../../assets/svg/restricted.svg';  
const RestrictedPage = () => {
  return (
    <>
      <MetaData title={'Restricted'}/>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="text-center">
            <img src={RestrictedIcon} alt="RestrictedIcon" style={{height: '500px'}} />
          <h1 className="text-3xl font-semibold text-yellow-500 mb-4">Restricted Page</h1>
          <p className="text-lg mb-8">This is a restricted page. Only authorize users can view this content.</p>
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go to Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default RestrictedPage;
