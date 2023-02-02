const URL = 'http://localhost:8080';
// const URL = 'http://i8A809.p.ssafy.io:8080';

const USERS = '/user';
const PAPER = '/paper';

const api = {
  user: {
    signUp: () => URL + USERS + '/sign-up',
    checkId: (params) => URL + USERS + `/check/uid/${params}`,
    checkName: (params) => URL + USERS + `/check/name/${params}`,
    checkEmail: (params) => URL + USERS + `/check/email/${params}`,
    login: () => URL + USERS + '/sign-in',
    setCondition: () => URL + USERS + '/condition',
  },
  paper: {
    paperFeed: () => URL + PAPER + '/list',
  },
  profile: {
    getUserInfo: (params) => URL + USERS + `/${params}`,
    getMonthCondition: (params) =>
      URL + USERS + `/${params.uid}/condition/month/${params.date}`,
  },
};

export default api;
