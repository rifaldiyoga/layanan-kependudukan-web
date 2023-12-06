// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function PernahNikahs() {
    const [pernah_menikahs, setPernahNikahs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/pernah_menikahs")
            .then(({ data }) => {
                setLoading(false);
                setPernahNikahs(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deletePernahNikah = (id) => {
        axiosClient
            .delete("/v1/pernah_menikahs/" + id)
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
                title={"Daftar Pernah Nikah"}
                captions={columnsData1}
                data={pernah_menikahs}
                loading={loading}
                actionType="print"
                path="/pernah_menikahs"
                onDelete={deletePernahNikah}
            />
        </Flex>
    );
}

export default PernahNikahs;
