export const Config = {
  ROOT_URL: 'http://api.tgiapp.dk.web125.curanetserver.dk/',
  REST_APIs: {
    Account: {
      Login: 'api/Account/TeacherLogin',
      ResetPassword: 'api/User/UpdatePassword',
      LogOff: 'api/Account/TeacherLogout'
    },
    Classes: {
      Get: 'api/Classes/GetTeacherClasses',
      AddLog: 'api/Classes/LogWeeklyClassTime',
      GetLog: 'api/Classes/GetLoggedAverage',
      GetLastLoggedTime: 'api/Classes/GetLastLoggedTime',
      CancelClass: 'api/Classes/CancelCLass',
      GetClassById: 'api/Classes/GetClassDataById'
    }
  }
};

export default Config;
