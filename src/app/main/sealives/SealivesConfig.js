import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Divespot = lazy(() => import('./divespot/Divespot'));
const Divespots = lazy(() => import('./Divespots'));


const DivespotsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/sealives',
      element: <Divespots />,
    },
    {
      path: '/sealives/:divespotId',
      element: <Divespot />,
    },

  ],
};

export default DivespotsConfig;
