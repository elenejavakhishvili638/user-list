import React, { useEffect, useState } from "react";
import "./user.css";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import UserInfo from "../components/UserInfo";
import { useUserContext } from "../context/visited";

const User = () => {
  const [user, setUser] = useState();

  const { visitedUser } = useUserContext();

  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(false);
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [friends, setFriends] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const location = useLocation();

  const { id = {} } = location.state;

  // console.log(link);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await axios.get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
      );
      setUser(data.data);
    };

    fetchUser();
  }, []);

  // console.log(user);

  useEffect(() => {
    setLoading(true);
    setIsError(false);
    let cancel;
    axios({
      method: "GET",
      url: `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/${size}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setFriends((prevData) => [...prevData, ...response.data.list]);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [page, size]);

  // console.log(friends);

  return (
    <div className="user-cont">
      {user && <UserInfo user={user} />}
      {/* {link(user && user.id)} */}
      {visitedUser &&
        visitedUser.map((user, index) => {
          return (
            <Link
              // to={`/user/${user.item}`}
              // href={`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${user.id}`}
              key={index}
            >
              {user.item}
            </Link>
          );
        })}
      <h3>Friends:</h3>
    </div>
  );
};

export default User;
