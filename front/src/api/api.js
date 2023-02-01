// const URL = 'http://localhost:8080';
const URL = 'http://i8A809.p.ssafy.io:8080';

const USERS = '/user';
const PAPER = '/paper';

const api = {
  user: {
    signUp: () => URL + USERS + '/sign-up',
    checkId: (params) => URL + USERS + `/check/uid/${params}`,
    checkName: (params) => URL + USERS + `/check/name/${params}`,
    // checkEmail: () => URL + USERS + '/check/uid',
  },
  paper: {
    paperFeed: () => URL + PAPER + '/list',
  },
};

export default api;
