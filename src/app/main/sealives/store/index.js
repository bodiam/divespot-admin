import { combineReducers } from '@reduxjs/toolkit';

import sealife from './sealifeSlice';
import sealives from './sealivesSlice';

const reducer = combineReducers({
  sealife,
  sealives,
});

export default reducer;
