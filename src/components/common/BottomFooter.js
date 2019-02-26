import { SecureStore } from 'expo';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

class BottomFooter extends Component {
  logout() {
    SecureStore.deleteItemAsync('userInfo');
    Actions.Login({ type: 'reset' });
  }

  showTimeLogView(value) {
    const { ClassessActions } = this.props;
    ClassessActions.setClassTeacherProp(value);
    Actions.TimeLog();
  }

  render() {
    const { Id } = this.props;

    return (
      <Footer>
        <FooterTab style={{ backgroundColor: 'grey' }}>
          <Button
            vertical
            onPress={() => this.logout()}
            style={{ backgroundColor: Id === '1' ? '#D3D3D3' : 'transparent' }}
          >
            <Icon name="md-log-out" style={{ color: 'black' }} />
            <Text>log ud</Text>
          </Button>
          <Button
            vertical
            style={{ backgroundColor: Id === '2' ? '#D3D3D3' : 'transparent' }}
            onPress={() => Actions.HoldList({ type: 'reset' })}
          >
            <Icon name="ios-people" style={{ color: 'black' }} />
            <Text>Hold</Text>
          </Button>
          <Button
            vertical
            style={{ backgroundColor: Id === '3' ? '#D3D3D3' : 'transparent' }}
            onPress={() => Actions.ChangePassword({ type: 'reset' })}
          >
            <Icon name="md-key" style={{ color: 'black' }} />
            <Text>skift adgangskode</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default BottomFooter;
