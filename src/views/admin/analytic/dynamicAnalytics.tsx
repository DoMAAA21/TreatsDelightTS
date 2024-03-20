import { useRef } from "react";
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import DynamicSalesChart from "./chart/dynamicSalesChart";


const DynamicAnalyticsPage = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-1 rounded-md">
            <DynamicSalesChart />
          </div>
        </div>
      </div>
      <div className="text-center mx-4 p-2 bg-white rounded">
        <button className="text-white bg-red-500 p-2 rounded mx-2" onClick={htmlToImageConvert}>Download PDF</button>
      </div>
    </div>
  );
};

export default DynamicAnalyticsPage;
