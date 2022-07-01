import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { showMessage } from 'app/store/fuse/messageSlice';
import history from '@history';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnaGFzc2VuQGRpdmVzcG90LmNvbSIsImlhdCI6MTY1MzM4MDgwMSwiZXhwIjoxNjUzMzk4ODAxfQ.OJB43zUzZeO-9fa2HMsvxqHno9s3BEpX_lOUurTMIF_L72Q2Mz54_-n-mQWiu3gBsp1Pv5ehSYqV4CMBW9JHbg`;

export const getDivespot = createAsyncThunk('divespot/getDivespot', async (divespotId) => {
  const response = await axios.get(`/admin/divespot/${divespotId}`);
  const data = await response.data;


  const sealife = await axios.get(`/admin/divespot/${divespotId}/sealife`);
  if(sealife && sealife.data && sealife.data.content && !sealife.data.content[0].value  )
  data.sealife = await sealife.data?.content

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

    try {
      const { id } = getState().DV.divespot;
      var upload
      var links = []
      const promises = divespotData?.uploadedImages?.map(async (uImage) => {
        upload = await axios.post(`/admin/image/base64`, { name: "", data: uImage.replace(/data:.+?,/, "") })
        links.push(process.env.REACT_APP_API_URL + upload.data.location)
      })
      if (promises) {
        await Promise.all(promises)
      }


      if (id) {
        await axios.patch(`/admin/divespot/${id}`, {
          ...divespotData,
          ...(divespotData.images && { images: [...divespotData.images, ...links] }),
          startLocation : (!divespotData.startLocation.latitude || !divespotData.startLocation.longitude) ? null  : divespotData.startLocation
        })
        if(divespotData.combinedSealives ) {
          var uriList = ''
           divespotData.combinedSealives.map((c) => {
   uriList = uriList + process.env.REACT_APP_API_URL + '/admin/sealife/' + c.id + '\n'
})

          await axios.put(`/admin/divespot/${id}/sealife`, uriList, 
          {
            headers: {
                'Content-Type': 'text/uri-list'
            }
        }
         )
    

        }
      } else {
        await axios.post(`/admin/divespot`, {
          ...divespotData,
          images: [...divespotData.images, ...links]
        });
      }
      dispatch(showMessage({ message: "Saved successfuly!", variant: 'success', autoHideDuration: 3000 }));
    } catch (error) {
      dispatch(showMessage({ message: error.message, variant: 'error', autoHideDuration: 3000 }));
    }
    history.push({
      pathname: '/divespots',
    });

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
            latitude: null,
            longitude: null
          },
          depth: {
            minDepth: 0,
            maxDepth: 0
          },
          visibility: {
            minVisibility: 0,
            maxVisibility: 0
          },
          entranceType: null,
          level: null,
          diveSiteType: null,
          activityType: [],
          author: '',
          description: '',
          tags: [],
          sealife: [],
          reviews: [],
          price: {
            amount: 0,
            code: ''
          },
          dateCreated: new Date().toISOString(),
          uploadedImages: [],
          images: [],
          combinedSealives: []
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
