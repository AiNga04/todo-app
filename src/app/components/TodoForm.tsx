import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';

const TodoForm: React.FC = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  const validateDeadline = (deadlineValue: string) => {
    if (!deadlineValue) return true;
    
    const deadlineDate = new Date(deadlineValue);
    const now = new Date();
    
    // Thêm 1 phút để tránh trường hợp deadline trùng với thời điểm hiện tại
    now.setMinutes(now.getMinutes() + 1);
    
    if (deadlineDate < now) {
      setError('Hạn hoàn thành phải sau thời điểm hiện tại ít nhất 1 phút');
      return false;
    }
    return true;
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDeadline = e.target.value;
    setDeadline(newDeadline);
    setError('');
    
    if (newDeadline) {
      validateDeadline(newDeadline);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!text.trim()) {
      setError('Vui lòng nhập nội dung công việc');
      return;
    }

    if (!validateDeadline(deadline)) {
      return;
    }

    dispatch(addTodo({ text, deadline }));
    setText('');
    setDeadline('');
  };

  // Tính toán thời gian tối thiểu cho deadline (thời điểm hiện tại + 1 phút)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    return now.toISOString().slice(0, 16);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col space-y-4">
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError('');
            }}
            placeholder="Thêm công việc mới..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="datetime-local"
              value={deadline}
              onChange={handleDeadlineChange}
              min={getMinDateTime()}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Thêm
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    </form>
  );
};

export default TodoForm; 