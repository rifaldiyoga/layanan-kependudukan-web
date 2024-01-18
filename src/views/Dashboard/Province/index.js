// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Provinces() {
    const [provinces, setProvinces] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/provinces")
            .then(({ data }) => {
                setLoading(false);
                setProvinces(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteProvince = (id) => {
        axiosClient
            .delete("/v1/provinces/" + id)
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
            Header: "Kode Provinsi",
            accessor: "code",
        },
        {
            Header: "Nama Provinsi",
            accessor: "name",
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
                title={"Daftar Provinsi"}
                captions={columnsData1}
                data={provinces}
                loading={loading}
                path="/provinces"
                onDelete={deleteProvince}
                isAdd={true}
            />
        </Flex>
    );
}

export default Provinces;
