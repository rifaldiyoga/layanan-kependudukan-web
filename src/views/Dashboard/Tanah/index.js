// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Tanahs() {
    const [tanahs, setTanahs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/tanahs")
            .then(({ data }) => {
                setLoading(false);
                setTanahs(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteTanah = (id) => {
        axiosClient
            .delete("/v1/tanahs/" + id)
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
                title={"Daftar Kepemilikan Tanah"}
                captions={columnsData1}
                data={tanahs}
                loading={loading}
                actionType="print"
                path="/tanahs"
                onDelete={deleteTanah}
            />
        </Flex>
    );
}

export default Tanahs;
