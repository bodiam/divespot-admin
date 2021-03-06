import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnaGFzc2VuQGRpdmVzcG90LmNvbSIsImlhdCI6MTY1MzM4MDgwMSwiZXhwIjoxNjUzMzk4ODAxfQ.OJB43zUzZeO-9fa2HMsvxqHno9s3BEpX_lOUurTMIF_L72Q2Mz54_-n-mQWiu3gBsp1Pv5ehSYqV4CMBW9JHbg`;


export const getDivespots = createAsyncThunk('divespots/getDivespots', async ({page, rowsPerPage}) => {
  const response = await axios.get(`/admin/review?page=${page}&size=${rowsPerPage}`, {

  });
  const data = await response.data.content;
  const totalPages = await response.data.page.totalPages;
  const totalElements = await response.data.page.totalElements;
  return {data, totalPages, totalElements};
});

export const removeDivespots = createAsyncThunk(
  'divespots/removeDivespots',
  async (divespotIds, { dispatch, getState }) => {
    //await axios.delete('/admin/review', { data: divespotIds });
    const promises = divespotIds.map(async(id) => {
      await axios.delete(`/admin/review/${id}`);
    })
    Promise.all(promises)
    return divespotIds;
  }
);

const divespotsAdapter = createEntityAdapter({});

export const { selectAll: selectDivespots, selectById: selectDivespotById } =
  divespotsAdapter.getSelectors((state) => state.DV.divespots);

const divespotsSlice = createSlice({
  name: 'divespots',
  initialState: divespotsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setDivespotsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getDivespots.fulfilled]: (state, action) => {
      const { data, totalPages, totalElements } = action.payload;
			divespotsAdapter.setAll(state, data);
      state.totalPages = totalPages
      state.totalElements = totalElements
    },
    [removeDivespots.fulfilled]: (state, action) =>
      divespotsAdapter.removeMany(state, action.payload),
  },
});

export const { setDivespotsSearchText } = divespotsSlice.actions;

export const selectDivespotsSearchText = ({DV}) =>  DV.divespots.searchText;

export default divespotsSlice.reducer;
