import axiosClient from "axios-client";
import StatusBadge from "components/Badge/StatusBadge";
import { BASE_IMAGE_URL } from "constants";
import { BASE_URL } from "constants";
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

export const KematianDetail = ({ pengajuans }) => {
    const [data, setData] = useState();

    const getDatas = (id) => {
        axiosClient
            .get("/v1/kematians/" + id)
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
                        <Td w="15%">Nama Alm</Td>
                        <Td w="2%"> : </Td>
                        <Td>{data.jenazah.fullname}</Td>
                    </Tr>
                    <Tr>
                        <Td>Jenis Kelamin</Td>
                        <Td> : </Td>
                        <Td>
                            {data.jenazah.jk == "L"
                                ? "Laki - laki"
                                : "Perempuan"}
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Tanggal Kematian</Td>
                        <Td> : </Td>
                        <Td>{data.tgl_kematian}</Td>
                    </Tr>
                    <Tr>
                        <Td>Pukul</Td>
                        <Td> : </Td>
                        <Td>{data.jam}</Td>
                    </Tr>
                    <Tr>
                        <Td>Tempat Kematian</Td>
                        <Td> : </Td>
                        <Td>{data.tempat}</Td>
                    </Tr>
                    <Tr>
                        <Td>Sebab Kematian</Td>
                        <Td> : </Td>
                        <Td>{data.sebab}</Td>
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
                        <Td>Lampiran Ket. Rumah Sakit</Td>
                        <Td>
                            <Text>
                                <Link
                                    href={BASE_IMAGE_URL + data.lampiran_ket_rs}
                                    color="teal.500"
                                    isExternal
                                >
                                    Lihat Dokumen
                                </Link>
                            </Text>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </Flex>
    ) : (
        <></>
    );
};
