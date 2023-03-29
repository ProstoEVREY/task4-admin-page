import React, {createContext} from 'react';
import UserStore from './store/userStore.js'
import App from './App';
import {createRoot} from "react-dom";


export const Context = createContext(null)
const Container = document.getElementById('root')
const root = createRoot(Container)
root.render(
  <Context.Provider value={{
      user: new UserStore()
  }}>
    <App />
  </Context.Provider>)
