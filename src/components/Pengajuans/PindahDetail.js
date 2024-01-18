import axiosClient from "axios-client";
import StatusBadge from "components/Badge/StatusBadge";
import { BASE_IMAGE_URL } from "constants";
import { BASE_URL } from "constants";
import Helper from "helper/Helper";
import { useEffect, useState } from "react";

const {
    Flex,
    Table,
    Tbody,
    Tr,
    Td,
    Thead,
    Text,
    Link,
} = require("@chakra-ui/react");

export const PindahDetail = ({ pengajuans }) => {
    const [data, setData] = useState();

    const getDatas = (id) => {
        axiosClient
            .get("/v1/pindahs/" + id)
            .then(({ data }) => {
                const pengajuans = data.data;
                console.log(pengajuans);

                setData(pengajuans);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getDatas(pengajuans);
    }, []);

    return data ? (
        <Flex direction="column">
            <Table p="0px" mt="16px">
                <Tbody>
                    <Tr>
                        <Td w="15%">Jenis Pindah</Td>
                        <Td w="2%"> : </Td>
                        <Td>{data.type}</Td>
                    </Tr>
                    <Tr>
                        <Td>Alamat Tujuan</Td>
                        <Td> : </Td>
                        <Td>
                            {data.alamat_tujuan} Rt {data.rt} / RW {data.rw}{" "}
                            Kelurahan{" "}
                            {Helper.capitalizeFirstLetter(data.kelurahan)}{" "}
                            Kecamatan{" "}
                            {Helper.capitalizeFirstLetter(data.kecamatan.name)}{" "}
                            {Helper.capitalizeFirstLetter(data.kota.name)}{" "}
                            {Helper.capitalizeFirstLetter(data.provinsi.name)}
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
            <Text fontSize="l" fontWeight="bold" flex="1" mt="16px">
                Detail Dokumen
            </Text>
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Td>Nama Dokmen</Td>
                        <Td>Actions</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Lampiran </Td>
                        <Td>
                            <Link
                                color="teal.500"
                                href={BASE_IMAGE_URL + data.lampiran}
                                isExternal
                            >
                                Lihat Dokumen
                            </Link>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </Flex>
    ) : (
        <></>
    );
};
