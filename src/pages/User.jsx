import React, { useEffect, useState } from "react";
import "./user.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserInfo from "../components/UserInfo";
import { useUserContext } from "../context/visited";

const User = () => {
  // const [user, setUser] = useState();

  const { visitedUser } = useUserContext();

  const navigate = useNavigate();

  const { onUserClick } = useUserContext();

  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(false);
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [friends, setFriends] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const location = useLocation();

  const { user, id } = location.state;

  console.log(id);

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

  // const handleClick = async (id, title) => {
  //   try {
  //     const response = await fetch(
  //       `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
  //     );
  //     const data = await response.json();
  //     // setUser(data);
  //     // console.log(user);
  //     navigate(`/user/${title}`, {
  //       state: {
  //         user: data,
  //         id: id,
  //       },
  //     });
  //     onUserClick(id, title);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="user-cont">
      {user && <UserInfo user={user} />}
      {visitedUser &&
        visitedUser.map((user, index) => {
          return (
            <p
              key={index}
              onClick={async () => {
                try {
                  const response = await fetch(
                    `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${user.id}`
                  );
                  const data = await response.json();
                  // setUser(data);
                  // console.log(user);
                  navigate(`/user/${user.item}`, {
                    state: {
                      user: data,
                      id: id,
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

      {/* {friends.map((user) => {
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
      })} */}
    </div>
  );
};

export default User;
