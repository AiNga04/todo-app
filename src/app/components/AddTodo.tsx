import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';
import Toast from './Toast';

const AddTodo: React.FC = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showTextError, setShowTextError] = useState(false);
  const [showDeadlineError, setShowDeadlineError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTextError(false);
    setShowDeadlineError(false);

    if (!text.trim()) {
      setShowTextError(true);
      return;
    }

    if (deadline) {
      const now = new Date();
      const selectedDeadline = new Date(deadline);

      // Adjust 'now' to the nearest minute for comparison with datetime-local input
      now.setSeconds(0, 0);

      if (selectedDeadline < now) {
        setShowDeadlineError(true);
        return;
      }
    }

    dispatch(addTodo({ text: text.trim(), deadline: deadline || undefined }));
    setText('');
    setDeadline('');
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
              setShowTextError(false);
            }}
            placeholder="Thêm công việc mới..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => {
              setDeadline(e.target.value);
              setShowDeadlineError(false);
            }}
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

      {showTextError && (
        <Toast
          message="Vui lòng nhập nội dung công việc!"
          type="error"
          onClose={() => setShowTextError(false)}
        />
      )}

      {showDeadlineError && (
        <Toast
          message="Hạn chót không được là thời điểm trong quá khứ!"
          type="error"
          onClose={() => setShowDeadlineError(false)}
        />
      )}
    </>
  );
};

export default AddTodo; 