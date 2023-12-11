// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function RTs() {
    const [rts, setRTs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/rts")
            .then(({ data }) => {
                setLoading(false);
                setRTs(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteRT = (id) => {
        axiosClient
            .delete("/v1/rts/" + id)
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
            Header: "Kode RT",
            accessor: "code",
        },
        {
            Header: "Nama RT",
            accessor: "name",
        },
        {
            Header: "RW",
            accessor: "rw.name",
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
                title={"Daftar RT"}
                captions={columnsData1}
                data={rts}
                loading={loading}
                path="/rts"
                onDelete={deleteRT}
            />
        </Flex>
    );
}

export default RTs;
