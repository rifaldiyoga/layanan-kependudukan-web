// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Kematians() {
    const [kematians, setKematians] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/kematians")
            .then(({ data }) => {
                setLoading(false);
                setKematians(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteKematian = (id) => {
        axiosClient
            .delete("/v1/kematians/" + id)
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
            Header: "Kode Kematian",
            accessor: "code",
        },
        {
            Header: "Nama Kematian",
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
                title={"Daftar Kematian"}
                captions={columnsData1}
                data={kematians}
                loading={loading}
                path="/kematians"
                onDelete={deleteKematian}
            />
        </Flex>
    );
}

export default Kematians;
