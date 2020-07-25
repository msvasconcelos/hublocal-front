import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

function App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </>
)

export default App;
