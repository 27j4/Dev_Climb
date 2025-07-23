import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connection',
    initialState: { connections: JSON.parse(localStorage.getItem("connections")) || [] }, 
    reducers: {
        addConnections: (state, action) => {
            // state.connections = action.payload;
            localStorage.setItem("connections", JSON.stringify(action.payload))
        },
        removeConnection: (state, action) => {
            state.connections = state.connections.filter(conn => conn._id !== action.payload);
            localStorage.setItem("connections", JSON.stringify(state.connections));
        }        
    }
});

export const { addConnections, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
