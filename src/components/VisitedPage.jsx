import React from "react";
import { useNavigate } from "react-router-dom";

const VisitedPage = ({ user, last }) => {
  // console.log(con);
  const navigate = useNavigate();
  return (
    <div
      className="visited-wrap"
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
      <div
        className={`${
          user.clicked === "true"
            ? "visited-paragraph clicked"
            : "visited-paragraph"
        }`}
      >{`${user.fullName}`}</div>{" "}
      {last === "true" && <span>&gt;</span>}
    </div>
  );
};

export default VisitedPage;
