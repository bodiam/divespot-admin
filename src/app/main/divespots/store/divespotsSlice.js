import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnaGFzc2VuQGRpdmVzcG90LmNvbSIsImlhdCI6MTY1MzM4MDgwMSwiZXhwIjoxNjUzMzk4ODAxfQ.OJB43zUzZeO-9fa2HMsvxqHno9s3BEpX_lOUurTMIF_L72Q2Mz54_-n-mQWiu3gBsp1Pv5ehSYqV4CMBW9JHbg`;


export const getDivespots = createAsyncThunk('divespots/getDivespots', async ({page, rowsPerPage, searchText}) => {
  
  if(searchText && searchText.length !== 0) {
    const searchResponse = await axios.get(`/admin/divespot/search?q=${searchText}`);
    const searchData = await searchResponse.data;
    const searchTotalElements = await searchResponse.data.length;
    return {data: searchData,  totalElements: searchTotalElements}; 
  }else{
    const response = await axios.get(`/admin/divespot?sort=name&page=${page}&size=${rowsPerPage}`);
    const data = await response.data._embedded.divespot;
    const totalElements = await response.data.page.totalElements;
    return {data, totalElements};
  }

});


export const removeDivespots = createAsyncThunk(
  'divespots/removeDivespots',
  async (divespotIds, { dispatch, getState }) => {
    //await axios.delete('/admin/divespot', { data: divespotIds });
    const promises = divespotIds.map(async(id) => {
      await axios.delete(`/admin/divespot/${id}`);
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
      const { data, totalElements } = action.payload;
			divespotsAdapter.setAll(state, data);
      state.totalElements = totalElements
    },
    [removeDivespots.fulfilled]: (state, action) =>
      divespotsAdapter.removeMany(state, action.payload),
  },
});

export const { setDivespotsSearchText } = divespotsSlice.actions;

export const selectDivespotsSearchText = ({DV}) =>  DV.divespots.searchText;

export default divespotsSlice.reducer;
