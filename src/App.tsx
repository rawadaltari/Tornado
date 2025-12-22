import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "./compon/Loader";
import TornadoMenu from "./pages/TornadoMenu";
import Tornado from "./pages/Tornado";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  // التحقق من المسار عند تحميل المكون
  useEffect(() => {
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }, []);

  if (showLoader) {
    return <Loader onLoadComplete={handleLoaderComplete} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tornado />} />
        <Route path="/menu" element={<TornadoMenu />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;