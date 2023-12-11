// Chakra imports
import { Button, Flex } from "@chakra-ui/react";
import axiosClient from "axios-client";
import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import ListView from "../../../components/Layout/ListView";

function Pengajuans() {
    const [pengajuans, setPengajuans] = useState([]);
    const [loading, setLoading] = useState(false);

    const filter = {
        periode: [
            new DateObject().subtract(90, "days"),
            new DateObject().add(1, "days"),
        ],
        status: "PENDING",
        start_date: new DateObject().subtract(90, "days").format("YYYY-MM-DD"),
        end_date: new DateObject().add(1, "days").format("YYYY-MM-DD"),
    };

    useEffect(() => {
        getDatas(filter);
    }, []);

    const getDatas = (filter) => {
        setLoading(true);
        axiosClient
            .get("/v1/pengajuans/admin", { params: filter })
            .then(({ data }) => {
                setLoading(false);

                setPengajuans([]);
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
                onFilter={getDatas}
                initialValues={filter}
                status={true}
            />
        </Flex>
    );
}

export default Pengajuans;
