import { useEffect} from 'react';

const Notification = ({ message, onClear }) => {
  useEffect(() => { const timer = setTimeout(onClear, 3000); return () => clearTimeout(timer); }, [onClear]);

  return(
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-red-500 text-white py-2 px-5 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
};

export default Notification;
