import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create an instance of AbortController
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
          {
            signal: signal, // Pass the signal to axios request
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else if (err.name === "CanceledError") {
          console.log("Request canceled by AbortController");
        } else {
          setError(err);
        }
      }
    };

    fetchData();

    // Cleanup function to abort the request if the component unmounts
    return () => {
      controller.abort(); // Cancels the request
    };
  }, []);

  return (
    <>
      <p>
        <Link to="/">Goto Home Page</Link>
      </p>
      <h3>This is users page</h3>
      {isLoading && <p>Loading...</p>}
      {error && <div>Error: {error.message}</div>}
      {data && <div>Data: {JSON.stringify(data)}</div>}
    </>
  );
}

export default Users;
