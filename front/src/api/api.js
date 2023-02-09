// const URL = 'http://localhost:8080/api';
const URL = 'http://i8a809.p.ssafy.io:8080/api';

const USERS = '/user';
const CHECK = '/check';
const DIARY = '/diary';
const PAPER = '/paper';
const COMMENT = '/comment';
const BAMBOO = '/bamboo';
const LEAF = '/leaf';
const REPORT = '/report';
const SYMPTOM = '/symptom';
const MEDICAL = '/medical';

const api = {
  user: {
    signUp: () => URL + USERS + '/sign-up',
    checkId: (params) => URL + USERS + CHECK + `/uid/${params}`,
    checkName: (params) => URL + USERS + CHECK + `/name/${params}`,
    checkEmail: (params) => URL + USERS + CHECK + `/email/${params}`,
    verifyEmail: () => URL + USERS + CHECK + '/email/send',
    confirmEmail: () => URL + USERS + CHECK + '/email/confirm',
    login: () => URL + USERS + '/sign-in',
    logout: () => URL + USERS + '/sign-out',
    refresh: () => URL + USERS + '/refresh',
    setCondition: () => URL + USERS + '/condition',
    updateOpenStatus: () => URL + USERS + '/open',
  },
  paper: {
    paperFeed: (page) => URL + PAPER + `/list?page=${page}&tab=date`,
    paperDetail: (paperId) => URL + PAPER + `/${paperId}`,
    paperReport: (paperId) => URL + REPORT + PAPER + `/${paperId}`,
    paperLikePost: () => URL + PAPER + '/like',
    paperLikeDelete: (paperId) => URL + PAPER + `/${paperId}/like`,
    paperWrite: () => URL + PAPER,
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
    getFollowingList: (params) => URL + USERS + `/${params}/following`,
    getFollowerList: (params) => URL + USERS + `/${params}/follower`,
    follow: () => URL + USERS + '/follow',
    unfollow: (params) => URL + USERS + `/follow/${params}`,
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
    getDiaries: () => URL + DIARY + '/list/paper-post',
    getUserDiaryList: (params) => URL + DIARY + `/my-write/${params}`,
    getUserSubscribeDiaryList: (params) => URL + DIARY + `/subscribe/${params}`,
  },
  symptom: {
    getSymptomList: () => URL + SYMPTOM + '/list',
    getSymptomDetail: (symptomId) => URL + SYMPTOM + symptomId,
  },
  medical: {
    getMedicalList: () => URL + MEDICAL + '/list',
    getMedicalDetail: (medicalId) => URL + MEDICAL + medicalId,
  },
};

export default api;
