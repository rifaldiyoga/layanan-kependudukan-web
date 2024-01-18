// Chakra imports
import { Button, Flex } from "@chakra-ui/react";
import axiosClient from "axios-client";
import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import ListView from "../../../components/Layout/ListView";

function Rumahs() {
    const [rumahs, setRumahs] = useState([]);
    const [loading, setLoading] = useState(false);

    const filter = {
        periode: [
            new DateObject().subtract(90, "days"),
            new DateObject().add(1, "days"),
        ],

        start_date: new DateObject().subtract(90, "days").format("YYYY-MM-DD"),
        end_date: new DateObject().add(1, "days").format("YYYY-MM-DD"),
    };

    useEffect(() => {
        getDatas(filter);
    }, []);

    const getDatas = (filter) => {
        setLoading(true);
        axiosClient
            .get("/v1/rumahs", { params: filter })
            .then(({ data }) => {
                setLoading(false);
                let datas = data.data.data;
                setRumahs([]);
                if (datas) setRumahs(datas);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteBerpergian = (id) => {
        axiosClient
            .delete("/v1/rumahs/" + id)
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
            Header: "Kode Surat",
            accessor: "kode_surat",
        },
        {
            Header: "NIK",
            accessor: "nik",
        },

        {
            Header: "Nama",
            accessor: "penduduk.fullname",
        },
        {
            Header: "Keterangan",
            accessor: "keterangan",
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
                title={"Daftar Belum Memiliki Rumah"}
                captions={columnsData1}
                data={rumahs}
                loading={loading}
                path="/rumahs"
                actionType="print"
                onDelete={deleteBerpergian}
                onFilter={getDatas}
                initialValues={filter}
            />
        </Flex>
    );
}

export default Rumahs;
