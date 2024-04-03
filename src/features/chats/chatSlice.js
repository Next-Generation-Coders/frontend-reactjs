import {createSlice} from '@reduxjs/toolkit'
import {chats} from '@db/chats';



export const Chats = createSlice({
    name: 'chats',
    initialState: {
        chats: chats,
        selectedChatId: null,
    },
    reducers: {
        setChats: (state,action)=>{
            state.chats = action.payload
            state.selectedChatId = action.payload.length > 0 ? action.payload[0]._id : null
        },
        toggleComplete: (state, action) => {
            const chatIndex = state.chats.findIndex(chat => chat._id === action.payload._id);
            if (chatIndex !== -1) {
                const updatedChats = [...state.chats];
                updatedChats[chatIndex] = {
                    ...updatedChats[chatIndex],
                    selected: true,
                };
                updatedChats.forEach(chat => {
                    if (chat._id !== action.payload._id) {
                        chat.selected = false;
                    }
                });
                state.chats = updatedChats;
            }
        },
        updateOrder: (state, action) => {
            state.chats = action.payload;
        },
        removeTodo: (state, action) => {
            state.chats = state.chats.filter(todo => todo._id !== action.payload._id);
        },
        addChat: (state, action) => {
            state.chats.unshift({
                type: action.payload.type,
                label: action.payload.label,
                timestamp: action.payload.timestamp,
                complete: false,
                expanded: action.payload.expanded,
            });
        },
        toggleCollapse: (state, action) => {
            state.chats.forEach(chat => {
                chat.selected = chat._id === action.payload.id;
            });
            state.selectedChatId = action.payload.id;
        },
    }
})

export const {toggleComplete, updateOrder, removeTodo, addChat, toggleCollapse,setChats} = Chats.actions
export default Chats.reducer