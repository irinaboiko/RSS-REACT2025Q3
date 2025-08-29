import { COLUMNS } from '@/config/columns';
import { useSelectedColumns } from '@/hooks/useSelectedColumns';

export const ColumnSelectorModal = () => {
  const { selectedColumns, toggleColumn } = useSelectedColumns();

  return (
    <div className="absolute top-8 -right-1 z-10 w-80 border-1 border-gray-300 bg-gray-200 p-2">
      {COLUMNS.map((column) => {
        const isChecked = selectedColumns.includes(column.key);

        return (
          <div key={column.key}>
            <input
              type="checkbox"
              id={column.key}
              checked={isChecked}
              disabled={column.required}
              onChange={() => toggleColumn(column.key, column.required)}
            />
            <label htmlFor={column.key}> {column.label}</label>
          </div>
        );
      })}
    </div>
  );
};
