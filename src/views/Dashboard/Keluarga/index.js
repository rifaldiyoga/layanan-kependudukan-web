// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Keluargas() {
    const [keluargas, setKeluargas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/keluargas")
            .then(({ data }) => {
                setLoading(false);
                setKeluargas(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteKeluarga = (id) => {
        axiosClient
            .delete("/v1/keluargas/" + id)
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
            Header: "No. Kartuu Keluarga",
            accessor: "no_kk",
        },
        {
            Header: "Kepala Keluarga",
            accessor: "kepala_keluarga",
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
                title={"Daftar Keluarga"}
                captions={columnsData1}
                data={keluargas}
                loading={loading}
                path="/keluargas"
                onDelete={deleteKeluarga}
                isAdd={true}
            />
        </Flex>
    );
}

export default Keluargas;
