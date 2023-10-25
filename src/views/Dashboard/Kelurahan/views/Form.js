import {
    Button,
    Center,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Text,
} from "@chakra-ui/react";
import axiosClient from "axios-client";
import Card from "components/Card/Card.js";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {
    useHistory,
    useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import * as Yup from "yup";

function KelurahanForm() {
    const history = useHistory();
    const [subkelurahans, setProvinces] = useState([]);
    const [loading, setLoading] = useState(false);

    let { id } = useParams();
    const isEdit = id;

    const getDataProvinces = () => {
        setLoading(true);
        axiosClient
            .get("/v1/subdistricts")
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
            createKelurahan(fields, setSubmitting);
        } else {
            updateKelurahan(fields, setSubmitting);
        }
    }

    function createKelurahan(fields, setSubmitting) {
        axiosClient
            .post("/v1/kelurahans", fields)
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

    function updateKelurahan(fields, setSubmitting) {
        axiosClient
            .post("/v1/kelurahans/" + id, fields)
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
        code: "",
        name: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Nama Kelurahan is required"),
        code: Yup.string().required("Kode Kelurahan is required"),
        kecamatan_id: Yup.string().required("Kecamatan is required"),
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
                {subkelurahans.map((province) => (
                    <option value={province.id}>{province.name}</option>
                ))}
            </Select>
        );
    };

    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <Flex p="16px">
                    <Text fontSize="xl" fontWeight="bold" flex="1">
                        {!isEdit ? "Tambah Kelurahan" : "Edit Kelurahan"}
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
                                .get("/v1/kelurahans/" + id)
                                .then(({ data }) => {
                                    const kelurahans = data.data;

                                    setLoading(false);
                                    const fields = ["code", "name"];
                                    fields.forEach((field) => {
                                        setFieldValue(
                                            field,
                                            kelurahans[field],
                                            false
                                        );
                                    });
                                    setKelurahan(kelurahans);
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
                                            isInvalid={errors.code}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Kode Kelurahan
                                            </FormLabel>
                                            <Field
                                                placeholder="Kode Kelurahan"
                                                name="code"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.code}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.name}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Nama Kelurahan
                                            </FormLabel>
                                            <Field
                                                placeholder="Nama Kelurahan"
                                                name="name"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.name}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={errors.kecamatan_id}
                                            mb="32px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Kecamatan
                                            </FormLabel>
                                            <Field
                                                name="kecamatan_id"
                                                component={Selects}
                                            />

                                            <FormErrorMessage>
                                                {errors.kecamatan_id}
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

export default KelurahanForm;
