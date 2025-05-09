import {createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from './Utils/Constant';

export const getPhotosApi = createAsyncThunk(
  'photos/getPhotosApi',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const photos = await response.json();
      return photos;
    } catch (error) {
      return rejectWithValue(error.message || 'An unexpected error occurred');
    }
  },
);
