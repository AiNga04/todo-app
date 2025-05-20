import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';
import Pagination from './Pagination';

const TodoList: React.FC = () => {
  const { todos, filter, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.todos
  );

  // Lọc todos dựa trên filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Tính toán todos cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTodos = filteredTodos.slice(startIndex, endIndex);

  return (
    <div className="mt-8">
      <TodoFilter />
      <div className="mt-4 space-y-2">
        {currentTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default TodoList; 