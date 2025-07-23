import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionReducer from './connectionSlice'
import requestsReducer from './requestsSlice'
import targetuserReducer from './targetUserSlice'
const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connection:connectionReducer,
        requests:requestsReducer,
        targetuser:targetuserReducer
    },
});

export default appStore;