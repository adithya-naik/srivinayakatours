import toast from 'react-hot-toast';

export const useToast = () => {
  const showSuccessToast = (message) => {
    toast.success(message, {
      duration: 4000,
      style: {
        background: '#10B981',
        color: '#FFFFFF',
      },
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      duration: 4000,
      style: {
        background: '#EF4444',
        color: '#FFFFFF',
      },
    });
  };

  const showLoadingToast = (message) => {
    return toast.loading(message, {
      style: {
        background: '#3B82F6',
        color: '#FFFFFF',
      },
    });
  };

  const dismissToast = (toastId) => {
    toast.dismiss(toastId);
  };

  return {
    showSuccessToast,
    showErrorToast,
    showLoadingToast,
    dismissToast,
  };
};