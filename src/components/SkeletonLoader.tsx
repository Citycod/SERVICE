// components/SkeletonLoader.tsx


interface SkeletonLoaderProps {
  type?: 'card' | 'list' | 'text';
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = 'card', count = 1 }) => {
  const CardSkeleton = () => (
    <div className="card animate-pulse">
      <div className="p-6 space-y-4">
        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="flex space-x-2">
          <div className="w-16 h-6 bg-gray-200 rounded"></div>
          <div className="w-16 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className="space-y-3 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center p-3 space-x-3 border rounded-lg">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
            <div className="w-1/4 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const TextSkeleton = () => (
    <div className="space-y-2 animate-pulse">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
      <div className="w-4/6 h-4 bg-gray-200 rounded"></div>
    </div>
  );

  const renderSkeletons = () => {
    switch (type) {
      case 'card':
        return [...Array(count)].map((_, i) => <CardSkeleton key={i} />);
      case 'list':
        return <ListSkeleton />;
      case 'text':
        return <TextSkeleton />;
      default:
        return <CardSkeleton />;
    }
  };

  return <>{renderSkeletons()}</>;
};

export default SkeletonLoader;