import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Input, Item, Icon } from 'native-base';
import { colors } from '../../utils';

const { blackColor, lagoonColor } = colors;
const T = PropTypes;

const styles = {
  inputStyleMultiline: {
    fontSize: 15
  },
  inputItemStyle: {
    borderColor: lagoonColor
  },
  inputFont: {
    fontSize: 15
  },
  inputStyle: {}
};
const TgInput = ({
  placeholder,
  multiline,
  numberOfLines,
  value,
  error,
  onChangeText,
  keyboardType,
  secureTextEntry,
  iconName
}) => {
  const { inputItemStyle } = styles;
  return (
    <View>
      <Item style={inputItemStyle}>
        <Icon name={iconName} />
        <Input
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={{ color: blackColor }}
          placeholderTextColor={blackColor}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      </Item>
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

TgInput.propTypes = {
  placeholder: T.string.isRequired,
  multiline: T.bool,
  numberOfLines: T.number,
  value: T.string.isRequired,
  error: T.string,
  onChangeText: T.func.isRequired,
  keyboardType: T.string,
  secureTextEntry: T.bool
};

TgInput.defaultProps = {
  error: null,
  multiline: false,
  numberOfLines: 1,
  keyboardType: 'default',
  secureTextEntry: false
};
export default TgInput;
