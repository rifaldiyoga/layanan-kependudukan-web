// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Kelahirans() {
    const [kelahirans, setKelahirans] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/kelahirans")
            .then(({ data }) => {
                setLoading(false);
                setKelahirans(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteKelahiran = (id) => {
        axiosClient
            .delete("/v1/kelahirans/" + id)
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
            Header: "Kode Kelahiran",
            accessor: "code",
        },
        {
            Header: "Nama Kelahiran",
            accessor: "name",
        },
        {
            Header: "Type",
            accessor: "type",
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
                title={"Daftar Kelahiran"}
                captions={columnsData1}
                data={kelahirans}
                loading={loading}
                path="/kelahirans"
                onDelete={deleteKelahiran}
            />
        </Flex>
    );
}

export default Kelahirans;
