// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Status() {
    const [status, setStatus] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/status")
            .then(({ data }) => {
                setLoading(false);
                setStatus(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteReligion = (id) => {
        axiosClient
            .delete("/v1/status/" + id)
            .then((response) => {
                if (response.status == 200) {
                    console.log(response);
                    getDatas();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const columnsData1 = [
        {
            Header: "Kode ",
            accessor: "code",
        },
        {
            Header: "Status Keluarga",
            accessor: "name",
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
                title={"Daftar Status Dalam Rumah Keluarga"}
                captions={columnsData1}
                data={status}
                loading={loading}
                path="/status"
                onDelete={deleteReligion}
                isAdd={true}
            />
        </Flex>
    );
}

export default Status;
