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

export const BelumMenikahDetail = ({ pengajuans }) => {
    const [data, setData] = useState();

    const getDatas = (id) => {
        axiosClient
            .get("/v1/belum_menikahs/" + id)
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
