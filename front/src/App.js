import { Route, Routes } from 'react-router-dom';
import PaperFeed from './pages/PaperFeed/PaperFeed';

function App() {
  return (
    <Routes>
      <Route index element={<PaperFeed />} />
    </Routes>
  );
}

export default App;
