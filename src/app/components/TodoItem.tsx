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
  const [editDeadline, setEditDeadline] = useState(todo.deadline || '');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleEdit = () => {
    if (editText.trim()) {
      if (editDeadline) {
        const deadlineDate = new Date(editDeadline);
        const createdAt = new Date(todo.createdAt);
        
        if (deadlineDate < createdAt) {
          alert('Hạn hoàn thành không được trước thời điểm tạo công việc');
          return;
        }
      }
      
      dispatch(editTodo({ 
        id: todo.id, 
        text: editText,
        deadline: editDeadline || undefined 
      }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleToggleComplete = () => {
    if (!todo.completed) {
      setIsCompleteModalOpen(true);
    } else {
      dispatch(toggleTodo(todo.id));
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Không có thông tin';
      }
      return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      return 'Không có thông tin';
    }
  };

  const getDeadlineStatus = (deadline?: string, completedAt?: string) => {
    if (!deadline) return null;
    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) return null;

    if (!completedAt) {
      const now = new Date();
      if (deadlineDate < now) {
        return 'text-red-500';
      } else if (deadlineDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000) {
        return 'text-yellow-500';
      }
      return 'text-green-500';
    }

    const completionDate = new Date(completedAt);
    if (completionDate > deadlineDate) {
      return 'text-red-500';
    }
    return 'text-green-500';
  };

  const getCompletionStatus = (deadline?: string, completedAt?: string) => {
    if (!deadline || !completedAt) return null;
    const deadlineDate = new Date(deadline);
    const completionDate = new Date(completedAt);
    
    if (isNaN(deadlineDate.getTime()) || isNaN(completionDate.getTime())) return null;
    
    if (completionDate > deadlineDate) {
      return 'Hoàn thành trễ';
    }
    return 'Hoàn thành đúng hạn';
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDeadline(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div className="flex items-center flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            className="w-5 h-5 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          {isEditing ? (
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <input
                  type="datetime-local"
                  value={editDeadline}
                  onChange={handleDeadlineChange}
                  onKeyPress={handleKeyPress}
                  min={new Date(todo.createdAt).toISOString().slice(0, 16)}
                  className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setEditDeadline('')}
                  className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  Xóa hạn
                </button>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  Hủy
                </button>
                <button
                  onClick={handleEdit}
                  className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Lưu
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <span
                className={`text-gray-800 ${
                  todo.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {todo.text}
              </span>
              <div className="text-sm text-gray-500 mt-1">
                Tạo lúc: {formatDate(todo.createdAt)}
              </div>
              {todo.deadline && (
                <div className={`text-sm mt-1 ${getDeadlineStatus(todo.deadline, todo.completedAt)}`}>
                  Hạn hoàn thành: {formatDate(todo.deadline)}
                </div>
              )}
              {todo.completed && todo.completedAt && (
                <div className="text-sm mt-1 text-gray-500">
                  Hoàn thành lúc: {formatDate(todo.completedAt)}
                  {todo.deadline && (
                    <span className={`ml-2 ${getDeadlineStatus(todo.deadline, todo.completedAt)}`}>
                      ({getCompletionStatus(todo.deadline, todo.completedAt)})
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-500 hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-500 hover:text-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => dispatch(deleteTodo(todo.id))}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa công việc "${todo.text}"?`}
        type="delete"
      />

      <ConfirmModal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        onConfirm={() => {
          dispatch(toggleTodo(todo.id));
          setIsCompleteModalOpen(false);
        }}
        title="Xác nhận hoàn thành"
        message={`Bạn có chắc chắn đã hoàn thành công việc "${todo.text}"?`}
        type="complete"
      />
    </>
  );
};

export default TodoItem; 