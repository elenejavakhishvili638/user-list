import React, { useEffect, useState } from "react";
import "./user.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState();

  const location = useLocation();

  const { id } = location.state;

  useEffect(() => {
    const fetchUser = async () => {
      const data = await axios.get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
      );
      setUser(data.data);
    };

    fetchUser();
  }, []);

  console.log(user);

  const {
    address,
    company,
    email,
    imageUrl,
    ip,
    jobArea,
    jobDescription,
    jobType,
    lastName,
    name,
    prefix,
    title,
  } = user;

  return (
    <div className="user-container">
      <div className="user-info">
        <img src={imageUrl} alt={name} />
      </div>
    </div>
  );
};

export default User;
