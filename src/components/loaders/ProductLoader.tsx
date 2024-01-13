const ProductLoader = ({ repeat = 1 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: repeat }, (_, index) => (
      <div key={index} className="max-w-md bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
        <div className="w-full h-48 bg-gray-300"/>
        <div className="p-4">
          <div className="text-xl font-semibold mb-2 bg-gray-300 h-6 w-3/4 rounded-md"/>
          <p className="text-gray-600 bg-gray-300 h-4 w-1/2 rounded-md"/>
          <button className="mt-4 bg-gray-300 h-8  rounded-full w-full"/>
        </div>
      </div>
    ))}


  </div>
);

export default ProductLoader;
