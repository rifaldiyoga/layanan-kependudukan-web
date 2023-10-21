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

function EducationForm() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    let { id } = useParams();
    const isEdit = id;

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (!isEdit) {
            createEducation(fields, setSubmitting);
        } else {
            updateEducation(fields, setSubmitting);
        }
    }

    function createEducation(fields, setSubmitting) {
        axiosClient
            .post("/v1/educations", fields)
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

    function updateEducation(fields, setSubmitting) {
        axiosClient
            .post("/v1/educations/" + id, fields)
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
        name: Yup.string().required("Nama layanan is required"),
        code: Yup.string().required("Kode layanan is required"),
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

    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <Flex p="16px">
                    <Text fontSize="xl" fontWeight="bold" flex="1">
                        {!isEdit ? "Tambah Education" : "Edit Education"}
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
                                .get("/v1/educations/" + id)
                                .then(({ data }) => {
                                    const educations = data.data;

                                    setLoading(false);
                                    const fields = ["code", "name"];
                                    fields.forEach((field) => {
                                        setFieldValue(
                                            field,
                                            educations[field],
                                            false
                                        );
                                    });
                                    setEducation(educations);
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
                                                Kode Education
                                            </FormLabel>
                                            <Field
                                                placeholder="Kode Education"
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
                                                Nama Education
                                            </FormLabel>
                                            <Field
                                                placeholder="Nama Education"
                                                name="name"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.name}
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

export default EducationForm;
