const URL = 'http://localhost:8080';
// const URL = 'http://i8A809.p.ssafy.io:8080';

const USERS = '/user';
const DIARY = '/diary';
const PAPER = '/paper';
const COMMENT = '/comment';
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
    logout: () => URL + USERS + '/sign-out',
    refresh: () => URL + USERS + '/refresh',
    setCondition: () => URL + USERS + '/condition',
    updateOpenStatus: () => URL + USERS + '/open',
  },
  paper: {
    paperFeed: () => URL + PAPER + '/list',
    paperDetail: (paperId) => URL + PAPER + `/${paperId}`,
    paperReport: (paperId) => URL + REPORT + PAPER + `/${paperId}`,
    paperLikePost: () => URL + PAPER + '/like',
    paperLikeDelete: (paperId) => URL + PAPER + `/${paperId}/like`,
  },
  comment: {
    commentCreate: () => URL + COMMENT,
    commentDelete: (commentId) => URL + COMMENT + `/${commentId}`,
    commentLike: () => URL + COMMENT + '/like',
    commentLikeDelete: (commentId) => URL + COMMENT + `/like/${commentId}`,
  },
  profile: {
    getUserInfo: (params) => URL + USERS + `/${params}`,
    getMonthCondition: (params) =>
      URL + USERS + `/${params.uid}/condition/month/${params.date}`,
  },
  bamboo: {
    postBamboo: () => URL + BAMBOO,
    getDetailBamboo: (params) => URL + BAMBOO + `/detail/${params}`,
    getBambooFeed: (filter) => URL + BAMBOO + `/list?filter=${filter}`,
    getMyBambooFeed: (filter) => URL + BAMBOO + `/myactive?filter=${filter}`,
    getUserBambooFeed: (filter) => URL + BAMBOO + `/myactive?filter=${filter}`,
    postBambooLike: () => URL + BAMBOO + '/like',
    deleteBambooLike: (bambooId) => URL + BAMBOO + `/like/${bambooId}`,
    reportBamboo: () => URL + REPORT + BAMBOO,
  },
  leaf: {
    postLeaf: () => URL + LEAF,
    postLeafLike: () => URL + LEAF + '/like',
    deletLeafLike: (leafId) => URL + LEAF + `/like/${leafId}`,
    reportLeaf: () => URL + REPORT + LEAF,
  },
  diary: {
    postDiary: () => URL + DIARY,
    getDiaryList: () => URL + DIARY + '/list',
    getDiaryInfo: (params) => URL + DIARY + `/${params}`,
    setDiarySubscribe: () => URL + DIARY + '/subscribe',
    deleteDiarySubscribe: (params) => URL + DIARY + `/${params}/subscribe`,
  },
};

export default api;
