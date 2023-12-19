import { nanoid } from 'nanoid';
import { ACTIONS } from './actions';

const todoReducer = (state, action) => {
  if (action.type === ACTIONS.SET_TODO_LIST_FROM_DB) {
    // assign data from db to context data
    return { ...state, todoList: action.payload };
  }

  if (action.type === ACTIONS.DONE) {
    // changing "done" state to true in todo
    const todoListWithDoneChanges = state.todoList.map(todo => {
      if (todo.id === action.payload) {
        return { ...todo, isDone: true };
      }
      return todo;
    });
    return { ...state, todoList: todoListWithDoneChanges };
  }

  if (action.type === ACTIONS.NOT_DONE) {
    // changing "done" state to false in todo
    const todoListWithDoneChanges = state.todoList.map(todo => {
      if (todo.id === action.payload) {
        return { ...todo, isDone: false };
      }
      return todo;
    });
    return { ...state, todoList: todoListWithDoneChanges };
  }

  if (action.type === ACTIONS.ADD) {
    // adding todo
    const { id, text, createdAt, isDone } = action.payload;
    const newTodo = {
      id,
      text,
      createdAt,
      isDone,
    };
    return { ...state, todoList: [...state.todoList, newTodo] };
  }

  if (action.type === ACTIONS.REMOVE) {
    // removing todo
    const listWithRemovedTodo = state.todoList.filter(
      todo => todo.id !== action.payload
    );

    return { ...state, todoList: listWithRemovedTodo };
  }

  if (action.type === ACTIONS.EDIT) {
    // editing todo
    const { id, text, createdAt, isDone } = action.payload;
    const listWithEditedTodo = state.todoList.map(todo => {
      if (todo.id === id) {
        return {
          id,
          text,
          createdAt,
          isDone,
        };
      }
      return todo;
    });
    return {
      ...state,
      todoList: listWithEditedTodo,
    };
  }

  if (action.type === ACTIONS.CLEAR_ALL) {
    // clearing all list
    return { ...state, todoList: [] };
  }

  if (action.type === ACTIONS.SET_LOADING) {
    // changing loading state to true
    return { ...state, isLoading: true };
  }

  if (action.type === ACTIONS.UNSET_LOADING) {
    // changing loading state to false
    return { ...state, isLoading: false };
  }

  if (action.type === ACTIONS.SET_THEME_FROM_LOCALSTORAGE) {
    // setting theme from localstorage
    return { ...state, theme: action.payload };
  }

  if (action.type === ACTIONS.SET_LIGHT_THEME) {
    // changing theme to light
    return { ...state, theme: 'light' };
  }

  if (action.type === ACTIONS.SET_DARK_THEME) {
    // changing theme to dark
    return { ...state, theme: 'dark' };
  }

  throw new Error(`there is no such action like: ${action.type}`);
};

export default todoReducer;
