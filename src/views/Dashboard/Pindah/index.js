// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function PindahKeluars() {
    const [pindahs, setPindahKeluars] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/pindahs")
            .then(({ data }) => {
                setLoading(false);
                setPindahKeluars(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deletePindahKeluar = (id) => {
        axiosClient
            .delete("/v1/pindahs/" + id)
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
            Header: "Jenis",
            accessor: "type",
        },
        {
            Header: "Keperluan",
            accessor: "alasan_pindah",
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
                title={"Daftar Pindah"}
                captions={columnsData1}
                data={pindahs}
                loading={loading}
                actionType="print"
                path="/pindahs"
                onDelete={deletePindahKeluar}
            />
        </Flex>
    );
}

export default PindahKeluars;
