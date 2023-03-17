import React, { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";

const fetchFriends = (page, size, userId) => {
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setFriends([]);
  }, [userId]);

  useEffect(() => {
    // setStateUserId(userId);
    // console.log(userId);
    setLoading(true);
    setIsError(false);
    let cancel;
    axios({
      method: "GET",
      url: `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${page}/${size}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setFriends((prevData) => [...prevData, ...response.data.list]);
        setLoading(false);
        setMore(response.data.list.length > 0);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        // setError(true);
      });
    return () => cancel();
  }, [page, size, userId]);

  return { loading, isError, more, friends };
};

export default fetchFriends;
