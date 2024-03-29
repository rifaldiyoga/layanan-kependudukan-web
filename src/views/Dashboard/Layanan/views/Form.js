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
    Textarea,
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

function LayananForm() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    let { id } = useParams();
    const isEdit = id;

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (!isEdit) {
            createLayanan(fields, setSubmitting);
        } else {
            updateLayanan(fields, setSubmitting);
        }
    }

    function createLayanan(fields, setSubmitting) {
        axiosClient
            .post("/v1/layanans", fields)
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

    function updateLayanan(fields, setSubmitting) {
        console.log(fields);
        axiosClient
            .post("/v1/layanans/" + id, fields)
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

    const InputTextAreas = ({ field, form, ...props }) => {
        return (
            <Textarea
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
                <option value="LU">Layanan Umum</option>
                <option value="LP">Layanan Pindah</option>
                <option value="LN">Layanan Nikah</option>
                <option value="LKK">Layanan Kelahiran & Kematian</option>
                <option value="LT">Layanan Pertanahan</option>
            </Select>
        );
    };

    const Switchs = ({ field, form, ...props }) => {
        return (
            <Switch
                id="is_confirm"
                name="is_confirm"
                value={field.value}
                isChecked={field.value}
                onChange={(event) => {
                    form.setFieldValue("is_confirm", event.target.checked);
                }}
            />
        );
    };

    const SwitchSigns = ({ field, form, ...props }) => {
        return (
            <Switch
                id="is_sign"
                name="is_sign"
                value={field.value}
                isChecked={field.value}
                onChange={(event) => {
                    form.setFieldValue("is_sign", event.target.checked);
                }}
            />
        );
    };

    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <Flex p="16px">
                    <Text fontSize="xl" fontWeight="bold" flex="1">
                        {!isEdit ? "Tambah Layanan" : "Edit Layanan"}
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
                                .get("/v1/layanans/" + id)
                                .then(({ data }) => {
                                    const layanans = data.data;

                                    setLoading(false);
                                    const fields = [
                                        "code",
                                        "name",
                                        "type",
                                        "kode_surat",
                                        "is_confirm",
                                        "is_sign",
                                        "info",
                                    ];
                                    fields.forEach((field) => {
                                        setFieldValue(
                                            field,
                                            layanans[field],
                                            false
                                        );
                                    });
                                    setLayanan(layanans);
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
                                                Kode Layanan
                                            </FormLabel>
                                            <Field
                                                placeholder="Kode Layanan"
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
                                                Nama Layanan
                                            </FormLabel>
                                            <Field
                                                placeholder="Nama Layanan"
                                                name="name"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.name}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={errors.kode_surat}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Kode Surat
                                            </FormLabel>
                                            <Field
                                                placeholder="Kode Surat"
                                                name="kode_surat"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.kode_surat}
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
                                                Tipe Layanan
                                            </FormLabel>
                                            <Field
                                                name="type"
                                                component={Selects}
                                            />

                                            <FormErrorMessage>
                                                {errors.type}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={errors.info}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Informasi Layanan
                                            </FormLabel>
                                            <Field
                                                placeholder="Informasi Layanan"
                                                name="info"
                                                height="200px"
                                                component={InputTextAreas}
                                            />

                                            <FormErrorMessage>
                                                {errors.info}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={errors.is_confirm}
                                            mb="32px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Konfirmasi RT & RW
                                            </FormLabel>
                                            <Field
                                                name="is_confirm"
                                                component={Switchs}
                                            />

                                            <FormErrorMessage>
                                                {errors.is_confirm}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={errors.is_sign}
                                            mb="32px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Tanda Tangan Lurah
                                            </FormLabel>
                                            <Field
                                                name="is_sign"
                                                component={SwitchSigns}
                                            />

                                            <FormErrorMessage>
                                                {errors.is_sign}
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

export default LayananForm;
