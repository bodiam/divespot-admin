import { combineReducers } from '@reduxjs/toolkit';

import divespot from './divespotSlice';
import divespots from './divespotsSlice';

const reducer = combineReducers({
  divespot,
  divespots,
});

export default reducer;
