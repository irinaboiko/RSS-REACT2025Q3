import { ColumnSortControl } from '@/components/ColumnSortControl';

import { useSelectedColumns } from '@/hooks/useSelectedColumns';
import { SORTABLE_COLUMNS } from '@/config/constants';
import { getLabelByKey } from '@/utils/renderTableData';
import type { ColumnKey } from '@/config/columns';

export const DataTableHeader = () => {
  const { selectedColumns } = useSelectedColumns();

  const headerStyle = {
    gridTemplateColumns: `repeat(${selectedColumns.length}, minmax(0, 1fr))`,
  };
  const headerClassName = `grid border-b-1 border-gray-200 bg-gray-50 py-1 bg-gray-100`;

  return (
    <div className={headerClassName} style={headerStyle}>
      {selectedColumns.map((columnKey: ColumnKey) => {
        const label = getLabelByKey(columnKey);
        const isSortable = SORTABLE_COLUMNS.includes(columnKey);

        return (
          <div
            key={columnKey}
            className="flex items-center justify-between border-gray-200 px-2 not-last:border-r-1"
          >
            <span>{label}</span>

            {isSortable && <ColumnSortControl />}
          </div>
        );
      })}
    </div>
  );
};
