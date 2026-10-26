import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyles = [
    styles.input,
    error && styles.errorInput,
    style,
  ];

  return <NativeTextInput style={textInputStyles} {...props} />;
};

export default TextInput;
