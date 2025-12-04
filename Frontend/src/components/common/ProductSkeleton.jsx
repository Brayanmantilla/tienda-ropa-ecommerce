function ProductSkeleton() {
    return (
        <div className="card animate-pulse">
            <div className="bg-gray-300 h-64 w-full"></div>
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                <div className="flex justify-between items-center mt-4">
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
            </div>
        </div>
    );
}

export default ProductSkeleton;