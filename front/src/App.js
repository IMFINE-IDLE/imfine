import { Route, Routes } from 'react-router-dom';
// import styled from 'styled-components';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import PaperFeedPage from './pages/PaperFeedPage/PaperFeedPage';
import SearchPage from './pages/SearchPage/SearchPage';
import DiaryFeedPage from './pages/Diary/DiaryFeedPage/DiaryFeedPage';
import DiaryFilterPage from './pages/Diary/DiaryFilterPage/DiaryFilterPage';
import DiaryDetailPage from './pages/Diary/DiaryDetailPage/DiaryDetailPage';
import DiaryCreatePage from './pages/Diary/DiaryCreatePage/DiaryCreatePage';
import DiaryCreateConfirmPage from './pages/Diary/DiaryCreateConfirmPage/DiaryCreateConfirmPage';
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
import ProfileMedicals from './pages/Profile/ProfileMedicals/ProfileMedicals';
import ReportPage from './pages/Report/ReportPage/ReportPage';
import { PrivateRoute, PublicRoute } from './Route/Route';
import SignUpSettingPage from './pages/SignUpSettingPage/SignUpSettingPage';
import PaperModifyPage from './pages/PaperModifyPage/PaperModifyPage';
import FindIdPage from './pages/FindIdPage/FindIdPage';
import FindPwPage from './pages/FindPwPage/FindPwPage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateCode, logOutWithError } from './store/slice/userSlice';
import schedule from 'node-schedule';
import { refreshTokenAndResendRequest } from './utils/userUtils';

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
  const dispatch = useDispatch();

  const logoutwithErrorCallBack = () => {
    dispatch(
      logOutWithError({
        isLogin: false,
        uid: null,
        cloverCode: '-1',
      })
    );
    localStorage.setItem('accessToken', null);
  };

  // 토큰 갱신 및 기존 요청 재요청
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log(error.response);
      const { response: errorResponse } = error;
      const originalRequest = error.config;
      // 토큰 갱신
      if (errorResponse.data.error === 'EXPIRED_TOKEN') {
        return await refreshTokenAndResendRequest(
          error,
          logoutwithErrorCallBack
        );
      } else if (errorResponse.data.error.includes('TOKEN')) {
        // 기타 에러일경우 로그아웃 처리
        logoutwithErrorCallBack();
      }
      return Promise.reject(error);
    }
  );

  // 매일 자정에 클로버 컨디션 코드 -1로 초기화
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(0, 6)];
  rule.hour = 0;
  rule.minute = 0;
  rule.tz = 'Asia/Seoul';
  schedule.scheduleJob(rule, function () {
    dispatch(updateCode('-1'));
  });

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
        path="/find-id"
        element={
          <PublicRoute>
            <FindIdPage />
          </PublicRoute>
        }
      />
      <Route path="/find-password" element={<FindPwPage />} />
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
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <SettingsPage />
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
          path="filter"
          element={
            <PrivateRoute>
              <DiaryFilterPage />
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
        <Route path="create">
          <Route
            index
            element={
              <PrivateRoute>
                <DiaryCreatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="confirm"
            element={
              <PrivateRoute>
                <DiaryCreateConfirmPage />
              </PrivateRoute>
            }
          />
        </Route>
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
        <Route
          path="/paper/modify/:paperId"
          element={
            <PrivateRoute>
              <PaperModifyPage />
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
          path="medicals"
          element={
            <PrivateRoute>
              <ProfileMedicals />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path="/noti"
        element={
          <PrivateRoute>
            <NotificationPage />
          </PrivateRoute>
        }
      ></Route>
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
