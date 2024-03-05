import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { HelmetProvider } from 'react-helmet-async';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from 'aos';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// import ScrollToTop from './helpers/ScrollToTop'; //import


AOS.init();

const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "PHP",
  intent: "capture",
  disableFunding: "card",
};

function App() {
 
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
          <PayPalScriptProvider  options={initialOptions}>
            <Router>
              {/* <ScrollToTop /> */}
              <AppRoutes />
            </Router>
            </PayPalScriptProvider>
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
