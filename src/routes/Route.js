import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  Login,
  HoldList,
  TimeLog,
  Splash,
  LogForm,
  ChangePassword,
  SpecialLogForm,
} from '../views';

class RouterComponent extends Component {
  render() {
    return (

      <Router hideNavBar>
        <Scene key="root">
          <Scene key="Login" component={Login} hideTabBar hideNavBar />
          <Scene key="HoldList" component={HoldList} hideTabBar hideNavBar />
          <Scene key="TimeLog" component={TimeLog} hideTabBar hideNavBar />
          <Scene key="LogForm" component={LogForm} hideTabBar hideNavBar />
          <Scene key="SpecialLogForm" component={SpecialLogForm} hideTabBar hideNavBar />
          <Scene key="Splash" component={Splash} hideTabBar hideNavBar initial />
          <Scene
            key="ChangePassword"
            component={ChangePassword}
            hideTabBar
            hideNavBar
          />
        </Scene>
      </Router>

    );
  }
}
export default connect(null, {})(RouterComponent);
