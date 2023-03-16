import React from "react";
import "./userList.css";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/visited";

const UserList = ({ users }) => {
  // console.log(visitedUser);

  const { onUserClick } = useUserContext();

  console.log(useUserContext());

  return (
    <div className="user-wrapper">
      {users.map((user) => {
        const { id, imageUrl, lastName, name, prefix, title } = user;
        return (
          <Link
            to={`/user/${name}`}
            state={{ id: id }}
            key={id}
            className="user-container"
            onClick={() => onUserClick(id, title)}
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
          </Link>
        );
      })}
    </div>
  );
};

export default UserList;
