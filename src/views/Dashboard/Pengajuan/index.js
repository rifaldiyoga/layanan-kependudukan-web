// Chakra imports
import { Button, Flex, Icon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Pengajuans() {
    const [pengajuans, setPengajuans] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/pengajuans/admin")
            .then(({ data }) => {
                setLoading(false);
                let datas = data.data.data.map((d) => {
                    let stat = "Menunggu Persetujuan Kelurahan";
                    if (d.status == "VALID") {
                        stat = "Sudah Disetuji";
                    }
                    if (d.status == "REJECTED") {
                        stat = "Sudah Ditolak";
                    }
                    return { ...d, status: stat };
                });

                setPengajuans(datas);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deletePengajuan = (id) => {
        axiosClient
            .delete("/v1/pengajuans/" + id)
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
            Header: "NIK",
            accessor: "nik",
        },
        {
            Header: "Layanan",
            accessor: "layanan",
        },
        {
            Header: "Nama Pengaju",
            accessor: "name",
        },

        {
            Header: "Keterangan",
            accessor: "keterangan",
        },

        {
            Header: "Status",
            accessor: "status",
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

    const actions = () => {
        return (
            <Button p="0px" bg="transparent">
                <Flex cursor="pointer" align="center" p="6px">
                    TES
                </Flex>
            </Button>
        );
    };

    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <ListView
                title={"Daftar Pengajuan"}
                captions={columnsData1}
                data={pengajuans}
                loading={loading}
                path="/pengajuans"
                actionType="view_only"
                onDelete={deletePengajuan}
            />
        </Flex>
    );
}

export default Pengajuans;
