import WelcomeCard from './welcomeCard';
import WidgetNav from './widgetNav';

const DashboardPage = () => {
    return (
        <>
            <div className="lg:pt-8 pt-4 pb-3 lg:px-4">
                <WelcomeCard name="Monkey D. Luffy" />
            </div>
            {/* <div className="flex lg:px-4">

                <div className="w-full lg:w-4/5 mb-4 lg:mb-0 lg:mr-4">
                    <WidgetNav />
                </div>

                <div className="w-full lg:w-1/5 mb-4 lg:mb-0">
                    <div className="bg-white shadow-md rounded-md">
                        <h1>Content</h1>
                    </div>
                </div>

            </div> */}

            <div className="flex flex-col lg:flex-row lg:px-4 ">

                <div className="w-full lg:w-4/5 mb-4 lg:mb-0 lg:mr-4 ">
                    <WidgetNav />
                </div>

                <div className="w-full lg:w-1/5 mb-4 lg:mb-0 order-first lg:order-last">
                    <div className="bg-white shadow-md rounded-md h-96">
                        <h1>Content asdhasdhas asdaydas asdasda asdas dasd as sasa</h1>
                    </div>
                </div>

            </div>


        </>
    );
};

export default DashboardPage;
