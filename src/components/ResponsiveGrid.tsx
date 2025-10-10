// components/ResponsiveGrid.tsx


interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      gap-4 
      ${className}
    `}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;