import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskBoard from './components/TaskBoard';
import Main from './components/Main';

function App() {
  return (
    <Routes>
      {/* Rota de Login */}
      <Route path="/" element={<LoginPage />} />

      {/* Rota principal do app após login */}
      <Route
        path="/app"
        element={
          <div className="flex bg-slate-900 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <Main />
            </div>
          </div>
        }
      />
    </Routes >
  );
}

export default App;
