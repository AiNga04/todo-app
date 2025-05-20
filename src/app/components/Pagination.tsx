import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setPage } from '../store/todoSlice';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, filter, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.todos
  );

  // Lọc todos dựa trên filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => dispatch(setPage(i))}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
            ${
              currentPage === i
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => dispatch(setPage(Math.max(1, currentPage - 1)))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
          ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
      >
        Trước
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => dispatch(setPage(Math.min(totalPages, currentPage + 1)))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
          ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
      >
        Sau
      </button>
    </div>
  );
};

export default Pagination; 