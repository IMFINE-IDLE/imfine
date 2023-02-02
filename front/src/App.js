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
import PaperDetailPage from './pages/PaperDetailPage/PaperDetailPage';
import ProfileConfigPage from './pages/ProfileConfigPage/ProfileConfigPage';
import ChangeName from './pages/ChangeName/ChangeName';
import ChangeSymptom from './pages/ChangeSymptom/ChangeSymptom';
import { PrivateRoute, PublicRoute } from './Route/Route';
import instance from './api/instance';
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

instance.defaults.headers.common['X-AUTH-TOKEN'] =
  localStorage.getItem('accessToken');

function App() {
  return (
    // <Wrapper>
    <Routes>
      <Route
        index
        element={
          <PrivateRoute>
            <PaperFeedPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <PaperFeedPage />
          </PrivateRoute>
        }
      />
      <Route path="/diary">
        <Route
          path="/diary/create"
          element={
            <PrivateRoute>
              <DiaryCreate />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="/paper">
        <Route
          path="/paper/create"
          element={
            <PrivateRoute>
              <PaperCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/paper/:paperId"
          element={
            <PrivateRoute>
              <PaperDetailPage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path="/bamboo"
        element={
          <PrivateRoute>
            <BambooFeedPage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/bamboo/create"
        element={
          <PrivateRoute>
            <BambooCreatePage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/bamboo/:bambooId"
        element={
          <PrivateRoute>
            <BambooDetailPage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/profile/:name"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <PrivateRoute>
              <ProfileContent />
            </PrivateRoute>
          }
        />
        <Route
          path="follows"
          element={
            <PrivateRoute>
              <ProfileFollows />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="/profile-config" element={<ProfileConfigPage />} />
      <Route path="/change-name" element={<ChangeName />} />
      <Route path="/change-symptom" element={<ChangeSymptom />} />
    </Routes>
    // </Wrapper>
  );
}

export default App;
