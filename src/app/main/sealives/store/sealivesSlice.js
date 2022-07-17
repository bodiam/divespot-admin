import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnaGFzc2VuQGRpdmVzcG90LmNvbSIsImlhdCI6MTY1MzM4MDgwMSwiZXhwIjoxNjUzMzk4ODAxfQ.OJB43zUzZeO-9fa2HMsvxqHno9s3BEpX_lOUurTMIF_L72Q2Mz54_-n-mQWiu3gBsp1Pv5ehSYqV4CMBW9JHbg`;


export const getSealives = createAsyncThunk('sealives/getSealives', async ({page, rowsPerPage, searchText}) => {

  if(searchText && searchText.length !== 0) {
    const searchResponse = await axios.get(`/admin/sealife/search?q=${searchText}&sort=binomialName`);
    const searchData = await searchResponse.data.content;
    const searchTotalElements = await searchResponse.data.content.length;
    return {data: searchData,  totalElements: searchTotalElements}; 
  }else{
    const response = await axios.get(`/admin/sealife?sort=binomialName&page=${page}&size=${rowsPerPage}`);
    const data = await response.data._embedded.sealife;
    const totalElements = await response.data.page.totalElements;
    return {data, totalElements};
  }
});

export const removeSealives = createAsyncThunk(
  'sealives/removeSealives',
  async (sealifeIds, { dispatch, getState }) => {
    //await axios.delete('/admin/sealife', { data: sealifeIds });
    const promises = sealifeIds.map(async(id) => {
      await axios.delete(`/admin/sealife/${id}`);
    })
    Promise.all(promises)
    return sealifeIds;
  }
);

const sealivesAdapter = createEntityAdapter({});

export const { selectAll: selectSealives, selectById: selectSealifeById } =
  sealivesAdapter.getSelectors((state) => {
    if(state.SL)
   return   state.SL.sealives 
   else
    return {ids : []}
  } );

const sealivesSlice = createSlice({
  name: 'sealives',
  initialState: sealivesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setSealivesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getSealives.fulfilled]: (state, action) => {
      const { data, totalElements } = action.payload;
			sealivesAdapter.setAll(state, data);
      state.totalElements = totalElements
    },
    [removeSealives.fulfilled]: (state, action) =>
      sealivesAdapter.removeMany(state, action.payload),
  },
});

export const { setSealivesSearchText } = sealivesSlice.actions;

export const selectSealivesSearchText = ({SL}) =>  SL.sealives.searchText;

export default sealivesSlice.reducer;
