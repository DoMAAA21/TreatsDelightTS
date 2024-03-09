import { Link } from 'react-router-dom';
import MetaData from '../../components/MetaData';
import NotFound from  '../../assets/svg/notfound.svg';  

const NotFoundPage = () => {
  return (
    <>
      <MetaData title={'404'}/>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="text-center">
          <img  src={NotFound} alt="RestrictedIcon" style={{height: '500px'}}/>
          <h1 className="text-3xl font-semibold text-red-500 mb-4">404 Not Found</h1>
          <p className="text-lg mb-8">Sorry we can't find something .</p>
          <Link to="/home" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
