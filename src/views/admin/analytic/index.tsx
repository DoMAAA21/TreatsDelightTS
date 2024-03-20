import { useRef } from "react";
import ElectricityChart from "./chart/electricityChart";
import WaterChart from "./chart/waterChart";
import RentChart from "./chart/rentChart";
import SalesPerDayChart from "./chart/salesPerDayChart";
import SalesPerMonthChart from "./chart/salesPerMonthChart";
import { toPng } from 'html-to-image';

const AnalyticsPage = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const htmlToImageConvert = () => { 
    if (!elementRef.current) {
      return;
    } 
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '-');
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl: string) => {
        const link = document.createElement("a");
        link.download = `analytics_${formattedDate}_${formattedTime}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  return (
    <div ref={elementRef} className="rounded-md p-4">
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

      <button onClick={htmlToImageConvert}>Download Image</button>
    </div>

  )
}

export default AnalyticsPage