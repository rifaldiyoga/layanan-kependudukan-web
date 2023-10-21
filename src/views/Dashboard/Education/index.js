// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Educations() {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/educations")
            .then(({ data }) => {
                setLoading(false);
                setEducations(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteEducation = (id) => {
        axiosClient
            .delete("/v1/educations/" + id)
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
            Header: "Kode Pendidikan",
            accessor: "code",
        },
        {
            Header: "Nama Pendidikan",
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
                title={"Daftar Pendidikan"}
                captions={columnsData1}
                data={educations}
                loading={loading}
                path="/educations"
                onDelete={deleteEducation}
            />
        </Flex>
    );
}

export default Educations;
