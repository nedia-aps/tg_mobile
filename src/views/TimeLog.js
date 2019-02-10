import Expo from 'expo';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  Content,
  Container,
  Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AnimatedGaugeProgress } from 'react-native-simple-gauge';
import bg from '../media/images/bg.png';

import { CustomButton, BottomFooter } from '../components/common';
import * as Classes from '../actions/Classes';
import { colors } from '../utils';

const gauge = require('../media/images/gauge.png');

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
class TimeLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authId: '',
    };
    Expo.SecureStore.getItemAsync('userInfo').then((response) => {
      if (response !== null) {
        const user = JSON.parse(response);
        this.setState({ authId: user.authId });
        this.loadLog();
      }
    });
  }

  componentDidMount() {}
  loadLog() {
    const { seletedClass, action } = this.props;
    const { authId } = this.state;
    action.loadLog({ authId, classId: seletedClass.classId });
  }
  render() {
    const { containerStyle } = stylesContainers;
    const {  progressState, logged, seletedClass } = this.props;
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
                  style={{flex: 1}}
                  onPress={() => Actions.HoldList({ type: 'reset' })}
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
                <View style={{ backgroundColor: '#426f77', flex: 3 }}>
                  <Text
                    style={{
                      fontSize: 32,
                      color: colors.whiteColor,
                      textAlign: 'center',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                   {seletedClass.className}
                  </Text>
                </View>
                <View style={{flex: 1}}></View>
              </View>

              <View>
                <View />
                <View
                  style={{
                    width: deviceWin.width * 1,
                    height: deviceWin.height * 0.5,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      position: 'absolute',
                      transform: [{ translate: [0, 1] }],
                    }}
                  >
                    <AnimatedGaugeProgress
                      size={200}
                      width={30}
                      fill={progressState}
                      rotation={90}
                      cropDegree={90}
                      tintColor="#8b8b00"
                      backgroundColor="#b0c4de"
                      stroke={[5, 2]} // For a equaly dashed line
                      strokeCap="circle"
                    />
                  </View>
                  <Image
                    resizeMode="contain"
                    source={gauge}
                    style={{
                      height: 200,
                      width: 200,
                      position: 'absolute',
                    }}
                  />
                  <View style={{ position: 'absolute', margin: 100 }}>
                    <Text style={{ fontSize: 30, color: 'white' }}>
                      {logged.toFixed(2)}
                    </Text>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: 10, color: 'white' }}>
                        {' '}
                        Timer{' '}
                      </Text>
                    </View>
                  </View>
                </View>
                <CustomButton
                  labelText="Log timer"
                  onTouch={() => Actions.LogForm()}
                />
                <CustomButton
                  labelText="Ekstra træning"
                  onTouch={() => Actions.SpecialLogForm()}
                />
              </View>
            </View>
          </Content>
          <BottomFooter Id="2" />

      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ classesReducer }) => {
  const {
    seletedClass, totalHours, progressState, logged,
  } = classesReducer;
  return {
    seletedClass,
    totalHours,
    progressState,
    logged,
  };
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(Classes, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeLog);
