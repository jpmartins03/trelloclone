import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

function App() {
  return (
    <Routes>
      {/* Rota de Login */}
      <Route path="/" element={<LoginPage />} />

      {/* Rota principal do app após login */}
      {/* <Route
        path="/app"
        element={
          <>
            <Header />
            <div className="content flex">
              <Sidebar />
              <Main />
            </div>
          </>
        }
      /> */}
    </Routes>
  );
}

export default App;
