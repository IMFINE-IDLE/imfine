// const URL = 'http://localhost:8080';
const URL = 'http://i8A809.p.ssafy.io:8080';

const USERS = '/user';
const PAPER = '/paper';

const api = {
  user: {
    signUp: () => URL + USERS + '/sign-up',
  },
  paper: {
    paperFeed: () => URL + PAPER + '/list',
  },
};

export default api;
