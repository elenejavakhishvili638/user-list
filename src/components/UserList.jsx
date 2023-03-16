import React, { useState } from "react";
import "./userList.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/visited";

const UserList = ({ users }) => {
  // console.log(visitedUser);

  const navigate = useNavigate();

  const { onUserClick } = useUserContext();

  const [user, setUser] = useState();

  console.log(useUserContext());

  const handleClick = async (id, title) => {
    try {
      const response = await fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
      );
      const data = await response.json();
      setUser(data);
      // console.log(user);
      navigate(`/user/${title}`, {
        state: {
          user: data,
          id: id,
        },
      });
      onUserClick(id, title);
    } catch (error) {
      console.error(error);
    }

    // fetch(
    //   `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => setUser(data));

    // console.log(user);
    // if (user) {
    //   navigate(`/user/${title}`, {
    //     state: {
    //       user: user,
    //       id: id,
    //     }
    //   });
    //   onUserClick(id, title);
    // }
  };

  return (
    <div className="user-wrapper">
      {users.map((user) => {
        const { id, imageUrl, lastName, name, prefix, title } = user;
        return (
          <div
            onClick={() => {
              handleClick(id, title);
            }}
            // to={`/user/${title}`}
            // state={{ id: id }}
            // key={id}
            className="user-container"
            // onClick={() => onUserClick(id, title)}
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
      })}
    </div>
  );
};

export default UserList;
