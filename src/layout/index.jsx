import Header from "./Header";
import Footer from "./Footer";

/**
 * @author traj3ctory
 * @function @Layout
 **/

const Layout = (props) => {
  return (
    <>
      <Header />
        <main className="mb-5 pb-5">
          {props.children}
        </main>
      <Footer />
    </>
  );
};

export default Layout;