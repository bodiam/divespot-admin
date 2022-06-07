import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnaGFzc2VuQGRpdmVzcG90LmNvbSIsImlhdCI6MTY1MzM4MDgwMSwiZXhwIjoxNjUzMzk4ODAxfQ.OJB43zUzZeO-9fa2HMsvxqHno9s3BEpX_lOUurTMIF_L72Q2Mz54_-n-mQWiu3gBsp1Pv5ehSYqV4CMBW9JHbg`;

export const getDivespot = createAsyncThunk('divespot/getDivespot', async (divespotId) => {
  const response = await axios.get(`/admin/divespot/${divespotId}`);
  const data = await response.data;


  const sealife = await axios.get(`/admin/divespot/${divespotId}/sealife`);
  data.sealife = await sealife.data?.content?.value

  return data === undefined ? null : data;
});

export const removeDivespot = createAsyncThunk(
  'divespot/removeDivespot',
  async (val, { dispatch, getState }) => {
    const { id } = getState().DV.divespot;
    await axios.delete(`/admin/divespot/${id}`);
    return id;
  }
);

export const saveDivespot = createAsyncThunk(
  'divespot/saveDivespot',
  async (divespotData, { dispatch, getState }) => {
    const { id } = getState().DV.divespot;
    var response;
  if(id){
     response = await axios.patch(`/admin/divespot/${id}`, divespotData);
  }else{
    response = await axios.post(`/admin/divespot`, divespotData);
  }

    const data = await response.data;

    return data;
  }
);

const divespotSlice = createSlice({
  name: 'divespot',
  initialState: null,
  reducers: {
    resetDivespot: () => null,
    newDivespot: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: null,
          name: '',
          location: '',
          diveLocation: {
            latitude: 50,
            longitude: 50
          },
          startLocation: {
            latitude: 51,
            longitude: 50
          },
          depth: {
            minDepth: 0,
            maxDepth: 0
          },
          visibility: {
            minVisibility: 0,
            maxVisibility: 0
          },
          entranceType: '',
          level: '',
          diveSiteType: '',
          author: '',
          description: '',
          tags: [],
          sealife: [],
          reviews: [],
          price: {          
            amount: 0,
            code: ''
          },
          dateCreated: new Date().toISOString()
        },
      }),
    },
  },
  extraReducers: {
    [getDivespot.fulfilled]: (state, action) => action.payload,
    [saveDivespot.fulfilled]: (state, action) => action.payload,
    [removeDivespot.fulfilled]: (state, action) => null,
  },
});

export const { newDivespot, resetDivespot } = divespotSlice.actions;

export const selectDivespot = ({ DV }) => DV.divespot;

export default divespotSlice.reducer;
