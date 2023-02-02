import { Route, Routes } from 'react-router-dom';
// import styled from 'styled-components';
import DiaryCreate from './pages/DiaryCreate/DiaryCreate';
import LoginPage from './pages/LoginPage/LoginPage';
import PaperCreate from './pages/PaperCreate/PaperCreate';
import BambooCreatePage from './pages/BambooCreatePage/BambooCreatePage';
import PaperFeedPage from './pages/PaperFeedPage/PaperFeedPage';
import BambooFeedPage from './pages/BambooFeedPage/BambooFeedPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import BambooDetailPage from './pages/BambooDetailPage/BambooDetailPage';
import ProfileContent from './components/Profile/ProfileContent/ProfileContent';
import ProfileFollows from './components/Profile/ProfileFollows/ProfileFollows';
import ProfileConfigPage from './pages/ProfileConfigPage/ProfileConfigPage';
import ChangeName from './pages/ChangeName/ChangeName';
import ChangeSymptom from './pages/ChangeSymptom/ChangeSymptom';
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
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<PaperFeedPage />} />
      <Route path="/diary">
        <Route path="/diary/create" element={<DiaryCreate />} />
      </Route>
      <Route path="/paper">
        <Route path="/paper/create" element={<PaperCreate />} />
      </Route>
      <Route path="/bamboo" element={<BambooFeedPage />}></Route>
      <Route path="/bamboo/create" element={<BambooCreatePage />}></Route>
      <Route path="/bamboo/:bambooId" element={<BambooDetailPage />}></Route>
      <Route path="/profile/:name" element={<ProfilePage />}>
        <Route index element={<ProfileContent />} />
        <Route path="follows" element={<ProfileFollows />} />
      </Route>
      <Route path="/profile-config" element={<ProfileConfigPage />} />
      <Route path="/change-name" element={<ChangeName />} />
      <Route path="/change-symptom" element={<ChangeSymptom />} />
    </Routes>
    // </Wrapper>
  );
}

export default App;
