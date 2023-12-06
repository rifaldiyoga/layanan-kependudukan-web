// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Kepolisians() {
    const [kepolisians, setKepolisians] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/kepolisians")
            .then(({ data }) => {
                setLoading(false);
                setKepolisians(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteKepolisian = (id) => {
        axiosClient
            .delete("/v1/kepolisians/" + id)
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
            Header: "Kode",
            accessor: "kode_surat",
        },
        {
            Header: "NIK",
            accessor: "nik",
        },
        {
            Header: "Keterangan",
            accessor: "keterangan",
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
                title={"Daftar Pengantar SKCK"}
                captions={columnsData1}
                data={kepolisians}
                loading={loading}
                actionType="print"
                path="/kepolisians"
                onDelete={deleteKepolisian}
            />
        </Flex>
    );
}

export default Kepolisians;
