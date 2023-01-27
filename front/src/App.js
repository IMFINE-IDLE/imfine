import { Route, Routes } from 'react-router-dom';
import DiaryCreate from './pages/DiaryCreate/DiaryCreate';
import PaperCreate from './pages/PaperCreate/PaperCreate';
import PaperFeed from './pages/PaperFeed/PaperFeed';
import Profile from './pages/Profile/Profile';

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
      <Route path="/profile" element={<Profile />}>
        {/* <Route path="calendar" />
        <Route path="diary" />
        <Route path="subscribe" /> */}
      </Route>
    </Routes>
  );
}

export default App;
