import { Route, Routes } from 'react-router-dom';
import DiaryCreate from './pages/DiaryCreate/DiaryCreate';
import PaperCreate from './pages/PaperCreate/PaperCreate';
import PaperFeed from './pages/PaperFeed/PaperFeed';
import BambooPage from './pages/BambooPage/BambooPage';
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
      <Route path="/bamboo" element={<BambooPage />}></Route>
    </Routes>
  );
}

export default App;
