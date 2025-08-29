export const YearsTableHeader = () => {
  return (
    <div className="sticky top-0 right-0 left-0 grid grid-cols-4 border-b-1 border-gray-200 bg-gray-50 px-2 py-1 text-sm">
      <div>Year</div>
      <div>Population</div>
      <div>
        CO<sub>2</sub>
      </div>
      <div>
        CO<sub>2</sub> per capita
      </div>
    </div>
  );
};
