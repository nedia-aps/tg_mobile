import { SecureStore } from 'expo';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';
import { Content, Icon, List, ListItem } from 'native-base';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import bg from '../media/images/grad-white.png';
import { BottomFooter } from '../components/common';
import * as Classes from '../actions/Classes';
import { colors } from '../utils';

const deviceWin = Dimensions.get('window');
const stylesContainers = {
  containerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    width: deviceWin.width * 1,
    height: deviceWin.height * 1
  }
};
class HoldList extends Component {
  componentWillMount() {
    SecureStore.getItemAsync('userInfo')
      .then(response => {
        if (response !== null) {
          const user = JSON.parse(response);
          const { action } = this.props;
          action.get({ userId: user.authId });
        }
        return true;
      })
      .catch(() => {});
  }

  logout() {
    SecureStore.deleteItemAsync('userInfo');
    Actions.Login({ type: 'reset' });
  }

  showTimeLogView(value) {
    const { action } = this.props;
    action.setClassTeacherProp(value);
    Actions.TimeLog();
  }

  render() {
    const { textStyle } = stylesContainers;
    const { classesList } = this.props;
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
            backgroundColor: '#426f77',
            justifyContent: 'center',
            paddingBottom: 10,
            paddingTop: 10,
            width: deviceWin.width * 1
          }}
        >
          <Text
            style={{
              fontSize: 32,
              alignSelf: 'center',
              color: colors.whiteColor
            }}
          >
            Hold
          </Text>
        </View>
        <Content>
          <View
            style={{
              width: deviceWin.width * 1,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <List
              style={{ backgroundColor: 'transparent' }}
              dataArray={classesList}
              renderRow={item => (
                <ListItem
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    marginLeft: 0,
                    paddingRight: 0,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <TouchableOpacity
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      backgroundColor: 'transparent',
                      width: deviceWin.width * 0.9,
                      alignItems: 'center'
                    }}
                    onPress={() => {
                      this.showTimeLogView(item);
                    }}
                  >
                    <Text style={textStyle}>{item.className}</Text>
                    <Icon
                      name="ios-arrow-forward"
                      style={{ color: '#426f77' }}
                    />
                  </TouchableOpacity>
                </ListItem>
              )}
            />
          </View>
        </Content>
        <BottomFooter Id="2" />
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ classesReducer }) => {
  const { classesList } = classesReducer;
  return { classesList };
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(Classes, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoldList);
