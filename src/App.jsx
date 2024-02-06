import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/Homepage";
import GenerateFormPage from "./components/GenerateFormPage";
import ViewFormPage from "./components/ViewFormPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="generateform" element={<GenerateFormPage />} />
          <Route path="viewform/:formId" element={<ViewFormPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
