import {createSlice} from "@reduxjs/toolkit";

export const bucketList = createSlice({
  name: "bucketList",
  initialState: {
    isOpenModal: false,
    selectedModules: [],
  },
  reducers: {
    setSelectedModules: (state, action) => {
      return {...state, selectedModules: action.payload};
    },
    openListModal: (state) => {
      return {...state, isOpenModal: true};
    },
    closeListModal: (state) => {
      return {...state, isOpenModal: false};
    },
  },
});

export const {openListModal, closeListModal, setSelectedModules} = bucketList.actions;

export default bucketList.reducer;
