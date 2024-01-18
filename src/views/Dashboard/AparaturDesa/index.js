// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function AparaturDesas() {
    const [aparatur_desas, setAparaturDesas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/aparatur_desas")
            .then(({ data }) => {
                setLoading(false);
                const datas = data.data.data;
                console.log(datas);
                if (datas) setAparaturDesas(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteAparaturDesa = (id) => {
        axiosClient
            .delete("/v1/aparatur_desas/" + id)
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
            Header: "NIP",
            accessor: "nip",
        },
        {
            Header: "Nama Aparatur Desa",
            accessor: "nama",
        },
        {
            Header: "Jabatan",
            accessor: "jabatan.jabatan",
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
                title={"Daftar Aparatur Desa"}
                captions={columnsData1}
                data={aparatur_desas}
                loading={loading}
                path="/aparatur_desas"
                onDelete={deleteAparaturDesa}
                isAdd={true}
            />
        </Flex>
    );
}

export default AparaturDesas;
