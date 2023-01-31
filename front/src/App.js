import { Route, Routes } from 'react-router-dom';
import DiaryCreate from './pages/DiaryCreate/DiaryCreate';
import PaperCreate from './pages/PaperCreate/PaperCreate';
import PaperFeed from './pages/PaperFeed/PaperFeed';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProfileContent from './components/ProfileContent/ProfileContent';
import ProfileFollows from './components/ProfileFollows/ProfileFollows';

function App() {
  return (
    <Routes>
      <Route index element={<PaperFeed />} />
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
  );
}

export default App;
