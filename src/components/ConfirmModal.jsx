const ConfirmModal = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-2xl text-center">
      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
      <div className="flex justify-center gap-4">
        <button onClick={onCancel} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Confirm
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
