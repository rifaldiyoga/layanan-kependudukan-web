// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function SubDistricts() {
    const [subdistricts, setSubDistricts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/subdistricts")
            .then(({ data }) => {
                setLoading(false);
                setSubDistricts(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteRegency = (id) => {
        axiosClient
            .delete("/v1/subdistricts/" + id)
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
            Header: "Kode Kecamatan",
            accessor: "code",
        },
        {
            Header: "Nama Kecamatan",
            accessor: "name",
        },
        {
            Header: "Kota",
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
                title={"Daftar Kecamatan"}
                captions={columnsData1}
                data={subdistricts}
                loading={loading}
                path="/subdistricts"
                onDelete={deleteRegency}
            />
        </Flex>
    );
}

export default SubDistricts;
