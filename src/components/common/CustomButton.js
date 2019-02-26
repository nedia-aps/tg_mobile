import React from 'react';
import { Dimensions, Text } from 'react-native';
import { Button } from 'native-base';
import { colors } from '../../utils';

const deviceWin = Dimensions.get('window');

const styles = {
  textStyle: {
    fontSize: 16,
    color: colors.whiteColor
  },
  buttonStyle: {
    width: deviceWin.width * 0.9,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    margin: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 20
  }
};

const CustomButton = props => {
  const { labelText, onTouch } = props;
  const { textStyle, buttonStyle } = styles;
  const labelStyle = { ...textStyle };
  const touchStyle = { ...buttonStyle };

  return (
    <Button onPress={onTouch} style={touchStyle}>
      <Text style={labelStyle}>{labelText}</Text>
    </Button>
  );
};

export default CustomButton;
