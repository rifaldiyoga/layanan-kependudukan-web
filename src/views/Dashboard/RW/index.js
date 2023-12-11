// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function RWs() {
    const [rws, setRWs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/rws")
            .then(({ data }) => {
                setLoading(false);
                setRWs(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteRW = (id) => {
        axiosClient
            .delete("/v1/rws/" + id)
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
            Header: "Kode RW",
            accessor: "code",
        },
        {
            Header: "Nama RW",
            accessor: "name",
        },
        {
            Header: "Kelurahan",
            accessor: "kelurahan.name",
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
                title={"Daftar RW"}
                captions={columnsData1}
                data={rws}
                loading={loading}
                path="/rws"
                onDelete={deleteRW}
            />
        </Flex>
    );
}

export default RWs;
