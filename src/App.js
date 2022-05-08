import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Display from "./components/Display";
import './style/index.scss';

/**
 * @author traj3ctory
 * @function App
 **/

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="*" element={<Display />} />
        </Routes>
      </Layout>
    </Router>
  );
};
export default App;
