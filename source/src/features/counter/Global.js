import { createSlice } from "@reduxjs/toolkit";

export const global = createSlice({
  name: "global",
  initialState: {
    isLogged: false,
    currentLoggedUser: {
      id: "316546092",
      type: "teacher",
    }
  },
  
  reducers: {
    setcurrentLoggedUser: (state, action) => {
    state.currentLoggedUser = action.payload;
  },setisLogged: (state, action) => {
    state.isLogged = action.payload;
  }
},
});

export const { setcurrentLoggedUser } = global.actions;
export const { setisLogged } = global.actions;

export const currentLoggedUser = (state) => state.currentLoggedUser;
export const isLogged = (state) => state.isLogged;

export default global.reducer;



// TODO
// export const setCurrentCourseAsync = (course) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(setCurrentCourse(course));
//   }, 1000);
// };
