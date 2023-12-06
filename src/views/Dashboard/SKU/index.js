// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function SKUs() {
    const [skus, setSKUs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/skus")
            .then(({ data }) => {
                setLoading(false);
                setSKUs(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteSKU = (id) => {
        axiosClient
            .delete("/v1/skus/" + id)
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
            Header: "Usaha",
            accessor: "usaha",
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
                title={"Daftar Keterangan Usaha"}
                captions={columnsData1}
                data={skus}
                loading={loading}
                actionType="print"
                path="/skus"
                onDelete={deleteSKU}
            />
        </Flex>
    );
}

export default SKUs;
