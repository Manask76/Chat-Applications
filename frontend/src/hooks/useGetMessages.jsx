import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from '..';
import { setMessages } from '../components/redux/messageSlice';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const token = localStorage.getItem("token");
                if (token) {
                    const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser?._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    dispatch(setMessages(res.data));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchMessages();
    }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;
