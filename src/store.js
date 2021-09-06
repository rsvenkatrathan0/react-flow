import { configureStore } from '@reduxjs/toolkit';
import shared from './store/reducers/shared';

export default configureStore({
  reducer: {
    shared,
  },
});
