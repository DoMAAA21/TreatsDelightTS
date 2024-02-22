import ElectricityChart from "./electricityChart";
import WaterChart from "./waterChart";
import RentChart from "./rentChart";

const AnalyticsPage = () => {
  return (
    <div className="rounded-md p-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md">
          <ElectricityChart />
        </div>
        <div className="bg-white p-4 rounded-md">
          <WaterChart />
        </div>
        <div className="bg-white p-4 rounded-md">
          <RentChart />
        </div>
      </div>
    </div>

  )
}

export default AnalyticsPage