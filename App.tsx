import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import Router from './src/screens/Router';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
