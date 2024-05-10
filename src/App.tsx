import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage favorites={[]} toggleFavorite={function (_gameId: string): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;