import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import UserInfo from "../components/UserInfo";

const VisitedPage = () => {
  const location = useLocation();
  const [user, setUser] = useState();

  const { id = {} } = location.state;

  useEffect(() => {
    const fetchUser = async () => {
      const data = await axios.get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
      );
      setUser(data.data);
    };

    fetchUser();
  }, []);

  console.log(id);

  return <div className="user-cont">{user && <UserInfo user={user} />}</div>;
};

export default VisitedPage;
