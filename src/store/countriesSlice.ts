import { createSlice } from '@reduxjs/toolkit';

import { COUNTRIES } from '@/constants';
import type { Country } from '@/types/countries';

interface CountriesSliceState {
  countries: Country[];
}

const initialState: CountriesSliceState = {
  countries: COUNTRIES,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
