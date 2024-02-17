import ElectricityChart from "./electricityChart";

const AnalyticsPage = () => {
  return (
    <div className="mt-2 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md">
          <ElectricityChart />
        </div>
      </div>
    </div>

  )
}

export default AnalyticsPage