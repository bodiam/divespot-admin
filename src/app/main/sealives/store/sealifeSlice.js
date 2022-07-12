import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { showMessage } from 'app/store/fuse/messageSlice';
import history from '@history';

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
    
    try {
      const { id } = getState().SL.sealife;

     //#region upload images
      var upload
      var links = []
      const promises = sealifeData?.uploadedImages?.map(async (uImage) => {
        upload = await axios.post(`/admin/image/base64`, { name: "", data: uImage.replace(/data:.+?,/, "") })
        links.push(process.env.REACT_APP_API_URL + upload.data.location)
      })
      if (promises) {
        await Promise.all(promises)
      }
      //#endregion

      //#region patch or post sealife
      if (id) {
         await axios.patch(`/admin/sealife/${id}`, {
          ...sealifeData,
          images: sealifeData.images ? [...sealifeData.images, ...links] : links,
          extraInfo: {},
          content: "",
          links: [ ]
        });
      } else {
         await axios.post(`/admin/sealife`, {
          ...sealifeData,
          images: sealifeData.images ? [...sealifeData.images, ...links] : links,
          extraInfo: {},
          content: "",
          links: [ ],
        });
      }
      //#endregion

      dispatch(showMessage({ message: "Saved successfuly!", variant: 'success', autoHideDuration: 3000 }));
    } catch (error) {
      dispatch(showMessage({ message: error.message, variant: 'error', autoHideDuration: 3000 }));
    }
    history.push({
      pathname: '/sealives',
    });

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
          description: '',
          tags: [],
          sealife: [],
          reviews: [],
          source: "",
          commonNames: [],
          binomialName: "",
          familyName: "",
          images: [],
          links: [],
          distribution: "",
          content: [],
          similarSealife: [],
          extraInfo: {},
          locations: [],
          latitude: null,
          longitude: null
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
