import { Route, Routes } from 'react-router-dom';
// import styled from 'styled-components';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import PaperFeedPage from './pages/PaperFeedPage/PaperFeedPage';
import SearchPage from './pages/SearchPage/SearchPage';
import DiaryFeedPage from './pages/Diary/DiaryFeedPage/DiaryFeedPage';
import DiaryDetailPage from './pages/Diary/DiaryDetailPage/DiaryDetailPage';
import DiaryCreatePage from './pages/Diary/DiaryCreatePage/DiaryCreatePage';
import DiaryModifyPage from './pages/Diary/DiaryModifyPage/DiaryModifyPage';
import DiaryAddSymptomPage from './pages/Diary/DiaryAddSymptomPage/DiaryAddSymptomPage';
import PaperCreatePage from './pages/PaperCreatePage/PaperCreatePage';
import PaperDetailPage from './pages/PaperDetailPage/PaperDetailPage';
import PaperSymptomPage from './pages/PaperSymptomPage/PaperSymptomPage';
import BambooFeedPage from './pages/BambooFeedPage/BambooFeedPage';
import BambooCreatePage from './pages/BambooCreatePage/BambooCreatePage';
import BambooDetailPage from './pages/BambooDetailPage/BambooDetailPage';
import ProfilePage from './pages/Profile/ProfilePage/ProfilePage';
import ProfileFollowsPage from './pages/Profile/ProfileFollowsPage/ProfileFollowsPage';
import ProfileConfigPage from './pages/Profile/ProfileConfigPage/ProfileConfigPage';
import ChangeName from './pages/Profile/ChangeName/ChangeName';
import ChangeSymptom from './pages/Profile/ChangeSymptom/ChangeSymptom';
import LogOutPage from './pages/LogOutPage';
// 뷰포트 사이즈 결정 필요
// const Wrapper = styled.div`
//   margin: 0 auto;
//   width: 100%;
//   max-width: 400px;
//   height: 100vh;
//   @media screen and (min-width: 400px) {
//     background: none;
//   }s
// `;

function App() {
  return (
    // <Wrapper>
    <Routes>
      <Route index element={<PaperFeedPage />} />
      {/* <Route index element={<Login />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogOutPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<PaperFeedPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/diary">
        <Route index element={<DiaryFeedPage />} />
        <Route path=":diaryId" element={<DiaryDetailPage />} />
        <Route path="create" element={<DiaryCreatePage />} />
        <Route path=":diaryId/modify">
          <Route index element={<DiaryModifyPage />} />
          <Route path="symptom" element={<DiaryAddSymptomPage />} />
        </Route>
      </Route>
      <Route path="/paper">
        <Route path="/paper/create" element={<PaperCreatePage />} />
        <Route path="/paper/:paperId" element={<PaperDetailPage />} />
        <Route path="/paper/symptom" element={<PaperSymptomPage />} />
      </Route>
      <Route path="/bamboo" element={<BambooFeedPage />}></Route>
      <Route path="/bamboo/create" element={<BambooCreatePage />}></Route>
      <Route path="/bamboo/:bambooId" element={<BambooDetailPage />}></Route>
      <Route path="/profile/:uid">
        <Route index element={<ProfilePage />} />
        <Route path="follows" element={<ProfileFollowsPage />} />
        <Route path="config" element={<ProfileConfigPage />} />
        <Route path="change-name" element={<ChangeName />} />
        <Route path="change-symptom" element={<ChangeSymptom />} />
      </Route>
    </Routes>
    // </Wrapper>
  );
}

export default App;
