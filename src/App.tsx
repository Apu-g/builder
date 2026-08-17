import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import Configure from './pages/Configure';
import Generate from './pages/Generate';
import Preview from './pages/Preview';
import Projects from './pages/Projects';

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: 72 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/configure/:templateId" element={<Configure />} />
            <Route path="/generate/:templateId" element={<Generate />} />
            <Route path="/preview/:projectId" element={<Preview />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
