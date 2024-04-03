import {configureStore} from '@reduxjs/toolkit';
import TodosReducer from '../features/todos/todosSlice';
import ChatsReducer from '../features/chats/chatSlice';
export default configureStore({
    reducer: {
        todos: TodosReducer,
        chats: ChatsReducer
    }
});