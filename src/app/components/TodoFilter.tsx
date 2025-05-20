import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setFilter, FilterType } from '../store/todoSlice';

const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.todos.filter);

  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'Tất cả' },
    { type: 'active', label: 'Chưa hoàn thành' },
    { type: 'completed', label: 'Đã hoàn thành' },
  ];

  return (
    <div className="flex justify-center gap-2 mb-6">
      {filters.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => dispatch(setFilter(type))}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${
              currentFilter === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter; 