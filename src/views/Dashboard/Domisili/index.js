// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Domisilis() {
    const [domisilis, setDomisilis] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/domisilis")
            .then(({ data }) => {
                setLoading(false);
                setDomisilis(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteDomisili = (id) => {
        axiosClient
            .delete("/v1/domisilis/" + id)
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
                title={"Daftar Domisili"}
                captions={columnsData1}
                data={domisilis}
                loading={loading}
                path="/domisilis"
                actionType="print"
                onDelete={deleteDomisili}
            />
        </Flex>
    );
}

export default Domisilis;
