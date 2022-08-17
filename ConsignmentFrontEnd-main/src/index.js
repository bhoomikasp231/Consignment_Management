import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Footer from './components/footer/Footer';
import Authentication from './Authentication';
import * as serviceWorker from '../src/ServiceWorker';

ReactDOM.render(
  <React.StrictMode>
   <Authentication/>
    {/* <Footer /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

  serviceWorker.unregister();

reportWebVitals();
