import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App.jsx';
import noteReducer from "./reducers/noteReducer";
import filterReducer from './reducers/filterReducer.js';

if (import.meta.hot) {
  import.meta.hot.on(
    "vite:beforeUpdate",
    () => console.clear()
  );
}

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
});

console.log(store.getState());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);