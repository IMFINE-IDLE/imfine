import { Route, Routes } from 'react-router-dom';
// import styled from 'styled-components';
import LoginPage from './pages/LoginPage/LoginPage';
import LogOutPage from './pages/LogOutPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
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
import NotificationPage from './pages/NotificationPage/NotificationPage';
import ProfilePage from './pages/Profile/ProfilePage/ProfilePage';
import ProfileFollowsPage from './pages/Profile/ProfileFollowsPage/ProfileFollowsPage';
import ProfileConfigPage from './pages/Profile/ProfileConfigPage/ProfileConfigPage';
import ChangeName from './pages/Profile/ChangeName/ChangeName';
import ChangeSymptom from './pages/Profile/ChangeSymptom/ChangeSymptom';
import ReportPage from './pages/Report/ReportPage/ReportPage';
import { PrivateRoute, PublicRoute } from './Route/Route';
import SignUpSettingPage from './pages/SignUpSettingPage/SignUpSettingPage';
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
        path="/logout"
        element={
          <PrivateRoute>
            <LogOutPage />
          </PrivateRoute>
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
        path="/signup/setting"
        element={
          <PrivateRoute>
            <SignUpSettingPage />
          </PrivateRoute>
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
      <Route
        path="/search"
        element={
          <PrivateRoute>
            <SearchPage />
          </PrivateRoute>
        }
      />
      <Route path="/diary">
        <Route
          index
          element={
            <PrivateRoute>
              <DiaryFeedPage />
            </PrivateRoute>
          }
        />
        <Route
          path=":diaryId"
          element={
            <PrivateRoute>
              <DiaryDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="create"
          element={
            <PrivateRoute>
              <DiaryCreatePage />
            </PrivateRoute>
          }
        />
        <Route path=":diaryId/modify">
          <Route
            index
            element={
              <PrivateRoute>
                <DiaryModifyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="symptom"
            element={
              <PrivateRoute>
                <DiaryAddSymptomPage />
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
        <Route
          path="/paper/symptom"
          element={
            <PrivateRoute>
              <PaperSymptomPage />
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
      <Route path="/profile/:uid">
        <Route
          index
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
              <ProfileConfigPage />
            </PrivateRoute>
          }
        />
        <Route
          path="change-name"
          element={
            <PrivateRoute>
              <ChangeName />
            </PrivateRoute>
          }
        />
        <Route
          path="change-symptom"
          element={
            <PrivateRoute>
              <ChangeSymptom />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="/noti" element={ <PrivateRoute><NotificationPage /></PrivateRoute>}></Route>
      <Route
        path="/report"
        element={
          <PrivateRoute>
            <ReportPage />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
    // </Wrapper>
  );
}

export default App;
