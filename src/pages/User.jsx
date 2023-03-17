import React, { useEffect, useState, useCallback, useRef } from "react";
import "./user.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserInfo from "../components/UserInfo";
import { useUserContext } from "../context/visited";

const User = () => {
  // const [user, setUser] = useState();

  const { visitedUser } = useUserContext();

  // console.log(visitedUser);

  let { userId } = useParams();

  // console.log(useParams());

  const navigate = useNavigate();

  const { onUserClick } = useUserContext();

  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(false);
  // const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [friends, setFriends] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  // const [stateUserId, setStateUserId] = useState(userId);

  const location = useLocation();

  const { user, id } = location.state;

  useEffect(() => {
    setFriends([]);
  }, [userId]);

  useEffect(() => {
    // setStateUserId(userId);
    // console.log(userId);
    setLoading(true);
    setIsError(false);
    let cancel;
    axios({
      method: "GET",
      url: `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${page}/${size}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setFriends((prevData) => [...prevData, ...response.data.list]);
        setLoading(false);
        setMore(response.data.list.length > 0);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        // setError(true);
      });
    return () => cancel();
  }, [page, size, userId]);

  console.log(friends);

  const observer = useRef();

  const lastUserElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && more) {
          // console.log("visible");
          setPage((prevValue) => prevValue + 1);
        }
      });
      if (node) observer.current.observe(node);
      // console.log(node);
    },
    [loading, more]
  );

  const handleClick = async (id, title) => {
    try {
      const response = await fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
      );
      const data = await response.json();
      // setUser(data);
      // console.log(user);
      navigate(`/${id}`, {
        state: {
          user: data,
          id: id,
        },
      });
      onUserClick(id, title);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-cont">
      {user && <UserInfo user={user} />}
      {visitedUser &&
        visitedUser.map((user, index) => {
          console.log(user);
          return (
            <p
              key={user.id}
              ref={lastUserElement}
              onClick={async () => {
                try {
                  const response = await fetch(
                    `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${user.id}`
                  );
                  const data = await response.json();
                  // setUser(data);
                  // console.log(user);
                  navigate(`/${user.id}`, {
                    state: {
                      user: data,
                      id: user.id,
                    },
                  });
                  // onUserClick(user.id, title);
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              {`${user.item}>`}
            </p>
          );
        })}
      <h3>Friends:</h3>

      {friends &&
        friends.map((user, index) => {
          const { id, imageUrl, lastName, name, prefix, title } = user;
          if (friends.length === index + 1) {
            return (
              <div
                key={id}
                ref={lastUserElement}
                onClick={() => {
                  handleClick(id, title);
                }}
                className="user-container"
              >
                <div className="image-container">
                  <img src={imageUrl} alt={name} />
                </div>
                <div className="user-information">
                  <h3>
                    {prefix} {name} {lastName}
                  </h3>
                  <p>{title}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={id}
                className="user-container"
                onClick={() => {
                  handleClick(id, title);
                }}
              >
                <div className="image-container">
                  <img src={imageUrl} alt={name} />
                </div>
                <div className="user-information">
                  <h3>
                    {prefix} {name} {lastName}
                  </h3>
                  <p>{title}</p>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default User;

// console.log(user, id);

// useEffect(() => {
//   const fetchUser = async () => {
//     const data = await axios.get(
//       `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
//     );
//     setUser(data.data);
//   };

//   fetchUser();
// }, []);

// console.log(user);
