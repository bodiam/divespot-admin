import { combineReducers } from '@reduxjs/toolkit';

import divespot from './sealifeSlice';
import divespots from './sealivesSlice';

const reducer = combineReducers({
  divespot,
  divespots,
});

export default reducer;
