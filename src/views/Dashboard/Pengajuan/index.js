// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Pengajuans() {
    const [pengajuans, setPengajuans] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/pengajuans")
            .then(({ data }) => {
                setLoading(false);
                setPengajuans(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deletePengajuan = (id) => {
        axiosClient
            .delete("/v1/pengajuans/" + id)
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
            Header: "Layanan",
            accessor: "layanan_id",
        },
        {
            Header: "Nama Pengajuan",
            accessor: "name",
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
                title={"Daftar Pengajuan"}
                captions={columnsData1}
                data={pengajuans}
                loading={loading}
                path="/pengajuans"
                onDelete={deletePengajuan}
            />
        </Flex>
    );
}

export default Pengajuans;
