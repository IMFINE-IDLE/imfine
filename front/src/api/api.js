// const URL = 'http://localhost:8080/api';
const URL = 'https://i8a809.p.ssafy.io/api';

const USERS = '/user';
const CHECK = '/check';
const DIARY = '/diary';
const PAPER = '/paper';
const COMMENT = '/comment';
const BAMBOO = '/bamboo';
const LEAF = '/leaf';
const REPORT = '/report';
const NOTIFICATION = '/notification';
const SYMPTOM = '/symptom';
const MEDICAL = '/medical';
const SEARCH = '/search';

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
    setInitialProfile: () => URL + USERS + '/profile',
    findUserId: (email) => URL + USERS + `/find-id/${email}`,
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
    getPaperModifyInfo: (paperId) => URL + PAPER + `/modify/${paperId}`,
    putPaper: () => URL + PAPER,
  },
  comment: {
    commentCreate: () => URL + COMMENT,
    commentDelete: (commentId) => URL + COMMENT + `/${commentId}`,
    commentLike: () => URL + COMMENT + '/like',
    commentLikeDelete: (commentId) => URL + COMMENT + `/like/${commentId}`,
  },
  search: {
    search: (params, query) =>
      URL + SEARCH + `/result?where=${params}&query=${query}`,
    postSearchHistory: () => URL + SEARCH,
    getSearchHistory: () => URL + SEARCH + '/mylist',
    deleteSearchHistory: (keywordId) => URL + SEARCH + `/mylist/${keywordId}`,
  },
  profile: {
    getUserInfo: (uid) => URL + USERS + `/${uid}`,
    getFollowingList: (uid) => URL + USERS + `/${uid}/following`,
    getFollowerList: (uid) => URL + USERS + `/${uid}/follower`,
    follow: () => URL + USERS + '/follow',
    unfollow: (uid) => URL + USERS + `/follow/${uid}`,
    deleteFollower: (uid) => URL + USERS + `/follow/block/${uid}`,
    getMonthCondition: (params) =>
      URL + USERS + `/${params.uid}/condition/month/${params.date}`,
    getUserPaperItem: (params) =>
      URL + USERS + `/${params.uid}/paper/${params.date}`,
  },
  bamboo: {
    postBamboo: () => URL + BAMBOO,
    getDetailBamboo: (params) => URL + BAMBOO + `/detail/${params}`,
    getBambooFeed: (filter) => URL + BAMBOO + `/list?filter=${filter}`,
    getMyBambooFeed: (filter) => URL + BAMBOO + `/myactive?filter=${filter}`,
    getUserBambooFeed: (filter) => URL + BAMBOO + `/myactive?filter=${filter}`,
    postBambooLike: () => URL + BAMBOO + '/like',
    deleteBambooLike: (bambooId) => URL + BAMBOO + `/like/${bambooId}`,
  },
  leaf: {
    postLeaf: () => URL + LEAF,
    postLeafLike: () => URL + LEAF + '/like',
    deletLeafLike: (leafId) => URL + LEAF + `/like/${leafId}`,
  },
  diary: {
    postDiary: () => URL + DIARY,
    getDiaryList: () => URL + DIARY + '/list',
    getDiaryInfo: (diaryId) => URL + DIARY + `/${diaryId}`,
    setDiarySubscribe: () => URL + DIARY + '/subscribe',
    deleteDiarySubscribe: (diaryId) => URL + DIARY + `/${diaryId}/subscribe`,
    getDiaries: () => URL + DIARY + '/list/paper-post',
    getDiaryPaperItem: (params) =>
      URL + DIARY + `/${params.diaryId}/paper/${params.date}`,
    getUserDiaryList: (uid) => URL + DIARY + `/my-write/${uid}`,
    getUserSubscribeDiaryList: (uid) => URL + DIARY + `/subscribe/${uid}`,
    postNewDiarySymptom: () => URL + DIARY + '/symptom',
    deleteDiarySymptom: (id) => URL + DIARY + `/symptom/${id}`,
  },
  symptom: {
    getSymptomList: () => URL + SYMPTOM + '/list',
    getSymptomDetail: (symptomId) => URL + SYMPTOM + `/${symptomId}`,
  },
  medical: {
    getMedicalList: () => URL + MEDICAL + '/list',
    getMedicalDetail: (medicalId) => URL + MEDICAL + `/${medicalId}`,
  },
  notifications: {
    getEvent: () => URL + NOTIFICATION + '/subscribe',
    getNotifications: () => URL + NOTIFICATION + '/list',
    readNotification: () => URL + NOTIFICATION + '/check',
  },
  report: {
    reportBamboo: () => URL + REPORT + BAMBOO,
    reportLeaf: () => URL + REPORT + LEAF,
    reportDiary: () => URL + REPORT + DIARY,
    reportPaper: () => URL + REPORT + PAPER,
    reportComment: () => URL + REPORT + COMMENT,
  },
};

export default api;
