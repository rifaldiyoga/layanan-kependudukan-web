// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Jabatans() {
    const [positions, setJabatans] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/positions")
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                let datas = data.data.data;
                setJabatans([]);
                if (datas) setJabatans(datas);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteJabatan = (id) => {
        axiosClient
            .delete("/v1/positions/" + id)
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
            Header: "Kode Jabatan",
            accessor: "code",
        },
        {
            Header: "Nama Jabatan",
            accessor: "jabatan",
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
                title={"Daftar Jabatan"}
                captions={columnsData1}
                data={positions}
                loading={loading}
                path="/positions"
                onDelete={deleteJabatan}
                isAdd={true}
            />
        </Flex>
    );
}

export default Jabatans;
