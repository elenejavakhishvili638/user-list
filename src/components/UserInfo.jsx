import React from "react";
import "./userInfo.css";

const UserInfo = ({ user }) => {
  const {
    address,
    company,
    email,
    imageUrl,
    ip,
    jobArea,
    jobDescriptor,
    jobType,
    lastName,
    name,
    prefix,
    title,
  } = user;

  return (
    <div className="user-info">
      <div className="user-img">
        <img src={imageUrl} alt={name} />
      </div>
      <fieldset className="info">
        <legend>Info</legend>
        <h3>
          {prefix} {name} {lastName}
        </h3>
        <p>
          <em>{title}</em>
        </p>
        <div className="personal-info">
          <p>
            <span>Email:</span> {email}
          </p>
          <p>
            <span>Ip Adress:</span> {ip}
          </p>
          <p>
            <span>Job Description:</span> {jobDescriptor}
          </p>
          <p>
            <span>Job Area:</span> {jobArea}
          </p>
          <p>
            <span>Job Type:</span> {jobType}
          </p>
        </div>
      </fieldset>
      <fieldset className="address">
        <legend>Address</legend>
        <h3>
          {company.name} {company.suffix}
        </h3>
        <div className="address-info">
          <p>
            <span>City:</span> {address.city}
          </p>
          <p>
            <span>Country:</span> {address.country}
          </p>
          <p>
            <span>State:</span> {address.state}
          </p>
          <p>
            <span>Street Address:</span> {address.streetAddress}
          </p>
          <p>
            <span>ZIP:</span> {address.zipCode}
          </p>
        </div>
      </fieldset>
    </div>
  );
};

export default UserInfo;
