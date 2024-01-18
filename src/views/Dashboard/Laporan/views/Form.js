import {
    AbsoluteCenter,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
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
    useDisclosure,
} from "@chakra-ui/react";
import axiosClient from "axios-client";
import StatusBadge from "components/Badge/StatusBadge";
import Card from "components/Card/Card.js";
import { BelumMenikahDetail } from "components/Pengajuans/BelumMenikahDetail";
import { BerpergianDetail } from "components/Pengajuans/BerpergianDetail";
import { DomisiliDetail } from "components/Pengajuans/DomisiliDetail";
import { JandaDetail } from "components/Pengajuans/JandaDetail";
import { KelahiranDetail } from "components/Pengajuans/KelahiranDetail";
import { KematianDetail } from "components/Pengajuans/KematianDetail";
import { KepolisianDetail } from "components/Pengajuans/KepolisianDetail";
import { KeramaianDetail } from "components/Pengajuans/KeramaianDetail";
import { PenghasilanDetail } from "components/Pengajuans/PenghasilanDetail";
import { PernahNikahDetail } from "components/Pengajuans/PernahNikahDetail";
import { PindahDetail } from "components/Pengajuans/PindahDetail";
import { RumahDetail } from "components/Pengajuans/RumahDetail";
import { SKUDetail } from "components/Pengajuans/SKUDetail";
import { TanahDetail } from "components/Pengajuans/TanahDetail";
import React, { useEffect, useState } from "react";
import {
    useHistory,
    useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import * as Yup from "yup";

function PengajuanForm() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [pengajuans, setPengajuan] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isOpenReject, setOpenReject] = useState(false);
    const initialRef = React.useRef();

    let { id } = useParams();
    const isEdit = id;

    const link = () => {
        switch (pengajuans.code) {
            case "SKBPN":
                return "belum_menikahs";
            case "SKBBK":
                return "berpergians";
            case "SKD":
                return "domisilis";
            case "SKJD":
                return "jandas";
            case "SKKM":
                return "kematians";
            case "SPCK":
                return "kepolisians";
            case "SKPOT":
                return "penghasilans";
            case "SKPN":
                return "pernah_menikahs";
            case "SKPD":
                return "pindahs";
            case "SKPK":
                return "pindahs";
            case "SKTM":
                return "sktms";
            case "SKKH":
                return "kelahirans";
            case "SIK":
                return "keramaians";
            case "SKU":
                return "skus";
            case "SKTMR":
                return "rumahs";
            case "SPORADIK":
                return "tanahs";
            case "SKKT":
                return "tanahs";
        }
    };

    const Detail = () => {
        switch (pengajuans.code) {
            case "SKBM":
                return <BelumMenikahDetail pengajuans={pengajuans.ref_id} />;
            case "SKBBK":
                return <BerpergianDetail pengajuans={pengajuans.ref_id} />;
            case "SKD":
                return <DomisiliDetail pengajuans={pengajuans.ref_id} />;
            case "SKJD":
                return <JandaDetail pengajuans={pengajuans.ref_id} />;
            case "SKKM":
                return <KematianDetail pengajuans={pengajuans.ref_id} />;
            case "SKCK":
                return <KepolisianDetail pengajuans={pengajuans.ref_id} />;
            case "SKPOT":
                return <PenghasilanDetail pengajuans={pengajuans.ref_id} />;
            case "SKPN":
                return <PernahNikahDetail pengajuans={pengajuans.ref_id} />;
            case "SKPD":
                return <PindahDetail pengajuans={pengajuans.ref_id} />;
            case "SKPK":
                return <PindahDetail pengajuans={pengajuans.ref_id} />;
            case "SKKH":
                return <KelahiranDetail pengajuans={pengajuans.ref_id} />;
            case "SPORADIK":
                return <TanahDetail pengajuans={pengajuans.ref_id} />;
            case "SKKT":
                return <TanahDetail pengajuans={pengajuans.ref_id} />;
            case "SKU":
                return <SKUDetail pengajuans={pengajuans.ref_id} />;
            case "SKTMR":
                return <RumahDetail pengajuans={pengajuans.ref_id} />;
            case "SIK":
                return <KeramaianDetail pengajuans={pengajuans.ref_id} />;
            default:
                return <></>;
        }
    };

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
                    if (s == "VALID") {
                        onOpen();
                    } else {
                        history.goBack();
                    }
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
                                    <Text
                                        fontSize="l"
                                        fontWeight="bold"
                                        flex="1"
                                        mt="16px"
                                    >
                                        Detail Pengajuan
                                    </Text>
                                    <Detail />
                                </Flex>
                                {pengajuans.status != "VALID" &&
                                pengajuans.status != "REJECTED" ? (
                                    <Center>
                                        <Button
                                            fontSize="10px"
                                            fontWeight="bold"
                                            w="100px"
                                            h="45"
                                            mb="24px"
                                            onClick={() => {
                                                setOpenReject(true);
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
                                ) : (
                                    <></>
                                )}
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
                                                <Td>{data.note}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                )}
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Berhasil Update Pengajuan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Lanjut Print Pengajuan?</ModalBody>
                    <ModalFooter>
                        <Button
                            mr={3}
                            variant="ghost"
                            onClick={() => {
                                onClose();
                                history.goBack();
                            }}
                        >
                            Tidak
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                onClose();
                                history.push(
                                    "/admin/" + link() + "/" + pengajuans.ref_id
                                );
                            }}
                        >
                            Lanjut
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isOpenReject}
                onClose={() => {
                    setOpenReject(false);
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Tolak Pengajuan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Alasan Tolak</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="Masukkan Alasan"
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => {
                                setOpenReject(false);
                            }}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                const fields = {
                                    ...pengajuans,
                                    note: initialRef.current.value,
                                };
                                updatePengajuan(fields, "REJECTED");
                                setOpenReject(false);
                            }}
                        >
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default PengajuanForm;
