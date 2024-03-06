import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@contexts/themeContext';
import { ShopProvider } from '@contexts/shopContext';
import { Provider } from 'react-redux';
import store from './app/store';
import './index.css';
import { AuthContextProvider } from "@contexts/authContext";
import { DragDropContext } from 'react-beautiful-dnd'; // Import DragDropContext

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <DragDropContext> 
      <BrowserRouter>
        <ThemeProvider>
          <ShopProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </ShopProvider>
        </ThemeProvider>
      </BrowserRouter>
    </DragDropContext>
  </Provider>
);
