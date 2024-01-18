import {
    Button,
    Flex,
    Input,
    Link,
    Select,
    Table,
    Tbody,
    Td,
    Text,
    Tr,
} from "@chakra-ui/react";
import axiosClient from "axios-client";
import Card from "components/Card/Card.js";
import { DocumentIcon } from "components/Icons/Icons";
import { RumahDetail } from "components/Pengajuans/RumahDetail";
import { BASE_IMAGE_URL } from "constants";
import { statusNikah } from "constants";
import Helper from "helper/Helper";
import { useEffect, useState } from "react";
import { BsPrinter } from "react-icons/bs";
import {
    NavLink,
    useHistory,
    useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import * as Yup from "yup";

function RumahForm() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [penduduks, setPenduduk] = useState([]);
    const [rumahs, setRumah] = useState(null);

    let { id } = useParams();
    const isEdit = id;

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (!isEdit) {
            createRumah(fields, setSubmitting);
        } else {
            updateRumah(fields, setSubmitting);
        }
    }

    function createRumah(fields, setSubmitting) {
        axiosClient
            .post("/v1/rumahs", fields)
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

    function updateRumah(fields, setSubmitting) {
        axiosClient
            .post("/v1/rumahs/" + id, fields)
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
            .get("/v1/rumahs/" + id)
            .then(({ data }) => {
                const rumahs = data.data;
                console.log(rumahs);
                setLoading(false);

                setRumah(rumahs);
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
                <option value="LU">Rumah Umum</option>
                <option value="LP">Rumah Pindah</option>
                <option value="LN">Rumah Nikah</option>
                <option value="LKK">Rumah Rumah & Kematian</option>
            </Select>
        );
    };

    return rumahs ? (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <Flex p="16px">
                    <Text fontSize="xl" fontWeight="bold" flex="1">
                        Detail Rumah
                    </Text>
                    <NavLink to={"/surat/rumahs/" + id} target="_blank">
                        <Button
                            leftIcon={<BsPrinter />}
                            colorScheme="pink"
                            variant="solid"
                        >
                            Print
                        </Button>
                    </NavLink>
                </Flex>
                <Flex p="16px" direction="column">
                    {/* <Text fontSize="l" fontWeight="bold" flex="1">
                        Biodata Pengaju
                    </Text>
                    <Table mt="16px" p="0px">
                        <Tbody>
                            <Tr>
                                <Td w="15%">NIK</Td>
                                <Td w="5%"> : </Td>
                                <Td>{rumahs.penduduk.nik}</Td>
                            </Tr>
                            <Tr>
                                <Td>Nama Pengaju</Td>
                                <Td> : </Td>
                                <Td>{rumahs.penduduk.fullname}</Td>
                            </Tr>
                        </Tbody>
                    </Table> */}
                    <Table p="0px" mt="16px">
                        <Tbody>
                            <Tr>
                                <Td w="15%">Kode Surat</Td>
                                <Td w="3%"> : </Td>
                                <Td>{rumahs.kode_surat}</Td>
                            </Tr>
                            <Tr>
                                <Td>Keterangan</Td>
                                <Td> : </Td>
                                <Td>{rumahs.keterangan}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Text fontWeight={"bold"} mt="16px">
                        Detail Penduduk
                    </Text>
                    <Table p="0px" mt="16px">
                        <Tr p={8}>
                            <Td w="15%">Nama</Td>
                            <Td w="3%">:</Td>
                            <Td style={{ fontWeight: "bold" }}>
                                {" "}
                                {rumahs.penduduk.fullname.toUpperCase()}
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>NIK</Td>
                            <Td>:</Td>
                            <Td>{rumahs.penduduk.nik}</Td>
                        </Tr>
                        <Tr>
                            <Td>Jenis Kelamin</Td>
                            <Td>:</Td>
                            <Td>
                                {rumahs.penduduk.jk == "L"
                                    ? "Laki - Laki"
                                    : "Perempuan"}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>Tempat / Tanggal Lahir</Td>
                            <Td>:</Td>
                            <Td>
                                {Helper.capitalizeFirstLetter(
                                    rumahs.penduduk.birth_place
                                )}
                                ,{" "}
                                {Helper.formatDate(rumahs.penduduk.birth_date)}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>Agama</Td>
                            <Td>:</Td>
                            <Td>
                                {Helper.capitalizeFirstLetter(
                                    rumahs.penduduk.religion.name
                                )}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>Pekerjaan</Td>
                            <Td>:</Td>
                            <Td>{rumahs.penduduk.job.name}</Td>
                        </Tr>
                        <Tr>
                            <Td>Status Perkawinan</Td>
                            <Td>:</Td>
                            <Td>
                                {
                                    statusNikah.find((obj) => {
                                        console.log(obj);
                                        return (
                                            obj.value ===
                                            rumahs.penduduk.maried_type
                                        );
                                    }).label
                                }
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>Kewarganegaraan</Td>
                            <Td>:</Td>
                            <Td>{rumahs.penduduk.nationality}</Td>
                        </Tr>
                        <Tr>
                            <Td>Alamat</Td>
                            <Td>:</Td>
                            <Td>
                                <text lineHeight={1.5}>
                                    {Helper.capitalizeFirstLetter(
                                        rumahs.penduduk.address
                                    )}{" "}
                                    RT {rumahs.penduduk.rt.name} / RW{" "}
                                    {rumahs.penduduk.rw.name} <br />
                                    {
                                        rumahs.penduduk.kelurahan.name
                                    } Kecamatan{" "}
                                    {Helper.capitalizeFirstLetter(
                                        rumahs.penduduk.kecamatan.name
                                    )}{" "}
                                    {Helper.capitalizeFirstLetter(
                                        rumahs.penduduk.kota.name
                                    )}{" "}
                                    {Helper.capitalizeFirstLetter(
                                        rumahs.penduduk.provinsi.name
                                    )}
                                </text>
                            </Td>
                        </Tr>
                    </Table>

                    <Text fontSize="l" fontWeight="bold" flex="1" mt="16px">
                        Detail Pengajuan
                    </Text>
                    <RumahDetail pengajuans={id} />
                </Flex>
            </Card>
        </Flex>
    ) : (
        <Flex></Flex>
    );
}

export default RumahForm;
