import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';
import Toast from './Toast';

const AddTodo: React.FC = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo({ text: text.trim(), deadline: deadline || undefined }));
      setText('');
      setDeadline('');
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setShowError(false);
            }}
            placeholder="Thêm công việc mới..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Thêm công việc
        </button>
      </form>

      {showError && (
        <Toast
          message="Vui lòng nhập nội dung công việc!"
          type="error"
          onClose={() => setShowError(false)}
        />
      )}
    </>
  );
};

export default AddTodo; 