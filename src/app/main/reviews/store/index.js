import { combineReducers } from '@reduxjs/toolkit';

import divespot from './reviewSlice';
import divespots from './reviewsSlice';

const reducer = combineReducers({
  divespot,
  divespots,
});

export default reducer;
