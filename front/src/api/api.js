const URL = 'http://i8A809.p.ssafy.io:8080';

const USERS = '/user';

const api = {
  user: {
    signUp: () => URL + USERS + '/sign-up',
  },
};

export default api;
