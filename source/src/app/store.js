import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { setcurrentLoggedUser, currentLoggedUser } from '../features/counter/Global';
import reducer from '../features/counter/Global';

export default configureStore({
  reducer: {
    currentLoggedUser: setcurrentLoggedUser,
  },
}
);

