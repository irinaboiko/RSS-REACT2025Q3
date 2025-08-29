import { useSelectedColumns } from '@/hooks/useSelectedColumns';
import type { ColumnKey } from '@/config/columns';
import { getLabelByKey } from '@/utils/renderTableData';

export const DataTableHeader = () => {
  const { selectedColumns } = useSelectedColumns();

  const headerStyle = {
    gridTemplateColumns: `repeat(${selectedColumns.length}, minmax(0, 1fr))`,
  };
  const headerClassName = `grid border-b-1 border-gray-200 bg-gray-50 py-1 bg-gray-100`;

  return (
    <div className={headerClassName} style={headerStyle}>
      {selectedColumns.map((columnKey: ColumnKey) => (
        <div
          key={columnKey}
          className="border-gray-200 px-2 not-last:border-r-1"
        >
          {getLabelByKey(columnKey)}
        </div>
      ))}
    </div>
  );
};
