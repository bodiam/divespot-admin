import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Sealife = lazy(() => import('./sealife/Sealife'));
const Sealives = lazy(() => import('./Sealives'));


const SealivesConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/sealives',
      element: <Sealives />,
    },
    {
      path: '/sealives/:divespotId',
      element: <Sealife />,
    },

  ],
};

export default SealivesConfig;
