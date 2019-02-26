import { Permissions, Notifications, SecureStore } from 'expo';
import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ImageBackground } from 'react-native';
import { Input, Item, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import bg from '../media/images/bg.png';
import jslogo from '../media/images/logo.png';

import { CustomButton } from '../components/common';
import * as Account from '../actions/Acount';
import { colors } from '../utils';

const deviceWin = Dimensions.get('window');
const EmailRegex1 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// const stylesContainers = {
//   containerStyle: {
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     flexDirection: 'column',
//     flex: 1,
//     width: deviceWin.width * 1,
//     height: deviceWin.height * 1
//   }
// };

const stylesComponents = {
  inputText: {
    color: colors.whiteColor,
    fontSize: 18
  },
  errorText: {
    color: colors.red,
    textAlign: 'center'
  }
};
const isValidEmail = email => email.trim() !== '' && email.match(EmailRegex1);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: false,
      emailErrorMessage: '',
      passwordError: false,
      tokenValue: ''
    };
  }

  componentDidMount() {
    this.registerForPushNotifications()
      .then(token => {
        this.setState({ tokenValue: token });
        return true;
      })
      .catch(() => {
        // err
        // this.setState({ error: err.toString() });
      });
  }

  componetWillMount() {
    SecureStore.getItemAsync('userInfo')
      .then(response => {
        if (response) {
          Actions.HoldList({ type: 'reset' });
        }
        return true;
      })
      .catch(() => {});
  }

  setFieldValue() {
    // text
    // this.setState({ email: text });
  }

  async registerForPushNotifications() {
    let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (status !== 'granted') {
      return;
    }
    const result = await Notifications.getExpoPushTokenAsync();
    return result;
    // const token = await Notifications.getExpoPushTokenAsync();
    // this.setState({ tokenValue: token });
  }

  onEmailChange(value) {
    const { account } = this.props;
    account.formChanged({ prop: 'email', value });
  }

  onEmailChangeBlur() {
    const { email } = this.props;
    if (email.trim() === '') {
      this.setState({
        emailError: true,
        emailErrorMessage: 'Gyldig email er påkrævet'
      });
    } else if (!isValidEmail(email.trim())) {
      this.setState({
        emailError: true,
        emailErrorMessage: 'Gyldig email er påkrævet'
      });
    } else {
      this.setState({ emailError: false });
    }
  }

  onPasswordChange(value) {
    const { account } = this.props;
    account.formChanged({ prop: 'password', value });
  }

  onPasswordChangeBlur() {
    const { password } = this.props;
    if (password === '') {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }
  }

  login() {
    const { email, password, account } = this.props;
    const { tokenValue } = this.state;
    let error = false;
    if (email.trim() === '') {
      this.setState({
        emailError: true,
        emailErrorMessage: 'Gyldig email er påkrævet'
      });
      error = true;
    } else if (!isValidEmail(email.trim())) {
      this.setState({
        emailError: true,
        emailErrorMessage: 'Gyldig email er påkrævet'
      });
      error = true;
    } else {
      this.setState({ emailError: false, emailErrorMessage: '' });
    }
    if (password.trim() === '') {
      this.setState({ passwordError: true });
      error = true;
    } else {
      this.setState({ passwordError: false });
    }
    if (error) {
      return false;
    }
    account.login({
      email,
      password,
      token: tokenValue === '' || !tokenValue ? 'no token' : tokenValue
    });
    return true;
  }

  render() {
    // const { containerStyle } = stylesContainers;
    const { inputText, errorText } = stylesComponents;
    const { emailError, emailErrorMessage, passwordError } = this.state;
    const { email, password, error } = this.props;
    return (
      <ImageBackground
        source={bg}
        style={{
          flex: 1,
          width: deviceWin.width * 1
        }}
      >
        <View
          style={{
            height: deviceWin.height * 0.3,
            width: deviceWin.width,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image
            source={jslogo}
            style={{
              height: deviceWin.height * 0.345,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: deviceWin.height * 0.11
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: deviceWin.height * 0.1
          }}
        >
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
              paddingVertical: deviceWin.height * 0.01
            }}
          >
            <Item
              style={{
                width: deviceWin.width * 0.9,
                borderBottomColor: colors.whiteColor
              }}
            >
              <Icon
                active
                name="md-person"
                style={{ color: 'white', fontSize: 30 }}
              />
              <Input
                placeholder="E-mail"
                style={inputText}
                value={email}
                onChangeText={text => this.onEmailChange(text)}
                onBlur={() => this.onEmailChangeBlur()}
              />
            </Item>
            {emailError ? (
              <View style={{ width: deviceWin.width * 0.9 }}>
                <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                  {emailErrorMessage}
                </Text>
              </View>
            ) : null}

            <Item
              style={{
                width: deviceWin.width * 0.9,
                borderBottomColor: colors.whiteColor
              }}
            >
              <Icon
                active
                name="md-unlock"
                style={{ color: 'white', fontSize: 30 }}
              />
              <Input
                secureTextEntry
                placeholder="Kode"
                style={inputText}
                value={password}
                onChangeText={text => this.onPasswordChange(text)}
                onBlur={() => this.onPasswordChangeBlur()}
              />
            </Item>
            {passwordError ? (
              <View style={{ width: deviceWin.width * 0.9 }}>
                <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                  Kodeord er påkrævet
                </Text>
              </View>
            ) : null}
            <CustomButton labelText="Login" onTouch={() => this.login()} />
          </View>
        </View>
        <View>
          <Text style={errorText}>{error}</Text>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ accountReducer }) => {
  const { email, password, error } = accountReducer;
  return { email, password, error };
};

const mapDispatchToProps = dispatch => ({
  account: bindActionCreators(Account, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
