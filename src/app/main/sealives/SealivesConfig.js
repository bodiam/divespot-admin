import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Divespot = lazy(() => import('./sealife/Sealife'));
const Divespots = lazy(() => import('./Sealives'));


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
