import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "..";
import { setOtherUsers } from "../components/redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const token = localStorage.getItem("token");
        if (token) {
            console.log(token)
          const res = await axios.get(`${BASE_URL}/api/v1/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // store
          console.log("other users -> ", res);
          dispatch(setOtherUsers(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, [dispatch]); // Add dispatch to the dependency array
};

export default useGetOtherUsers;
