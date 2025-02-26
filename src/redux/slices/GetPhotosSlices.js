import {createSlice} from '@reduxjs/toolkit';
import {getPhotosApi} from '../../common/api';

const GetPhotosSlices = createSlice({
  name: 'photos',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPhotosApi.pending, state => {
      state.isLoader = true;
      state.isError = false;
      state.errorMessage = null;
    });
    builder.addCase(getPhotosApi.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(getPhotosApi.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
  },
});

export default GetPhotosSlices.reducer;
