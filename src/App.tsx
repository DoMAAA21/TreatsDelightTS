import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { HelmetProvider } from 'react-helmet-async';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';



function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <Router>
              <AppRoutes />
            </Router>
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
