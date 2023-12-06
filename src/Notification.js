import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener } from "./fcm";
import { Button, Center, Flex, Link, Text } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Notification = () => {
    const history = useHistory();
    const [notification, setNotification] = useState({ title: "", body: "" });
    const notify = () => toast(<ToastDisplay />);
    function ToastDisplay() {
        return (
            <Link
                onClick={() => {
                    history.push({ pathname: "/admin/pengajuans" });
                    setNotification([]);
                    toast.dismiss();
                }}
            >
                <Flex direction="row" alignItems="center" minW="300px">
                    <Center>
                        <InfoIcon color="blue.400" />
                    </Center>
                    <Flex direction="column" ms={4}>
                        <Text fontWeight="bold" mb={1}>
                            {notification.title}
                        </Text>
                        <Text>{notification.body}</Text>
                    </Flex>
                </Flex>
            </Link>
        );
    }

    useEffect(() => {
        if (notification?.title) {
            notify();
        }
    }, [notification]);

    onMessageListener()
        .then((payload) => {
            setNotification({
                title: payload?.notification?.title,
                body: payload?.notification?.body,
            });
        })
        .catch((err) => console.log("failed: ", err));

    return <Toaster position="top-right" toastOptions={{ duration: 6000 }} />;
};

export default Notification;
