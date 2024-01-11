import WelcomeCard from './welcomeCard';
import WidgetNav from './widgetNav';
import ChartCard from './chartCard';

const DashboardPage = () => {
    return (
        <>
            <div className="lg:pt-8 pt-4 pb-3 lg:px-4">
                <WelcomeCard name="Monkey D. Luffy" />
            </div>


            <div className="flex flex-col lg:flex-row lg:px-4 ">

                <div className="w-full lg:w-2/6 mb-4 lg:mb-0 order-first lg:order-last">
                    <ChartCard />
                </div>

                <div className="w-full lg:w-4/6 mb-4 lg:mb-0 lg:mr-4 ">
                    <WidgetNav />
                </div>



            </div>
        </>
    );
};

export default DashboardPage;
