import { createContext, useReducer } from 'react';
import todoReducer from './reducer';

export const AppContext = createContext();

const initialState = {
  todoList: [],
  isLoading: false,
  theme: 'light',
  editedTodo: { id: '', text: '', createdAt: '', isDone: '' },
};

function ContextProvider({ children }) {
  const [todoState, dispatch] = useReducer(todoReducer, initialState);

  return (
    <AppContext.Provider value={{ todoState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
export default ContextProvider;
