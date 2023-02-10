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
      <Route path="/logout" element={<LogOutPage />} />
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
      <Route path="/search" element={<SearchPage />} />
      <Route path="/diary">
        <Route index element={<DiaryFeedPage />} />
        <Route
          path=":diaryId" element={<DiaryDetailPage />} />
        <Route path="create"
          element={
            <PrivateRoute>
              <DiaryCreatePage />} />
        <Route path=":diaryId/modify">
          <Route index element={<DiaryModifyPage />} />
          <Route path="symptom" element={<DiaryAddSymptomPage />
            </PrivateRoute>
          }
        />
        </Route>
      </Route>
      <Route path="/paper">
        <Route
          path="/paper/create"
          element={
            <PrivateRoute>
              <PaperCreatePage />
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
        <Route path="/paper/symptom" element={<PaperSymptomPage />} />
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
        path="/profile/:uid">
        <Route index
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
       />
        <Route
          path="follows"
          element={
            <PrivateRoute>
              <ProfileFollowsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="config"
          element={
            <PrivateRoute>
              <ProfileConfigPage />} />
        <Route path="change-name" element={<ChangeName />} />
        <Route path="change-symptom" element={<ChangeSymptom />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
    // </Wrapper>
  );
}

export default App;
