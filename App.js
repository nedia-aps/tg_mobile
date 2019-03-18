import { Root } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';
import Router from './src/routes/Route';
import SpinnerOverlay from './src/components/common/SpinnerOverlay';
import BaseApi from './src/config/BaseApi';
import { colors } from './src/utils';
import { store } from './src/utils/CommonFunctions';

const { yellow } = colors;
const RobotoMedium = require('./src/media/fonts/Roboto-Medium.ttf');

export default class App extends React.Component {
  constructor() {
    super();
    this.initialiseApp();
    this.state = {
      isReady: false
    };
  }

  initialiseApp() {
    BaseApi.setDefaults('');
  }

  async loadFonts() {
    await Promise.all([
      // Asset.loadAsync([
      //   require('./src/media/images/mood_outline.png'),
      //   require('./src/media/images/logo.png')
      // ]),
      Font.loadAsync({
        Roboto_medium: RobotoMedium
      })
    ]);
  }

  render() {
    const { isReady } = this.state;
    if (!isReady) {
      return (
        <AppLoading
          startAsync={this.loadFonts}
          onFinish={() => this.setState({ isReady: true })}
        />
      );
    }
    return (
      <Provider store={store}>
        <Root>
          <View style={{ flex: 1 }}>
            <SpinnerOverlay
              cancelable
              loaderColor={yellow}
              sizeLoader="large"
            />
            <Router />
          </View>
        </Root>
      </Provider>
    );
  }
}
