// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Rumahs() {
    const [rumahs, setRumahs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/rumahs")
            .then(({ data }) => {
                setLoading(false);
                setRumahs(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteRumah = (id) => {
        axiosClient
            .delete("/v1/rumahs/" + id)
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
                title={"Daftar Tidak Memiliki Rumah"}
                captions={columnsData1}
                data={rumahs}
                actionType="print"
                loading={loading}
                path="/rumahs"
                onDelete={deleteRumah}
            />
        </Flex>
    );
}

export default Rumahs;
