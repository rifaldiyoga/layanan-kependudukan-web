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

export const DomisiliDetail = ({ pengajuans }) => {
    const [data, setData] = useState();

    const getDatas = (id) => {
        axiosClient
            .get("/v1/domisilis/" + id)
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
                        <Td w="15%">Jenis Pengajuan</Td>
                        <Td w="2%"> : </Td>
                        <Td>{data.type}</Td>
                    </Tr>
                    {data.type != "Perorangan" ? (
                        <>
                            {" "}
                            <Tr>
                                <Td>Nama Perusahaan</Td>
                                <Td> : </Td>
                                <Td>{data.nama_perusahaan}</Td>
                            </Tr>
                            <Tr>
                                <Td>Jenis Perusahaan</Td>
                                <Td> : </Td>
                                <Td>{data.jenis_perusahaan}</Td>
                            </Tr>
                            <Tr>
                                <Td>Alamat Perusahaan</Td>
                                <Td> : </Td>
                                <Td>{data.alamat_perusahaan}</Td>
                            </Tr>
                            <Tr>
                                <Td>Telp Perusahaan</Td>
                                <Td> : </Td>
                                <Td>{data.telp_perusahaan}</Td>
                            </Tr>
                            <Tr>
                                <Td>Status Bangunan</Td>
                                <Td> : </Td>
                                <Td>{data.status_bangunan}</Td>
                            </Tr>
                            <Tr>
                                <Td>No. Akta Perushaan</Td>
                                <Td> : </Td>
                                <Td>{data.akta_perusahaan}</Td>
                            </Tr>
                            <Tr>
                                <Td>Penganggung Jawab</Td>
                                <Td> : </Td>
                                <Td>{data.penanggung_jawab}</Td>
                            </Tr>
                        </>
                    ) : (
                        <></>
                    )}
                </Tbody>
            </Table>

            {data.type != "Perorangan" ? (
                <>
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
                </>
            ) : (
                <></>
            )}
        </Flex>
    ) : (
        <></>
    );
};
