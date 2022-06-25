import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnaGFzc2VuQGRpdmVzcG90LmNvbSIsImlhdCI6MTY1MzM4MDgwMSwiZXhwIjoxNjUzMzk4ODAxfQ.OJB43zUzZeO-9fa2HMsvxqHno9s3BEpX_lOUurTMIF_L72Q2Mz54_-n-mQWiu3gBsp1Pv5ehSYqV4CMBW9JHbg`;


export const getSealives = createAsyncThunk('sealives/getSealives', async ({page, rowsPerPage}) => {
  const response = await axios.get(`/admin/sealife?sort=binomialName${page != undefined && rowsPerPage != undefined ? `&page=${page}&size=${rowsPerPage}` : ``} `);
  const data = await response.data.content;
  const totalPages = await response.data.page.totalPages;
  const totalElements = await response.data.page.totalElements;
  return {data, totalPages, totalElements};
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
      const { data, totalPages, totalElements } = action.payload;
			sealivesAdapter.setAll(state, data);
      state.totalPages = totalPages
      state.totalElements = totalElements
    },
    [removeSealives.fulfilled]: (state, action) =>
      sealivesAdapter.removeMany(state, action.payload),
  },
});

export const { setSealivesSearchText } = sealivesSlice.actions;

export const selectSealivesSearchText = ({SL}) =>  SL.sealives.searchText;

export default sealivesSlice.reducer;
