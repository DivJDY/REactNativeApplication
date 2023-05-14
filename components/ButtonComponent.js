/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button} from 'react-native-paper';

function ButtonComponent({name, onPress}) {
  return (
    <Button
      buttonColor="black"
      textColor="white"
      mode="contained"
      onPress={onPress}
      style={{borderRadius: 10, width: 280, height: 45, fontSize: 20}}>
      {name}
    </Button>
  );
}

export default ButtonComponent;
