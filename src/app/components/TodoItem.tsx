import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Todo, toggleTodo, deleteTodo, editTodo } from '../store/todoSlice';
import ConfirmModal from './ConfirmModal';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      dispatch(editTodo({ id: todo.id, text: editText }));
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {todo.text}
          </span>
        )}
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
          >
            {isEditing ? 'Lưu' : 'Sửa'}
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
          >
            Xóa
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => dispatch(deleteTodo(todo.id))}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa công việc "${todo.text}"?`}
      />
    </>
  );
};

export default TodoItem; 