import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    HStack,
    Icon,
    Input,
    Link,
    Select,
    SimpleGrid,
    Spacer,
    Switch,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import {
    NavLink,
    Redirect,
    useHistory,
    useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axiosClient from "axios-client";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import BillingInformation from "views/Dashboard/Billing/components/BillingInformation";
import Transactions from "views/Dashboard/Billing/components/Transactions";

function AparaturDesaForm() {
    const history = useHistory();
    const [positions, setProvinces] = useState([]);
    const [loading, setLoading] = useState(false);

    let { id } = useParams();
    const isEdit = id;

    const getDataProvinces = () => {
        setLoading(true);
        axiosClient
            .get("/v1/positions")
            .then(({ data }) => {
                setLoading(false);
                setProvinces(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getDataProvinces();
    }, []);

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (!isEdit) {
            createAparaturDesa(fields, setSubmitting);
        } else {
            updateAparaturDesa(fields, setSubmitting);
        }
    }

    function createAparaturDesa(fields, setSubmitting) {
        axiosClient
            .post("/v1/aparatur_desas", fields)
            .then((response) => {
                console.log(response);
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

    function updateAparaturDesa(fields, setSubmitting) {
        axiosClient
            .post("/v1/aparatur_desas/" + id, fields)
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

    const initialValues = {
        nip: "",
        nama: "",
    };

    const validationSchema = Yup.object().shape({
        nama: Yup.string().required("Nama is required"),
        nip: Yup.string().required("Nip is required"),
        jabatan_id: Yup.string().required("Jabatan is required"),
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
                {positions.map((province) => (
                    <option value={province.id}>{province.jabatan}</option>
                ))}
            </Select>
        );
    };

    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <Flex p="16px">
                    <Text fontSize="xl" fontWeight="bold" flex="1">
                        {!isEdit
                            ? "Tambah Aparatur Desa"
                            : "Edit Aparatur Desa"}
                    </Text>
                </Flex>
                <Formik
                    flex="1"
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({
                        errors,
                        touched,
                        isSubmitting,
                        setFieldValue,
                        handleChange,
                        values,
                    }) => {
                        const getDatas = (id) => {
                            axiosClient
                                .get("/v1/aparatur_desas/" + id)
                                .then(({ data }) => {
                                    const aparatur_desas = data.data;

                                    setLoading(false);
                                    const fields = ["nip", "name"];
                                    fields.forEach((field) => {
                                        setFieldValue(
                                            field,
                                            aparatur_desas[field],
                                            false
                                        );
                                    });
                                    setAparaturDesa(aparatur_desas);
                                })
                                .catch(() => {
                                    setLoading(false);
                                });
                        };

                        useEffect(() => {
                            if (isEdit) {
                                getDatas(id);
                            }
                        }, []);

                        return (
                            <Form flex="1">
                                <Flex direction="row" p="16px">
                                    <Flex direction="column" flex="1">
                                        <FormControl
                                            isInvalid={errors.nip}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                NIP
                                            </FormLabel>
                                            <Field
                                                placeholder="Kode Aparatur Desa"
                                                name="nip"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.nip}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.nama}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Nama
                                            </FormLabel>
                                            <Field
                                                placeholder="Nama"
                                                name="nama"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.nama}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={errors.jabatan_id}
                                            mb="32px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Jabatan
                                            </FormLabel>
                                            <Field
                                                name="jabatan_id"
                                                component={Selects}
                                            />

                                            <FormErrorMessage>
                                                {errors.jabatan_id}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Flex>
                                    <Flex flex="1" />
                                </Flex>
                                <Center>
                                    <Button
                                        fontSize="10px"
                                        fontWeight="bold"
                                        w="100px"
                                        h="45"
                                        mb="24px"
                                        onClick={() => {
                                            history.goBack();
                                        }}
                                        me="16px"
                                        variant="outline"
                                        colorScheme="teal"
                                    >
                                        BATAL
                                    </Button>
                                    <Button
                                        isLoading={isSubmitting}
                                        type="submit"
                                        bg="teal.300"
                                        fontSize="10px"
                                        color="white"
                                        fontWeight="bold"
                                        w="100px"
                                        h="45"
                                        mb="24px"
                                        _hover={{
                                            bg: "teal.200",
                                        }}
                                        _active={{
                                            bg: "teal.400",
                                        }}
                                    >
                                        SUBMIT
                                    </Button>
                                </Center>
                            </Form>
                        );
                    }}
                </Formik>
            </Card>
        </Flex>
    );
}

export default AparaturDesaForm;
