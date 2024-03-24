import QRCode from 'qrcode.react';
const DownloadApp = () => {
  const appUrl = import.meta.env.VITE_MOBILE_APP_DOWNLOAD_LINK;
  return (
    <div className="flex justify-center items-center h-[40rem]">
      <div className="bg-gray-100 p-8 rounded-lg">
        <h1 className="text-3xl text-center font-bold mb-4">Download our App</h1>
        <div className="text-center mb-4">
          <p>Scan the QR code to download</p>
        </div>
        <div className="text-center">
        <QRCode value={appUrl} size={300} />
        </div>
        <div className="text-center mt-4">
          <p>Or click</p>
          <a href={appUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Download Link
          </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
