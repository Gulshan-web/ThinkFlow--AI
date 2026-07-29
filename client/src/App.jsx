import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Mind Map Workspace */}
        <Route
          path="/workspace"
          element={<Workspace />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;