// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/jobs")
            .then(({ data }) => {
                setLoading(false);
                setJobs(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteJob = (id) => {
        axiosClient
            .delete("/v1/jobs/" + id)
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
            Header: "Kode Pekerjaan",
            accessor: "code",
        },
        {
            Header: "Nama Pekerjaan",
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
                title={"Daftar Pekerjaan"}
                captions={columnsData1}
                data={jobs}
                loading={loading}
                path="/jobs"
                onDelete={deleteJob}
            />
        </Flex>
    );
}

export default Jobs;
