/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TextInput, DefaultTheme} from 'react-native-paper';

function TextInputComponent({
  placeholder,
  onChangeText,
  onBlur,
  value,
  style,
  keyboardType,
  secureTextEntry,
}) {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      placeholder: 'transparent',
    },
    fonts: {
      ...DefaultTheme.fonts,
      regular: {
        ...DefaultTheme.fonts.regular,
        padding: 0,
      },
    },
  };
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      onBlur={onBlur}
      value={value}
      style={[style, {backgroundColor: 'transparent', borderWidth: 2}]}
      keyboardType={keyboardType}
      contentContainerStyle={{alignItems: 'flex-start'}}
      theme={theme}
    />
  );
}

export default TextInputComponent;
