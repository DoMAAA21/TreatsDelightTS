import ElectricityChart from "./chart/electricityChart";
import WaterChart from "./chart/waterChart";
import RentChart from "./chart/rentChart";
import SalesPerDayChart from "./chart/salesPerDayChart";
import SalesPerMonthChart from "./chart/salesPerMonthChart";

const AnalyticsPage = () => {
  return (
    <div className="rounded-md p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-1 rounded-md">
          <ElectricityChart />
        </div>
        <div className="bg-white p-1 rounded-md">
          <WaterChart />
        </div>
        <div className="bg-white p-1 rounded-md">
          <RentChart />
        </div>
        <div className="bg-white p-1 rounded-md">
          <SalesPerDayChart />
        </div>
        <div className="bg-white p-1 rounded-md">
          <SalesPerMonthChart />
        </div>
      </div>
    </div>

  )
}

export default AnalyticsPage