import { Spinner } from 'native-base';
import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Modal,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import jslogo from '../media/images/logo.png';
import bg from '../media/images/bg.png';

const deviceWin = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      Actions.Login({ type: 'reset' });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.splashTimer);
  }
  render() {
    const modalColor = 'rgba(0, 0, 0, 0.3)';
    const loader = 'transparent';
    return (
      <ImageBackground
        source={bg}
        style={{
          flex: 1,
          width: deviceWin.width * 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            paddingVertical: deviceWin.height * 0.15,
          }}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: deviceWin.height * 0.7,
              width: deviceWin.width * 1,
            }}
          >
            <Image
              source={jslogo}
              style={{
                height: deviceWin.height * 0.345,
                resizeMode: 'contain',
                alignSelf: 'center',
                marginTop: deviceWin.height * 0.11,
              }}
            />
            <View
              style={{
                padding: 10,
                width: deviceWin.width * 0.5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            <Modal
              supportedOrientations={['landscape', 'portrait']}
              transparent
              visible
              onRequestClose={() => this.close()}
            >
              <View style={[styles.container, { backgroundColor: modalColor }]}>
                <View style={styles.background}>
                  <Spinner color="white" />
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default connect(null)(Splash);
