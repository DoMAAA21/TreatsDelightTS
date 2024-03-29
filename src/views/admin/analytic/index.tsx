import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import ElectricityChart from "./chart/electricityChart";
import WaterChart from "./chart/waterChart";
import RentChart from "./chart/rentChart";
import SalesPerDayChart from "./chart/salesPerDayChart";
import SalesPerMonthChart from "./chart/salesPerMonthChart";

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const elementRef = useRef<HTMLDivElement>(null);

  const htmlToImageConvert = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '-');

    if (!elementRef.current) {
      return;
    }

    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl: string) => {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          const pdf = new jsPDF('p', 'mm', 'a4');
          const width = pdf.internal.pageSize.getWidth();
          const height = (img.height * width) / img.width;
          pdf.addImage(img, 'PNG', 0, 0, width, height);
          pdf.save(`analytics_${formattedDate}_${formattedTime}.pdf`);
        };
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div ref={elementRef} className="rounded-md p-4">
        <div className="p-2 bg-white mb-4 text-center rounded">
          <h2 className="text-2xl font-semibold">Reports</h2>
        </div>
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
      <div className="text-center mx-4 p-2 bg-white rounded">
        <button className="text-white bg-red-500 p-2 rounded mx-2" onClick={htmlToImageConvert}>Download PDF</button>
        <button className="text-white bg-violet-500 p-2 rounded"  onClick={()=>navigate('dynamic-reports')}>Dynamic Reports</button>
      </div>
    </div>
  );
};

export default AnalyticsPage;
