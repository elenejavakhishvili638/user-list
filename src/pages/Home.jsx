import React, { useCallback, useEffect, useState, useRef } from "react";
import UserList from "../components/UserList";
import axios from "axios";
import "./home.css";

import fetchUsers from "../shared/fetchUsers";

import { useUserContext } from "../context/visited";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const navigate = useNavigate();

  const { onUserClick } = useUserContext();

  const observer = useRef();

  const { loading, isError, users, more } = fetchUsers(page, size);

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
      // setUser(data);
      // console.log(user);
      navigate(`/${id}`, {
        state: {
          user: data,
          id: id,
        },
      });
      onUserClick(id, fullName, "true");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home">
      <div className="user-wrapper">
        {users.map((user, index) => {
          const { id, imageUrl, lastName, name, prefix, title } = user;

          if (users.length === index + 1) {
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
                onClick={() => {
                  handleClick(id, prefix, name, lastName);
                }}
                key={id}
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
          }
        })}
        <div>{loading && "Loading..."}</div>
        <div>{isError && "Error"}</div>
      </div>
    </div>
  );
};

export default Home;
