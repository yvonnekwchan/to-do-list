import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

const useKeyboard = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState("hide");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible("show");
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible("hide");
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};

export default useKeyboard;
