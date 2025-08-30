import { use } from 'react';

import { ColumnSelector } from '@/components/ColumnSelector';
import { DataTable } from '@/components/DataTable';

import { getData } from '@/api/co2Data';
import type { CO2Data } from '@/types/table';
import { YearSelection } from '@/components/YearSelection';

export const App = () => {
  const data: CO2Data = use(getData());

  return (
    <div className="p-5">
      <h1 className="mb-3 text-center text-3xl">
        CO<sub>2</sub> Data
      </h1>

      <div className="flex justify-between gap-2 py-1">
        <YearSelection />

        <ColumnSelector />
      </div>

      <DataTable countries={data} />
    </div>
  );
};

export default App;
