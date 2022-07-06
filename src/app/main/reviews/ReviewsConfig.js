import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Divespot = lazy(() => import('./review/Review'));
const Divespots = lazy(() => import('./Reviews'));


const DivespotsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    /*{
      path: '/reviews',
      element: <Divespots />,
    },
    {
      path: '/reviews/:divespotId',
      element: <Divespot />,
    },*/

  ],
};

export default DivespotsConfig;
