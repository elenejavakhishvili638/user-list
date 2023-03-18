import { useEffect, useState } from "react";
import axios from "axios";

const fetchUsers = (page, size) => {
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    setIsError(false);
    let cancel;
    axios({
      method: "GET",
      url: `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${size}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setUsers((prevData) => [...prevData, ...response.data.list]);
        setLoading(false);
        setMore(response.data.list.length > 0);
        // console.log(more);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setIsError(true);
        console.log(e);
      });
    return () => cancel();
  }, [page, size]);

  return { loading, isError, users, more };
};

export default fetchUsers;
