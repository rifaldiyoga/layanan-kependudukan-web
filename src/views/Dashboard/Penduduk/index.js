// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Penduduks() {
    const [penduduks, setPenduduks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/penduduks")
            .then(({ data }) => {
                setLoading(false);
                setPenduduks(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deletePenduduk = (id) => {
        axiosClient
            .delete("/v1/penduduks/" + id)
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
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "NIK",
            accessor: "nik",
        },
        {
            Header: "Nama Lengkap",
            accessor: "fullname",
        },
        {
            Header: "Jenis Kelamin",
            accessor: "jk",
        },
        {
            Header: "Status",
            accessor: "status_family",
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
                title={"Daftar Penduduk"}
                captions={columnsData1}
                data={penduduks}
                loading={loading}
                path="/penduduks"
                onDelete={deletePenduduk}
                isAdd={true}
            />
        </Flex>
    );
}

export default Penduduks;
