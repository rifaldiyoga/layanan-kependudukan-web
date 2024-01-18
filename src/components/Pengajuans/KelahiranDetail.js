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

export const KelahiranDetail = ({ pengajuans }) => {
    const [data, setData] = useState();

    const getDatas = (id) => {
        axiosClient
            .get("/v1/kelahirans/" + id)
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
                        <Td w="15%">Nama Anak</Td>
                        <Td w="2%"> : </Td>
                        <Td>{data.nama}</Td>
                    </Tr>
                    <Tr>
                        <Td>Tempat Lahir</Td>
                        <Td> : </Td>
                        <Td>{data.birth_place}</Td>
                    </Tr>
                    <Tr>
                        <Td>Tanggal Lahir</Td>
                        <Td> : </Td>
                        <Td>{data.birth_date}</Td>
                    </Tr>
                    <Tr>
                        <Td>Pukul</Td>
                        <Td> : </Td>
                        <Td>{data.jam}</Td>
                    </Tr>
                    <Tr>
                        <Td>Nama Ayah</Td>
                        <Td> : </Td>
                        <Td>{data.ayah.fullname}</Td>
                    </Tr>
                    <Tr>
                        <Td>Nama Ibu</Td>
                        <Td> : </Td>
                        <Td>{data.ibu.fullname}</Td>
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
                        <Td>Lampiran Buku Nikah</Td>
                        <Td>
                            <Link
                                color="teal.500"
                                href={BASE_IMAGE_URL + data.lampiran_buku_nikah}
                                isExternal
                            >
                                Lihat Dokumen
                            </Link>
                        </Td>
                    </Tr>
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
