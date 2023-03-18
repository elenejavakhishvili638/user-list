import React, { useState } from "react";
import "./userList.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/visited";

const UserList = ({ users }) => {
  const navigate = useNavigate();

  const { onUserClick } = useUserContext();

  const [user, setUser] = useState();

  // console.log(useUserContext());

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
      })}
    </div>
  );
};

export default UserList;
