// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Pindahs() {
    const [pindahs, setPindahs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/jandas")
            .then(({ data }) => {
                setLoading(false);
                setPindahs(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deletePindah = (id) => {
        axiosClient
            .delete("/v1/jandas/" + id)
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
                title={"Daftar Ket. Duda / Janda"}
                captions={columnsData1}
                data={pindahs}
                loading={loading}
                path="/pindahs"
                actionType="print"
                onDelete={deletePindah}
            />
        </Flex>
    );
}

export default Pindahs;
