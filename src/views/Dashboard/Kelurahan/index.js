// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Kelurahans() {
    const [kelurahans, setKelurahans] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/kelurahans")
            .then(({ data }) => {
                setLoading(false);
                setKelurahans(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteKelurahan = (id) => {
        axiosClient
            .delete("/v1/kelurahans/" + id)
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
            Header: "Kode Kelurahan",
            accessor: "code",
        },
        {
            Header: "Nama Kelurahan",
            accessor: "name",
        },
        {
            Header: "Kecamatan",
            accessor: "kecamatan",
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
                title={"Daftar Kelurahan"}
                captions={columnsData1}
                data={kelurahans}
                loading={loading}
                path="/kelurahans"
                onDelete={deleteKelurahan}
            />
        </Flex>
    );
}

export default Kelurahans;
