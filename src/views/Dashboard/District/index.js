// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Districts() {
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/districts")
            .then(({ data }) => {
                setLoading(false);
                setDistricts(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteDistrict = (id) => {
        axiosClient
            .delete("/v1/districts/" + id)
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
            Header: "Kode Kota",
            accessor: "code",
        },
        {
            Header: "Nama Kota",
            accessor: "name",
        },
        {
            Header: "Provinsi",
            accessor: "province",
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
                title={"Daftar Kota"}
                captions={columnsData1}
                data={districts}
                loading={loading}
                path="/districts"
                onDelete={deleteDistrict}
            />
        </Flex>
    );
}

export default Districts;
