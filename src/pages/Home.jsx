import React, { useCallback, useEffect, useState } from "react";
import UserList from "../components/UserList";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(false);
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  //   const [page, setPage] = useState(1);
  //   const [size, setSize] = useState(10);

  //   const fetchUsers = useCallback(async () => {
  //     const response = await fetch(
  //       `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${size}`
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     // setUsers((prevData) => {
  //     //   console.log("prev", prevData);
  //     //   return [...prevData, ...data.list];
  //     // });
  //   }, [page, size]);

  //   useEffect(() => {
  //     fetchUsers();
  //   }, [fetchUsers]);

  //   const fetchUsers = useCallback(() => {
  //     axios({
  //       method: "GET",
  //       url: `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${size}`,
  //     }).then((res) => setUsers((prevData) => [...prevData, ...res.data.list]));
  //   }, [page, size]);

  //   useEffect(() => {
  //     const controller = new AbortController();

  //     const { signal } = controller;

  //     const fetchUsers = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${size}`,
  //           { signal }
  //         );
  //         setUsers((prevData) => [...prevData, ...response.data.list]);
  //       } catch (error) {
  //         setLoading(false);
  //         if (signal.aborted) return;
  //         setIsError(true);
  //         setError({ message: error.message });
  //         // if (error.name === "AbortError") {
  //         //   console.log("Request aborted");
  //         // } else {
  //         //   console.log(error);
  //         // }
  //       }
  //       //   finally {
  //       //     setLoading(false);
  //       //   }
  //     };

  //     fetchUsers();

  //     return () => controller.abort();
  //   }, [page, size]);

  useEffect(() => {
    setLoading(true);
    setIsError(false);
    let cancel;
    axios({
      method: "GET",
      url: `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${size}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setUsers((prevData) => [...prevData, ...response.data.list]);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [page, size]);

  //   const onUserClick = (item) => {
  //     console.log(item);
  //     const newuse = [...visitedUser, item];
  //     setVisitedUser((prevValue) => [...prevValue, item]);

  //     console.log(visitedUser);

  //     localStorage.setItem("users", JSON.stringify(newuse));
  //   };

  //   console.log(visitedUser);
  //   console.log(users);

  return (
    <div className="home">
      <UserList
        users={users}
        // onUserClick={onUserClick}
        // visitedUser={visitedUser}
      />
    </div>
  );
};

export default Home;
