import {
    Box,
    Button,
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

function KematianForm() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    let { id } = useParams();
    const isEdit = id;

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (!isEdit) {
            createKematian(fields, setSubmitting);
        } else {
            updateKematian(fields, setSubmitting);
        }
    }

    function createKematian(fields, setSubmitting) {
        axiosClient
            .post("/v1/kematians", fields)
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

    function updateKematian(fields, setSubmitting) {
        axiosClient
            .post("/v1/kematians/" + id, fields)
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
                <option value="LU">Kematian Umum</option>
                <option value="LP">Kematian Pindah</option>
                <option value="LN">Kematian Nikah</option>
                <option value="LKK">Kematian Kelahiran & Kematian</option>
            </Select>
        );
    };

    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <Flex p="16px">
                    <Text fontSize="xl" fontWeight="bold" flex="1">
                        {!isEdit ? "Tambah Kematian" : "Edit Kematian"}
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
                                .get("/v1/kematians/" + id)
                                .then(({ data }) => {
                                    const kematians = data.data;

                                    setLoading(false);
                                    const fields = ["code", "name", "type"];
                                    fields.forEach((field) => {
                                        setFieldValue(
                                            field,
                                            kematians[field],
                                            false
                                        );
                                    });
                                    setKematian(kematians);
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
                                                Kode Kematian
                                            </FormLabel>
                                            <Field
                                                placeholder="Kode Kematian"
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
                                                Nama Kematian
                                            </FormLabel>
                                            <Field
                                                placeholder="Nama Kematian"
                                                name="name"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.name}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={errors.type}
                                            mb="32px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Tipe Kematian
                                            </FormLabel>
                                            <Field
                                                name="type"
                                                component={Selects}
                                            />

                                            <FormErrorMessage>
                                                {errors.type}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <Button
                                            isLoading={isSubmitting}
                                            type="submit"
                                            bg="teal.300"
                                            fontSize="10px"
                                            color="white"
                                            fontWeight="bold"
                                            w="100%"
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
                                    </Flex>
                                    <Flex flex="1" />
                                </Flex>
                            </Form>
                        );
                    }}
                </Formik>
            </Card>
        </Flex>
    );
}

export default KematianForm;
