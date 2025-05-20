import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  deadline?: string;
  completedAt?: string;
}

export type FilterType = 'all' | 'completed' | 'active';

interface TodoState {
  todos: Todo[];
  filter: FilterType;
  currentPage: number;
  itemsPerPage: number;
}

const getInitialState = (): TodoState => {
  if (typeof window !== 'undefined') {
    const savedTodos = localStorage.getItem('todos');
    return {
      todos: savedTodos ? JSON.parse(savedTodos) : [],
      filter: 'all',
      currentPage: 1,
      itemsPerPage: 15,
    };
  }
  return { todos: [], filter: 'all', currentPage: 1, itemsPerPage: 15 };
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState: getInitialState(),
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string; deadline?: string }>) => {
      if (action.payload.text.trim()) {
        const newTodo: Todo = {
          id: Date.now().toString(),
          text: action.payload.text,
          completed: false,
          createdAt: new Date().toISOString(),
          deadline: action.payload.deadline,
        };
        state.todos.unshift(newTodo);
        if (typeof window !== 'undefined') {
          localStorage.setItem('todos', JSON.stringify(state.todos));
        }
      }
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        if (todo.completed) {
          todo.completedAt = new Date().toISOString();
        } else {
          todo.completedAt = undefined;
        }
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
    editTodo: (state, action: PayloadAction<{ id: string; text: string; deadline?: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo && action.payload.text.trim()) {
        todo.text = action.payload.text;
        todo.deadline = action.payload.deadline;
        if (typeof window !== 'undefined') {
          localStorage.setItem('todos', JSON.stringify(state.todos));
        }
      }
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, setFilter, setPage } = todoSlice.actions;
export default todoSlice.reducer; 