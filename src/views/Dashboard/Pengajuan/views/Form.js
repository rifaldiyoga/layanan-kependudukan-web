import {
    Button,
    Center,
    Flex,
    Input,
    Select,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Table,
    Tabs,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import axiosClient from "axios-client";
import StatusBadge from "components/Badge/StatusBadge";
import Card from "components/Card/Card.js";
import { useEffect, useState } from "react";
import {
    useHistory,
    useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import * as Yup from "yup";

function PengajuanForm() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [pengajuans, setPengajuan] = useState(false);

    let { id } = useParams();
    const isEdit = id;

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (!isEdit) {
            createPengajuan(fields, setSubmitting);
        } else {
            updatePengajuan(fields, setSubmitting);
        }
    }

    function createPengajuan(fields, setSubmitting) {
        axiosClient
            .post("/v1/pengajuans", fields)
            .then((response) => {
                if (response.status == 200) {
                    console.log(response);
                    history.goBack();
                }
            })
            .catch((error) => {
                setSubmitting(false);
                console.log(error);
            });
    }

    function updatePengajuan(fields, s) {
        const field = { ...fields, status: s };
        axiosClient
            .post("/v1/pengajuans/" + id, field)
            .then((response) => {
                if (response.status == 200) {
                    console.log(response);
                    history.goBack();
                }
            })
            .catch((error) => {
                setSubmitting(false);
                console.log(error);
            });
    }

    const getDatas = (id) => {
        axiosClient
            .get("/v1/pengajuans/" + id)
            .then(({ data }) => {
                const pengajuans = data.data;
                console.log(pengajuans);

                setPengajuan(pengajuans);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getDatas(id);
    }, []);

    const initialValues = {
        type: "",
        name: "",
        type: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Nama layanan is required"),
        code: Yup.string().required("Kode layanan is required"),
        type: Yup.string().required("Tipe layanan is required"),
    });
    const Inputs = ({ field, form, ...props }) => {
        return (
            <Input
                {...field}
                {...props}
                borderRadius="15px"
                fontSize="sm"
                size="lg"
            />
        );
    };

    const Selects = ({ field, form, ...props }) => {
        return (
            <Select
                {...field}
                {...props}
                size="lg"
                borderRadius="15px"
                fontSize="sm"
            >
                <option value="LU">Pengajuan Umum</option>
                <option value="LP">Pengajuan Pindah</option>
                <option value="LN">Pengajuan Nikah</option>
                <option value="LKK">Pengajuan Kelahiran & Kematian</option>
            </Select>
        );
    };

    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <Flex p="16px">
                    <Text fontSize="xl" fontWeight="bold" flex="1">
                        Detail Pengajuan
                    </Text>
                </Flex>

                {pengajuans && (
                    <Tabs flex="1">
                        <TabList>
                            <Tab>Pengajuan</Tab>
                            <Tab>Timeline</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Flex p="16px" direction="column">
                                    <Text
                                        fontSize="l"
                                        fontWeight="bold"
                                        flex="1"
                                    >
                                        Biodata Pengaju
                                    </Text>
                                    <Table mt="16px" p="0px">
                                        <Tbody>
                                            <Tr>
                                                <Td w="15%">NIK</Td>
                                                <Td w="2%"> : </Td>
                                                <Td>
                                                    {pengajuans.penduduk.nik}
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Nama Pengaju</Td>
                                                <Td> : </Td>
                                                <Td>
                                                    {
                                                        pengajuans.penduduk
                                                            .fullname
                                                    }
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Alamat</Td>
                                                <Td> : </Td>
                                                <Td>
                                                    {
                                                        pengajuans.penduduk
                                                            .address
                                                    }
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>RT / RW</Td>
                                                <Td> : </Td>
                                                <Td>
                                                    {pengajuans.penduduk.rt_id}{" "}
                                                    /{" "}
                                                    {pengajuans.penduduk.rw_id}
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>

                                    <Text
                                        fontSize="l"
                                        fontWeight="bold"
                                        flex="1"
                                        mt="16px"
                                    >
                                        Pengajuan
                                    </Text>
                                    <Table p="0px" mt="16px">
                                        <Tbody>
                                            <Tr>
                                                <Td w="15%">Jenis Pengajuan</Td>
                                                <Td w="2%"> : </Td>
                                                <Td>{pengajuans.layanan}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Keterangan</Td>
                                                <Td> : </Td>
                                                <Td>{pengajuans.keterangan}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Status</Td>
                                                <Td> : </Td>
                                                <Td>
                                                    <StatusBadge
                                                        status={
                                                            pengajuans.status
                                                        }
                                                    />
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </Flex>
                                <Center>
                                    <Button
                                        fontSize="10px"
                                        fontWeight="bold"
                                        w="100px"
                                        h="45"
                                        mb="24px"
                                        onClick={() => {
                                            updatePengajuan(
                                                pengajuans,
                                                "REJECTED"
                                            );
                                        }}
                                        me="16px"
                                        variant="outline"
                                        colorScheme="teal"
                                    >
                                        TOLAK
                                    </Button>
                                    <Button
                                        type="submit"
                                        bg="teal.300"
                                        fontSize="10px"
                                        color="white"
                                        fontWeight="bold"
                                        w="100px"
                                        h="45"
                                        onClick={() => {
                                            updatePengajuan(
                                                pengajuans,
                                                "VALID"
                                            );
                                        }}
                                        mb="24px"
                                        _hover={{
                                            bg: "teal.200",
                                        }}
                                        _active={{
                                            bg: "teal.400",
                                        }}
                                    >
                                        SETUJUI
                                    </Button>
                                </Center>
                            </TabPanel>

                            <TabPanel>
                                <Table variant="striped">
                                    <Thead>
                                        <Tr>
                                            <Th>Tanggal</Th>
                                            <Th>Status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {pengajuans.detail.map((data) => (
                                            <Tr>
                                                <Td>{data.created_at}</Td>
                                                <Td>{data.status}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                )}
            </Card>
        </Flex>
    );
}

export default PengajuanForm;
