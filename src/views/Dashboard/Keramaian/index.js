// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Keramaians() {
    const [keramaians, setKeramaians] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/keramaians")
            .then(({ data }) => {
                setLoading(false);
                setKeramaians(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteKeramaian = (id) => {
        axiosClient
            .delete("/v1/keramaians/" + id)
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
            Header: "Keperluan",
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
                title={"Daftar Ijin Keramaian"}
                captions={columnsData1}
                data={keramaians}
                loading={loading}
                actionType="print"
                path="/keramaians"
                onDelete={deleteKeramaian}
            />
        </Flex>
    );
}

export default Keramaians;
