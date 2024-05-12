import React from 'react';
import './App.styl';
import {MainRouter} from "./router";
import {AuthProvider} from "./modules/auth";
import {AlertProvider} from "./modules/contexts/alert-provider";
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
      <Provider store={store}>
          <AlertProvider>
              <AuthProvider>
                  <MainRouter/>
              </AuthProvider>
          </AlertProvider>
      </Provider>

  );
}

export default App;
