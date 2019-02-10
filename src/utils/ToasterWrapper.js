import { Toast } from 'native-base';

const ToastMessage = (message, type) => {
  Toast.show({
    text: message,
    duration: 5000,
    position: 'bottom',
    buttonText: 'Okay',
    textStyle: { color: 'white' },
    type,
  });
};

export default ToastMessage;
