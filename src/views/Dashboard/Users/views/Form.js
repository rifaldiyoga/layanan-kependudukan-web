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

function UserForm() {
    const history = useHistory();
    const [penduduks, setPenduduks] = useState([]);
    const [loading, setLoading] = useState(false);

    let { id } = useParams();
    const isEdit = id;

    const getDataProvinces = () => {
        setLoading(true);
        axiosClient
            .get("/v1/penduduks")
            .then(({ data }) => {
                setLoading(false);
                setPenduduks(data.data.data);
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
            createUser(fields, setSubmitting);
        } else {
            updateUser(fields, setSubmitting);
        }
    }

    function createUser(fields, setSubmitting) {
        axiosClient
            .post("/v1/users", fields)
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

    function updateUser(fields, setSubmitting) {
        axiosClient
            .post("/v1/users/" + id, fields)
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
        name: "",
        email: "",
        password: "",
        role: "",
        nik: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Nama User is required"),
        email: Yup.string().required("Email is required"),
        role: Yup.string().required("Role is required"),
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
                options={props.datas}
            >
                <option>Pilih {props.hint}</option>
                {props.datas.map((data) => (
                    <option value={data.value}>{data.title}</option>
                ))}
            </Select>
        );
    };

    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <Flex p="16px">
                    <Text fontSize="xl" fontWeight="bold" flex="1">
                        {!isEdit ? "Tambah User" : "Edit User"}
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
                                .get("/v1/users/" + id)
                                .then(({ data }) => {
                                    const users = data.data;
                                    console.log(users);
                                    setLoading(false);
                                    const fields = [
                                        "name",
                                        "email",
                                        "role",
                                        "nik",
                                    ];
                                    fields.forEach((field) => {
                                        setFieldValue(
                                            field,
                                            users[field],
                                            false
                                        );
                                    });
                                    setUser(users);
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
                                            isInvalid={errors.name}
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
                                                name="name"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.name}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.email}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Email
                                            </FormLabel>
                                            <Field
                                                placeholder="Email"
                                                name="email"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.email}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={errors.password}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Password
                                            </FormLabel>
                                            <Field
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.password}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.role}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Role User
                                            </FormLabel>
                                            <Field
                                                datas={[
                                                    {
                                                        value: "ADMIN",
                                                        title: "Admin",
                                                    },
                                                    {
                                                        value: "KECAMATAN",
                                                        title: "Kecamatan",
                                                    },
                                                    {
                                                        value: "KELURAHAN",
                                                        title: "Kelurahan",
                                                    },
                                                    {
                                                        value: "RT",
                                                        title: "RT",
                                                    },
                                                    {
                                                        value: "RW",
                                                        title: "RW",
                                                    },

                                                    {
                                                        value: "PENDUDUK",
                                                        title: "Penduduk",
                                                    },
                                                ]}
                                                hint="Role User"
                                                name="role"
                                                component={Selects}
                                            />

                                            <FormErrorMessage>
                                                {errors.role}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.nik}
                                            mb="32px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Relasi User
                                            </FormLabel>
                                            <Field
                                                hint="Relasi Penduduk"
                                                datas={penduduks.map((data) => {
                                                    return {
                                                        value: data.nik,
                                                        title:
                                                            data.nik +
                                                            " - " +
                                                            data.fullname,
                                                    };
                                                })}
                                                name="nik"
                                                component={Selects}
                                            />

                                            <FormErrorMessage>
                                                {errors.nik}
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

export default UserForm;
