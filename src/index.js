import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import 'focus-visible';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import LanguageProvider from './context/LanguageProvider';
import SoundProvider from './context/SoundProvider';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <SoundProvider>
          <App />
        </SoundProvider>
      </LanguageProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
