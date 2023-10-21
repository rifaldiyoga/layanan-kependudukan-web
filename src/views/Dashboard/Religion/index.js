// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Religions() {
    const [religions, setReligions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/religions")
            .then(({ data }) => {
                setLoading(false);
                setReligions(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteReligion = (id) => {
        axiosClient
            .delete("/v1/religions/" + id)
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
            Header: "Kode Agama",
            accessor: "code",
        },
        {
            Header: "Nama Agama",
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
                title={"Daftar Agama"}
                captions={columnsData1}
                data={religions}
                loading={loading}
                path="/religions"
                onDelete={deleteReligion}
            />
        </Flex>
    );
}

export default Religions;
