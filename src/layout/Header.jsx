import { Link } from "react-router-dom";

/**
 * @author traj3ctory
 * @function @Header
 **/

const Header = (props) => {
  return (
    <nav className="navbar navbar-light bg-light shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">TodoApp</Link>
      </div>
    </nav>
  );
};

export default Header;