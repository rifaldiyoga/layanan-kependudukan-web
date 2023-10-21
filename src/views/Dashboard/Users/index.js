// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const columnsData1 = [
        {
            Header: "NAME",
            accessor: "name",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Role",
            accessor: "role",
        },
        {
            Header: "Tgl Dibuat",
            accessor: "created_at",
        },
        {
            Header: "Action",
            accessor: "action",
        },
    ];

    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <ListView
                title={"Data User"}
                captions={columnsData1}
                data={users}
                loading={loading}
                path="/users"
            />
        </Flex>
    );
}

export default Users;
