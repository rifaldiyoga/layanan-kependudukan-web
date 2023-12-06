// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Sporadiks() {
    const [sporadik, setSporadiks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/sporadik")
            .then(({ data }) => {
                setLoading(false);
                setSporadiks(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteSporadik = (id) => {
        axiosClient
            .delete("/v1/sporadik/" + id)
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
                title={"Daftar Keterangan Sporadik"}
                captions={columnsData1}
                data={sporadik}
                loading={loading}
                actionType="print"
                path="/sporadik"
                onDelete={deleteSporadik}
            />
        </Flex>
    );
}

export default Sporadiks;
