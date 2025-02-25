import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  disabledCards: [],
};

const togglesSlice = createSlice({
  name: 'toggles',
  initialState,
  reducers: {
    toggleCard: (state, action) => {
      const { albumId, id } = action.payload;
      const cardKey = `${albumId}-${id}`;

      if (state.disabledCards.includes(cardKey)) {
        state.disabledCards = state.disabledCards.filter((key) => key !== cardKey);
      } else {
        state.disabledCards.push(cardKey);
      }

      AsyncStorage.setItem('disabledCards', JSON.stringify(state.disabledCards));
    },
    setDisabledCards: (state, action) => {
      state.disabledCards = action.payload;
    },
    clearDisabledCards: (state) => {
      state.disabledCards = []; // Clears disabled cards on app restart
      AsyncStorage.removeItem('disabledCards'); 
    }
  },
});

export const { toggleCard, setDisabledCards, clearDisabledCards } = togglesSlice.actions;
export default togglesSlice.reducer;
