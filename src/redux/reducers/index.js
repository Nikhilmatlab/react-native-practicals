import {combineReducers} from '@reduxjs/toolkit';
import GetPhotosSlices from '../slices/GetPhotosSlices';

const rootReducer = combineReducers({
  photos: GetPhotosSlices,
});

export default rootReducer;
