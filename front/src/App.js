import { Route, Routes } from 'react-router-dom';
import DiaryCreate from './pages/DiaryCreate/DiaryCreate';
import Login from './pages/Login/Login';
import PaperCreate from './pages/PaperCreate/PaperCreate';
import PaperFeed from './pages/PaperFeed/PaperFeed';

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/home" element={<PaperFeed />} />
      <Route path="/diary">
        <Route path="/diary/create" element={<DiaryCreate />} />
      </Route>
      <Route path="/paper">
        <Route path="/paper/create" element={<PaperCreate />} />
      </Route>
    </Routes>
  );
}

export default App;
