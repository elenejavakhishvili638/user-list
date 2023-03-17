import React, { useState, useCallback, useRef } from "react";
import "./user.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import { useUserContext } from "../context/visited";

import fetchFriends from "../shared/fetchFriends";

const User = () => {
  const { visitedUser } = useUserContext();
  let { userId } = useParams();
  const navigate = useNavigate();

  const { onUserClick } = useUserContext();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const location = useLocation();

  const { user, id } = location.state;

  const { loading, isError, more, friends } = fetchFriends(page, size, userId);

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
        visitedUser.map((user) => {
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
