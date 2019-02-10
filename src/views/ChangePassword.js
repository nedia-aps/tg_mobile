import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  Content,
  Container,
  Input,
  Item,
  Icon,
  Label,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import bg from '../media/images/bg.png';
import { BottomFooter } from '../components/common';
import * as Account from '../actions/Acount';
import { colors } from '../utils';

const deviceWin = Dimensions.get('window');

const stylesContainers = {
  containerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    width: deviceWin.width * 1,
    height: deviceWin.height * 1,
  },
};

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      oldPwError: false,
      newPwError: false,
      confPwError: false,
      error: false,
    };
  }
  onchangedPassword() {
    let error = false;
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const { account } = this.props;
    if (oldPassword === '') {
      this.setState({
        oldPwError: true,
      });
      account.oldPasswordError('Indtast nyt kodeord');
      error = true;
    } else {
      this.setState({ oldPwError: false });
    }
    if (newPassword === '') {
      this.setState({ newPwError: true });
      error = true;
    } else {
      this.setState({ newPwError: false });
    }
    if (newPassword !== '' && confirmPassword === '') {
      this.setState({ confPwError: true });
      error = true;
    } else if (newPassword !== confirmPassword) {
      this.setState({ confPwError: true });
      error = true;
    } else {
      this.setState({ confPwError: false });
    }
    if (!error) {
      return false;
    }
    account.changePassword({
      TeacherId: this.state.userId,
      oldPassword,
      newPassword,
    });
    return true;
  }
  onNewPasswordChangeBlur() {
    const { newPassword } = this.state;
    if (newPassword === '') {
      this.setState({ newPwError: true });
    } else {
      this.setState({ newPwError: false });
    }
  }
  onConfirmPasswordChangeBlur() {
    const { newPassword, confirmPassword } = this.state;
    if (newPassword !== '' && confirmPassword === '') {
      this.setState({ confPwError: true });
    } else if (newPassword !== confirmPassword) {
      this.setState({ confPwError: true });
    } else {
      this.setState({ confPwError: false });
    }
  }
  onOldPasswordChangeBlur() {
    const { oldPassword } = this.state;
    const { account } = this.props;
    if (oldPassword === '') {
      account.formChanged({
        prop: 'errorMessage',
        value: 'Indtast gammelt kodeord',
      });
      this.setState({
        oldPwError: true,
      });
    } else {
      this.setState({ oldPwError: false });
    }
  }
  changedPassword() {
    const { oldPassword, newPassword } = this.state;
    const { account } = this.props;
    account.formChanged({
      prop: 'errorMessage',
      value: '',
    });
    this.setState({
      error: false,
    });
  }

  render() {
    const { containerStyle } = stylesContainers;
    return (
      <ImageBackground
        source={bg}
        style={{
          flex: 1,
          width: deviceWin.width * 1,
        }}
      >

          <Content>
            <View
              style={{
                width: deviceWin.width * 1,
                flexDirection: 'column',
                marginTop: 18,
              }}
            >
              <View
                style={{
                  width: deviceWin.width * 1,
                  backgroundColor: '#426f77',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  onPress={() => Actions.HoldList({ type: 'reset' })}
                  style={{flex: 1}}
                >
                  <Icon
                    style={{ 
                      color: 'white', 
                      paddingHorizontal: 10, 
                      paddingVertical: 18,
                    }}
                    name="ios-arrow-back"
                  />
                </TouchableOpacity>
                <View style={{ backgroundColor: '#426f77', flex: 5 }}>
                  <Text
                    style={{
                      fontSize: 32,
                      color: colors.whiteColor,
                      textAlign: 'center',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                  Skift kodeord
                  </Text>
                </View>
                <View style={{flex: 1}}></View>
              </View>
            </View>
            <View
              style={{
                width: deviceWin.width * 0.9,
                padding: 10,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginLeft: 10,
                }}
              >
                <Item floatingLabel style={{ marginBottom: 15 }}>
                  <Label style={{ color: colors.whiteColor }}>
                  Gammel kode
                  </Label>
                  <Input
                    secureTextEntry
                    onChangeText={text => this.setState({ oldPassword: text })}
                    value={this.state.oldPassword}
                    onBlur={() => this.onOldPasswordChangeBlur()}
                  />
                </Item>
              </View>
            </View>
            {this.state.oldPwError || this.state.error ? (
              <View style={{ paddingLeft: 20 }}>
                <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                  {this.props.errorMessage}
                </Text>
              </View>
            ) : null}
            <View
              style={{
                width: deviceWin.width * 0.9,
                padding: 10,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginLeft: 10,
                }}
              >
                <Item floatingLabel style={{ marginBottom: 15 }}>
                  <Label style={{ color: colors.whiteColor }}>
                  Ny kode
                  </Label>
                  <Input
                    secureTextEntry
                    onChangeText={text => this.setState({ newPassword: text })}
                    value={this.state.newPassword}
                    onBlur={() => this.onNewPasswordChangeBlur()}
                  />
                </Item>
              </View>
            </View>
            {this.state.newPwError ? (
              <View style={{ paddingLeft: 20 }}>
                <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                ndtast nyt kodeord
                </Text>
              </View>
            ) : null}
            <View
              style={{
                width: deviceWin.width * 0.9,
                padding: 10,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginLeft: 10,
                }}
              >
                <Item floatingLabel>
                  <Label style={{ color: colors.whiteColor }}>
                  Gentag ny kode
                  </Label>
                  <Input
                    secureTextEntry
                    onChangeText={text =>
                      this.setState({ confirmPassword: text })
                    }
                    value={this.state.confirmPassword}
                    onBlur={() => this.onConfirmPasswordChangeBlur()}
                  />
                </Item>
              </View>
            </View>
            {this.state.confPwError ? (
              <View style={{ paddingLeft: 20, marginBottom: 10 }}>
                <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                Kodeord er ikke ens
                </Text>
              </View>
            ) : null}
            <View
              style={{
                backgroundColor: '#426f77',
                borderRadius: 2,
                padding: 15,
                marginLeft: 20,
                marginRight: 25,
                marginTop: 50,
              }}
            >
              <TouchableOpacity
                onPress={() => this.onchangedPassword()}
              >
                <Text
                  style={{ alignSelf: 'center', color: 'white', fontSize: 16 }}
                >
                Gem
                </Text>
              </TouchableOpacity>
            </View>
          </Content>
          <BottomFooter Id="3" />

      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ accountReducer }) => {
  const { errorMessage } = accountReducer;
  return { errorMessage };
};

const mapDispatchToProps = dispatch => ({
  account: bindActionCreators(Account, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
