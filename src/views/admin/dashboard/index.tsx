import { useAppSelector } from '../../../hooks';
import MetaData from '../../../components/MetaData';
import WelcomeCard from './welcomeCard';
import WidgetNav from './widgetNav';
import ChartCard from './chartCard';
import ExpensesWidget from './expensesWidget';


// useEffect(()=>{

// },[])

const DashboardPage = () => {


    const { user } = useAppSelector(state => state.auth);

    return (
        <>
            <MetaData title={'Dashboard'} />
            <div className="lg:pt-8 pt-4 pb-3 lg:px-4"
                data-aos="fade-down"
                data-aos-delay={100}>
                <WelcomeCard user= {user} />
            </div>
            {user && user?.role.toLowerCase() === "admin" && (
                <div className="flex flex-col lg:flex-row lg:px-4 ">
                    <div className="w-full lg:w-4/6 mb-4 lg:mb-0 lg:mr-4 "
                        data-aos="fade-right"
                        data-aos-delay={100}
                    >
                        <WidgetNav />
                    </div>
                </div>
            )}

            {user && (user?.role.toLowerCase() === "owner" || user?.role.toLocaleLowerCase() === "employee") && (
                <div className="flex flex-col lg:flex-row lg:px-4 ">

                    <div className="w-full lg:w-2/6 mb-4 lg:mb-0 order-first lg:order-last"
                        data-aos="fade-left"
                        data-aos-delay={100}
                    >
                        <ChartCard />
                    </div>

                    <div className="w-full lg:w-4/6 mb-4 lg:mb-0 lg:mr-4 "
                        data-aos="fade-right"
                        data-aos-delay={100}
                    >
                        <ExpensesWidget />
                    </div>
                </div>
            )}

        </>
    );





};

export default DashboardPage;
