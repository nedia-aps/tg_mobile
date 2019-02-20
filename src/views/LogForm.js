import Expo from 'expo';
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
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Modal from 'react-native-modal';
import * as Classes from '../actions/Classes';
import { colors } from '../utils';
import * as CommonFunctions from '../utils/CommonFunctions';
import bg from '../media/images/bg.png';
import { BottomFooter } from '../components/common';

LocaleConfig.locales['da'] = {
  monthNames: ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
  monthNamesShort: ['Jan.','Feb.','Mar.','Apr.','Maj.','Jun.','Jul.','Aug.','Sep.','Okt.','Nov.','Dec.'],
  dayNames: ['Sunday', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
  dayNamesShort: ['Sun.','Man.','Tir.','Ons.','Tor.','Fre.','Lør.']
};
 
LocaleConfig.defaultLocale = 'da';

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

class LogForm extends Component {
  constructor(props) {
    super(props);
    const dat = new Date();
    this.state = {
      DateError: false,
      HrsError: false,
      MinError: false,
      maleError: false,
      femaleError: false,
      authId: '',
      currentWeekLog: false,
      isDateTimePickerVisible: false,
      formatedate: null,
      isModalVisible: false,
    };
    Expo.SecureStore.getItemAsync('userInfo').then((response) => {
      if (response !== null) {
        const user = JSON.parse(response);
        this.setState({ authId: user.authId });
        const date = CommonFunctions.formateDate(dat);
        this.loadLastLog(date);
      }
    });
  }

  onHourChangeBlur() {
    const { Hrs } = this.props;
    if (Hrs > 20 || Hrs < 0) {
      this.setState({ HrsError: true });
    } else {
      this.setState({ HrsError: false });
    }
  }
  onMinChangeBlur() {
    const { Mins } = this.props;
    if (Mins > 59 || Mins < 0) {
      this.setState({ MinError: true });
    } else {
      this.setState({ MinError: false });
    }
  }
  onMaleChangeBlur() {
    const { Male } = this.props;
    if (Male < 0 || Male > 10000) {
      this.setState({ maleError: true });
    } else {
      this.setState({ maleError: false });
    }
  }
  onFemaleChangeBlur() {
    const { Female } = this.props;
    if (Female < 0 || Female > 10000) {
      this.setState({ femaleError: true });
    } else {
      this.setState({ femaleError: false });
    }
  }
  onHrsValueChange(text) {
    const { action } = this.props;
    action.logFormChanged({ prop: 'Hrs', value: text });
  }
  onMintsValueChange(text) {
    const { action } = this.props;
    action.logFormChanged({ prop: 'Mins', value: text });
  }
  onMaleValueChange(text) {
    const { action } = this.props;
    action.logFormChanged({ prop: 'Male', value: text });
  }
  onFemaleValueChange(text) {
    const { action } = this.props;
    action.logFormChanged({ prop: 'Female', value: text });
  }
  save() {
    let error = false;
    const {
      Hrs, Mins, Male, Female, LoggedDate,
    } = this.props;
    if (LoggedDate) {
      this.setState({ DateError: false });
    } else {
      this.setState({ DateError: true });
      error = true;
    }
    if (Hrs < 0 || Hrs > 20) {
      this.setState({ HrsError: true });
      error = true;
    } else {
      this.setState({ HrsError: false });
    }
    if (Mins <0 || Mins > 59) {
      this.setState({ MinError: true });
      error = true;
    } else {
      this.setState({ MinError: false });
    }
    if (Male < 0 || Male > 10000) {
      this.setState({ maleError: true });
      error = true;
    } else {
      this.setState({ maleError: false });
    }
    if (Female < 0 || Female > 10000) {
      this.setState({ femaleError: true });
      error = true;
    }
    else {
      this.setState({ femaleError: false });
    }
    if (error) {
      return false;
    }
    this.saveLog();
    return true;
  }
  cancelClass() {
    let error = false;

    const {
      LoggedDate,
      action,
      seletedClass,
    } = this.props;
    if (LoggedDate) {
      this.setState({ DateError: false });
    } else {
      this.setState({ DateError: true });
      error = true;
    }
    if (error) {
      return false;
    }
    action.cancelClass({
      ClassId: seletedClass.classId,
      ClassCancelDate: LoggedDate,
      CancelDate: new Date(),

    });
    return true;
  }
  saveLog() {
    const { authId } = this.state;
    const {
      Hrs, Mins, Male, Female, seletedClass, action, LoggedDate,
    } = this.props;
    const hours = Hrs * 60;
    const tHours = hours + Number.parseInt(Mins, 10);
    const Quantity = Number.parseInt(Male, 10) + Number.parseInt(Female, 10);
    action.saveLog({
      TeacherAId: authId,
      Quantity,
      Time: tHours * Quantity,
      ClassesId: seletedClass.classId,
      LogDateTime: LoggedDate,
      Hours: hours,
      Minutes: Number.parseInt(Mins, 10),
      Male,
      FeMale: Female,
      Logtype: 2,
    });
  }
  loadLastLog(dat) {
    const { seletedClass, action } = this.props;
    const { authId } = this.state;
    // debugger;
    action.loadLastLogged({
      authId,
      classId: seletedClass.classId,
      date: dat,
    });
  }
  _toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }
  validateDate = (data, dateValue) => {
    const result = data.filter(x => x.date === dateValue);
    if (result.length > 0) {
      return true;
    } return false;
  };
  setData() {
    const { loggedDatesData, startDate } = this.props;
    if (loggedDatesData) {
      const from = new Date(startDate);
      const to = new Date();
      const objs = {};
      for (let day = from; day <= to; day.setDate(day.getDate() + 1)) {
        const year = day.getFullYear();
        const month = (1 + day.getMonth());
        const m = month > 9 ? month : `0${month}`;
        const currentDay = day.getDate();
        const d = parseInt(currentDay, 10) > 9 ? currentDay : `0${currentDay}`;
        const dateValue = `${year}-${m}-${d}`;
        if (!this.validateDate(loggedDatesData, dateValue)) {
          objs[dateValue] = { disabled: true, disableTouchEvent: true };
        }
      }
      return objs;
    }
    return null;
  }
  render() {
    const { containerStyle } = stylesContainers;
    const {
      Hrs, Mins, Male, Female, LoggedForCurrentWeek, startDate, loggedDatesData, LoggedDate, seletedClass
    } = this.props;
    return (
      <ImageBackground
        source={bg}
        style={{
          flex: 1,
          width: deviceWin.width * 1,
        }}
      >
        <Modal isVisible={this.state.isModalVisible}>

          <Calendar
            minDate={startDate}
            maxDate={ loggedDatesData.length > 0 ? loggedDatesData ? new Date(loggedDatesData[loggedDatesData.length - 1].date) : new Date() : new Date()}
            onDayPress={(day) => {
                    const { action } = this.props;
                    action.logFormChanged({ prop: 'LoggedDate', value: day.dateString });
                    const newDate = day.dateString;
                  this.setState({ isModalVisible: !this.state.isModalVisible, formatedate: CommonFunctions.formateDate(newDate), DateError: false });
                  }}
            onMonthChange={(month) => {
                    console.log('month changed', month);
                    // this.setState({ isModalVisible: !this.state.isModalVisible });
                  }}
                  // markedDates={{'2018-05-08': {disabled: true,disableTouchEvent: true}}
            markedDates={
                          this.setData()

                 }
          />
          <TouchableOpacity onPress={() => this._toggleModal()}  
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginLeft:deviceWin.width*0.40,
              marginTop: 5,
              padding: 5,
            }}
          >
            <Text style={{ color: colors.whiteColor}}>Luk</Text>
          </TouchableOpacity>
        </Modal>


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
                    style={{ color: 'white', paddingHorizontal: 10, paddingVertical: 18 }}
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
                  {seletedClass.className}
                  </Text>
                </View>
                <View style={{flex:1}}></View>
              </View>
            </View>
            <View
              style={{
                width: deviceWin.width * 0.9,
                paddingTop: 20,
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

                <TouchableOpacity 
                  onPress={() => this._toggleModal()} 
                  style={{ 
                    borderBottomWidth: 1, 
                    borderBottomColor: 'blue',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}
                >
                  <Text>
                    {
                      LoggedDate ? CommonFunctions.formateDate(LoggedDate) :
                      'Vælg dato'
                    }

                  </Text>
                </TouchableOpacity>

              </View>

            </View>
            {this.state.DateError ? (
              <View style={{ paddingLeft: 20 }}>
                <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                Vælg dato
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
                <Item floatingLabel style={{ marginBottom: 10 }}>
                  <Label style={{ color: colors.whiteColor }}>Timer</Label>
                  <Input
                    onChangeText={text => this.onHrsValueChange(text)}
                    value={Hrs.toString()}
                    keyboardType="numeric"
                    maxLength={2}
                    onBlur={() => this.onHourChangeBlur()}
                  />
                </Item>
              </View>
              {this.state.HrsError ? (
                <View style={{ marginLeft: 10, alignSelf: 'flex-start', marginBottom: 10 }}>
                  <Text style={{ color: 'red', textAlign: 'left' }}>
                    Udfyld de givne felter
                  </Text>
                </View>
              ) : null}
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginLeft: 10,
                }}
              >
                <Item floatingLabel style={{ marginBottom: 10 }}>
                  <Label style={{ color: colors.whiteColor }}>minutter</Label>
                  <Input
                    onChangeText={text => this.onMintsValueChange(text)}
                    value={Mins.toString()}
                    keyboardType="numeric"
                    maxLength={2}
                    onBlur={() => this.onMinChangeBlur()}
                  />
                </Item>
              </View>
              {this.state.MinError ? (
                <View style={{ marginLeft: 10, alignSelf: 'flex-start', marginBottom: 10 }}>
                  <Text style={{ color: 'red', textAlign: 'left' }}>
                    Udfyld de givne felter
                  </Text>
                </View>
              ) : null}
            </View>
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
                  <Label style={{ color: colors.whiteColor }}>Drenge</Label>
                  <Input
                    onChangeText={text => this.onMaleValueChange(text)}
                    value={Male.toString()}
                    keyboardType="numeric"
                    maxLength={2}
                    onBlur={() => this.onMaleChangeBlur()}
                  />
                </Item>
              </View>
            </View>
            {this.state.maleError ? (
              <View style={{ paddingLeft: 20, marginBottom: 10 }}>
                <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                Angiv antallet af drenge
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
                  <Label style={{ color: colors.whiteColor }}>Piger</Label>
                  <Input
                    onChangeText={text => this.onFemaleValueChange(text)}
                    value={Female.toString()}
                    keyboardType="numeric"
                    maxLength={2}
                    onBlur={() => this.onFemaleChangeBlur()}
                  />
                </Item>
              </View>
            </View>
            {this.state.femaleError ? (
              <View style={{ paddingLeft: 20, marginBottom: 10 }}>
                <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                  Angiv antallet af piger
                </Text>
              </View>
            ) : null}
            <TouchableOpacity
              onPress={() => this.save()}
              disabled={LoggedForCurrentWeek}
              style={{
                marginLeft: 20,
                marginRight: 25,
                marginTop: 50,
              }}
            >
              <View
                style={{
                  backgroundColor: '#426f77',
                  borderRadius: 2,
                  padding: 15,
                }}
              >
                <Text
                  style={{ alignSelf: 'center', color: 'white', fontSize: 16 }}
                >
                  {loggedDatesData.length === 0 ? 'Allerede tilføjet' : 'Gem'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.cancelClass()}
              style={{
                marginLeft: 20,
                marginRight: 25,
                marginTop: 30,
              }}
            >
              <View
                style={{
                  backgroundColor: '#426f77',
                  borderRadius: 2,
                  padding: 15,
                }}
              >
                <Text
                  style={{ alignSelf: 'center', color: 'white', fontSize: 16 }}
                >
                  {'Aflyst denne gang'}
                </Text>
              </View>
            </TouchableOpacity>
          </Content>
          <BottomFooter Id="2" />
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ classesReducer }) => {
  const {
    seletedClass,
    Hrs,
    Mins,
    Male,
    Female,
    LoggedForCurrentWeek,
    LoggedDate,
    startDate,
    endDate,
    loggedDatesData,
  } = classesReducer;
  return {
    seletedClass,
    Hrs,
    Mins,
    Male,
    Female,
    LoggedForCurrentWeek,
    LoggedDate,
    startDate,
    endDate,
    loggedDatesData,
  };
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(Classes, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogForm);
