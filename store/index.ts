import {configureStore} from "@reduxjs/toolkit";
import bucketList from "./bucketList";

export const store = configureStore({
  reducer: {
    bucketList,
  },
});

export type RootState = ReturnType<typeof store.getState>;
