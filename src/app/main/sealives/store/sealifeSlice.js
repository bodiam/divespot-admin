import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnaGFzc2VuQGRpdmVzcG90LmNvbSIsImlhdCI6MTY1MzM4MDgwMSwiZXhwIjoxNjUzMzk4ODAxfQ.OJB43zUzZeO-9fa2HMsvxqHno9s3BEpX_lOUurTMIF_L72Q2Mz54_-n-mQWiu3gBsp1Pv5ehSYqV4CMBW9JHbg`;

export const getSealife = createAsyncThunk('sealife/getSealife', async (sealifeId) => {
  const response = await axios.get(`/admin/sealife/${sealifeId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeSealife = createAsyncThunk(
  'sealife/removeSealife',
  async (val, { dispatch, getState }) => {
    const { id } = getState().SL.sealife;
    await axios.delete(`/admin/sealife/${id}`);
    return id;
  }
);

export const saveSealife = createAsyncThunk(
  'sealife/saveSealife',
  async (sealifeData, { dispatch, getState }) => {
    const { id } = getState().SL.sealife;
    var response;
  if(id){
     response = await axios.patch(`/admin/sealife/${id}`, sealifeData);
  }else{
    response = await axios.post(`/admin/sealife`, sealifeData);
  }

    const data = await response.data;

    return data;
  }
);

const sealifeSlice = createSlice({
  name: 'sealife',
  initialState: null,
  reducers: {
    resetSealife: () => null,
    newSealife: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: null,
          name: '',
          location: '',
          entranceType: '',
          author: '',
          dateCreated: new Date().toLocaleString(),
          description: '',
          tags: [],
          sealife: [],
          reviews: []

        },
      }),
    },
  },
  extraReducers: {
    [getSealife.fulfilled]: (state, action) => action.payload,
    [saveSealife.fulfilled]: (state, action) => action.payload,
    [removeSealife.fulfilled]: (state, action) => null,
  },
});

export const { newSealife, resetSealife } = sealifeSlice.actions;

export const selectSealife = ({ SL }) => SL.sealife;

export default sealifeSlice.reducer;
