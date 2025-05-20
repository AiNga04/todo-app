'use client';

import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

// Wrap the main content in a client component
const TodoApp = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Todo App
        </h1>
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
};

// Dynamically import the TodoApp component with no SSR
const TodoAppNoSSR = dynamic(() => Promise.resolve(TodoApp), {
  ssr: false,
});

export default function Home() {
  return (
    <Provider store={store}>
      <TodoAppNoSSR />
    </Provider>
  );
}
