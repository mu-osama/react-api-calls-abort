import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <p>
        <Link to="/users">Goto Users Page</Link>
      </p>
      <h3>This is home page</h3>
    </>
  );
}

export default Home;
