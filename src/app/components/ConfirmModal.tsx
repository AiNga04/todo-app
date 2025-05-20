import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'delete' | 'complete';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'delete'
}) => {
  if (!isOpen) return null;

  const getButtonStyles = () => {
    if (type === 'complete') {
      return {
        confirm: 'bg-green-600 hover:bg-green-700',
        cancel: 'text-gray-600 hover:bg-gray-100'
      };
    }
    return {
      confirm: 'bg-red-600 hover:bg-red-700',
      cancel: 'text-gray-600 hover:bg-gray-100'
    };
  };

  const buttonStyles = getButtonStyles();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${buttonStyles.cancel}`}
          >
            Hủy
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors ${buttonStyles.confirm}`}
          >
            {type === 'complete' ? 'Hoàn thành' : 'Xóa'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 