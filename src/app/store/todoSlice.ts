import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const getInitialState = (): TodoState => {
  if (typeof window !== 'undefined') {
    const savedTodos = localStorage.getItem('todos');
    return {
      todos: savedTodos ? JSON.parse(savedTodos) : [],
    };
  }
  return { todos: [] };
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState: getInitialState(),
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      if (action.payload.trim()) {
        const newTodo: Todo = {
          id: Date.now().toString(),
          text: action.payload,
          completed: false,
        };
        state.todos.push(newTodo);
        if (typeof window !== 'undefined') {
          localStorage.setItem('todos', JSON.stringify(state.todos));
        }
      }
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        if (typeof window !== 'undefined') {
          localStorage.setItem('todos', JSON.stringify(state.todos));
        }
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo && action.payload.text.trim()) {
        todo.text = action.payload.text;
        if (typeof window !== 'undefined') {
          localStorage.setItem('todos', JSON.stringify(state.todos));
        }
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer; 