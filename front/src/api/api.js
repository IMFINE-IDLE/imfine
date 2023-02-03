// const URL = 'http://localhost:8080';
const URL = 'http://i8A809.p.ssafy.io:8080';

const USERS = '/user';
const PAPER = '/paper';
const BAMBOO = '/bamboo';
const LEAF = '/leaf';
const REPORT = '/report';

const api = {
  user: {
    signUp: () => URL + USERS + '/sign-up',
    checkId: (params) => URL + USERS + `/check/uid/${params}`,
    checkName: (params) => URL + USERS + `/check/name/${params}`,
    checkEmail: (params) => URL + USERS + `/check/email/${params}`,
    login: () => URL + USERS + '/sign-in',
    updateOpenStatus: () => URL + USERS + '/open',
  },
  paper: {
    paperFeed: () => URL + PAPER + '/list',
    paperDetail: (paperId) => URL + PAPER + paperId,
    paperReport: (paperId) => URL + REPORT + PAPER + paperId,
  },
  bamboo: {
    postBamboo: () => URL + BAMBOO,
    getDetailBamboo: (params) => URL + BAMBOO + `/detail/${params}`,
    getBambooFeed: (filter) => URL + BAMBOO + `/list?filter=${filter}`,
    getUserBambooFeed: (filter) => URL + BAMBOO + `/myactive?filter=${filter}`,
    postBambooLike: () => URL + BAMBOO + '/like',
    deleteBambooLike: (params) => URL + BAMBOO + `/like/${params}}`,
  },
  leaf: {
    postLeaf: () => URL + LEAF,
    postLeafLike: () => URL + LEAF + '/like',
    deletLeafLike: (params) => URL + LEAF + `/like/${params}`,
  },
};

export default api;
