import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDisabledCards } from "../redux/togglesSlice";

export const loadDisabledCards = async (dispatch) => {
  try {
    await AsyncStorage.removeItem('disabledCards'); // Clears disabled cards on app restart
    dispatch(setDisabledCards([])); // Reset Redux state
  } catch (error) {
    console.error('Error clearing disabled cards:', error);
  }
};
