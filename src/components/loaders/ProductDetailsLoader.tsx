const ProductDetailsLoader = () => {
    return (
        <>
            <div className="w-full h-full animate-pulse mt-8" >
                <div className="hidden lg:flex md:flex mx-20 px-20" style={{ height: '72vh' }}>
                    <div className="w-4/6 bg-gray-300 rounded-bl-2xl rounded-tl-2xl overflow-hidden shadow-md" >
                        <div className="animate-pulse h-96"></div>
                    </div>

                    <div className="w-2/6 bg-gray-300 shadow-md p-4 text-justify flex flex-col rounded-tr-2xl rounded-br-2xl">
                        <div className="animate-pulse flex-grow mt-20">
                            <div className="h-6 bg-gray-200 mb-4 w-2/3 rounded-lg" />
                            <div className="h-8 bg-gray-200 mb-4 w-4/5 rounded-lg" />
                            <div className="h-6 bg-gray-200 mb-4 w-3/4 rounded-lg" />
                        </div>

                        <div className="flex items-center mb-4">
                            <div className="h-8 bg-gray-200 w-1/4" />
                            <div className="relative text-center w-16 ml-2">
                                <div className="h-8 bg-gray-200" />
                            </div>
                        </div>
                        <div className="h-12 bg-gray-200 w-full rounded-lg" />
                    </div>
                </div>
            </div>
            <div className="lg:hidden md:hidden">
                <div className="animate-pulse">
                    <div className="h-[200px] md:h-full w-full bg-gray-300 rounded" />
                </div>
            </div>
            <div className="lg:hidden md:hidden">
                <div className="animate-pulse">
                    <div className="h-[200px] md:h-full w-full bg-gray-300 rounded p-2">
                        <div className="animate-pulse flex-grow">
                            <div className="h-6 bg-gray-200 mb-4 w-2/3 rounded-lg" />
                            <div className="h-4 bg-gray-200 mb-4 w-4/5 rounded-lg" />
                            <div className="h-6 bg-gray-200 mb-4 w-3/4 rounded-lg py-2" />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="h-6 bg-gray-200 w-1/4" />
                            <div className="relative text-center w-16 ml-2">
                                <div className="h-6 bg-gray-200" />
                            </div>
                        </div>
                        <div className="h-6 bg-gray-200 w-full rounded-lg" />
                    </div>
                </div>
            </div>


        </>
    );
};

export default ProductDetailsLoader
