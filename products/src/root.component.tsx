import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './routes/routes';

const RootComponent: React.FC = () => {
  return (

    <Router>
      <RoutesConfig />
    </Router>
  );
};

export default RootComponent;
