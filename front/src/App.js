import { Route, Routes } from 'react-router-dom';
// import styled from 'styled-components';
import DiaryCreate from './pages/DiaryCreate/DiaryCreate';
import PaperCreate from './pages/PaperCreate/PaperCreate';
import PaperFeed from './pages/PaperFeed/PaperFeed';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

// 뷰포트 사이즈 결정 필요
// const Wrapper = styled.div`
//   margin: 0 auto;
//   width: 100%;
//   max-width: 400px;
//   height: 100vh;
//   @media screen and (min-width: 400px) {
//     background: none;
//   }
// `;
import ProfileContent from './components/ProfileContent/ProfileContent';
import ProfileFollows from './components/ProfileFollows/ProfileFollows';

function App() {
  return (
    // <Wrapper>
    <Routes>
      <Route index element={<PaperFeed />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<PaperFeed />} />
      <Route path="/diary">
        <Route path="/diary/create" element={<DiaryCreate />} />
      </Route>
      <Route path="/paper">
        <Route path="/paper/create" element={<PaperCreate />} />
      </Route>
      <Route path="/profile" element={<ProfilePage />}>
        {/* <Route index path=":user" element={<ProfileContent />} />
        <Route path=":user/follows" element={<ProfileFollows />} /> */}
        <Route index element={<ProfileContent />} />
        <Route path="follows" element={<ProfileFollows />} />
      </Route>
    </Routes>
    // </Wrapper>
  );
}

export default App;
