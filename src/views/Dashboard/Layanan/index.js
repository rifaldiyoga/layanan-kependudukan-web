// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Layanans() {
    const [layanans, setLayanans] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/layanans/paging")
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                setLayanans(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteLayanan = (id) => {
        axiosClient
            .delete("/v1/layanans/" + id)
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
            Header: "Kode Layanan",
            accessor: "code",
        },
        {
            Header: "Nama Layanan",
            accessor: "name",
        },
        {
            Header: "Type",
            accessor: "type",
        },
        {
            Header: "Konfirmasi RT / RW",
            accessor: "is_confirm",
        },
        {
            Header: "Tanda Tangan Lurah",
            accessor: "is_sign",
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
                title={"Daftar Layanan"}
                captions={columnsData1}
                data={layanans}
                loading={loading}
                path="/layanans"
                onDelete={deleteLayanan}
            />
        </Flex>
    );
}

export default Layanans;
