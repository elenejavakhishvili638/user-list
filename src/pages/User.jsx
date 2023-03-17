import React, { useState, useCallback, useRef } from "react";
import "./user.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import { useUserContext } from "../context/visited";

import fetchFriends from "../shared/fetchFriends";
import VisitedPage from "../components/VisitedPage";

const User = () => {
  const { visitedUser } = useUserContext();
  let { userId } = useParams();
  const navigate = useNavigate();

  const { onUserClick } = useUserContext();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const location = useLocation();

  const { user } = location.state;

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

  const handleClick = async (id, prefix, name, lastName) => {
    const fullName = prefix + " " + name + " " + lastName;

    console.log(fullName);
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
      onUserClick(id, fullName, "true");
      // const newWord = prefix.concat(name, lastName);
      // console.log(newWord);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-cont">
      {user && <UserInfo user={user} />}
      <div className="visited-users-wrapper">
        {visitedUser &&
          visitedUser.map((user, index) => {
            let con;
            if (
              visitedUser.length === index + 1
                ? (con = "false")
                : (con = "true")
            )
              return <VisitedPage user={user} key={user.id} con={con} />;
          })}
      </div>
      <h3>Friends:</h3>

      <div className="user-wrapper">
        {friends &&
          friends.map((user, index) => {
            const { id, imageUrl, lastName, name, prefix, title } = user;
            if (friends.length === index + 1) {
              return (
                <div
                  key={id}
                  ref={lastUserElement}
                  onClick={() => {
                    handleClick(id, prefix, name, lastName);
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
                    handleClick(id, prefix, name, lastName);
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
    </div>
  );
};

export default User;
