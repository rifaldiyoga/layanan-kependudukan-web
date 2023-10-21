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

function KeluargaForm() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [kelurahans, setKelurahan] = useState([]);
    const [subdistricts, setKecamatan] = useState([]);
    const [rts, setRt] = useState([]);
    const [rws, setRw] = useState([]);

    let { id } = useParams();
    const isEdit = id;

    const getRt = () => {
        axiosClient
            .get("/v1/rts")
            .then(({ data }) => {
                const penduduks = data.data.data;

                setRt(penduduks);
            })
            .catch(() => {});
    };

    const getRw = () => {
        axiosClient
            .get("/v1/rws")
            .then(({ data }) => {
                const penduduks = data.data.data;

                setRw(penduduks);
            })
            .catch(() => {});
    };

    const getKelurahan = () => {
        axiosClient
            .get("/v1/kelurahans")
            .then(({ data }) => {
                const penduduks = data.data.data;

                setKelurahan(penduduks);
            })
            .catch(() => {});
    };

    const getKecamatan = () => {
        axiosClient
            .get("/v1/subdistricts")
            .then(({ data }) => {
                const penduduks = data.data.data;
                console.log(penduduks);
                setKecamatan(penduduks);
            })
            .catch(() => {});
    };

    useEffect(() => {
        getRt();
        getRw();
        getKelurahan();
        getKecamatan();
    }, []);

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (!isEdit) {
            createKeluarga(fields, setSubmitting);
        } else {
            updateKeluarga(fields, setSubmitting);
        }
    }

    function createKeluarga(fields, setSubmitting) {
        axiosClient
            .post("/v1/keluargas", fields)
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

    function updateKeluarga(fields, setSubmitting) {
        axiosClient
            .post("/v1/keluargas/" + id, fields)
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
                options={props.datas}
            >
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
                        {!isEdit ? "Tambah Keluarga" : "Edit Keluarga"}
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
                                .get("/v1/keluargas/" + id)
                                .then(({ data }) => {
                                    const keluargas = data.data;

                                    setLoading(false);
                                    const fields = ["code", "name", "type"];
                                    fields.forEach((field) => {
                                        setFieldValue(
                                            field,
                                            keluargas[field],
                                            false
                                        );
                                    });
                                    setKeluarga(keluargas);
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
                                    <Flex flex="1" direction="column">
                                        <FormControl
                                            isInvalid={errors.nik}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                No. Kartu Keluarga
                                            </FormLabel>
                                            <Field
                                                type="disabled"
                                                placeholder="No. Kartu Keluarga"
                                                name="nik"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.nik}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={errors.nik}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Alamat
                                            </FormLabel>
                                            <Field
                                                type="disabled"
                                                placeholder="Alamat"
                                                name="nik"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.nik}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <HStack spacing="16px" mb="16px">
                                            <FormControl
                                                isInvalid={errors.rw_id}
                                            >
                                                <FormLabel
                                                    ms="4px"
                                                    fontSize="sm"
                                                    fontWeight="normal"
                                                >
                                                    RW
                                                </FormLabel>
                                                <Field
                                                    name="rw_id"
                                                    datas={rws.map((data) => {
                                                        return {
                                                            value: data.id,
                                                            title: data.name,
                                                        };
                                                    })}
                                                    component={Selects}
                                                />

                                                <FormErrorMessage>
                                                    {errors.rw_id}
                                                </FormErrorMessage>
                                            </FormControl>
                                            <FormControl
                                                isInvalid={errors.rt_id}
                                            >
                                                <FormLabel
                                                    ms="4px"
                                                    fontSize="sm"
                                                    fontWeight="normal"
                                                >
                                                    RT
                                                </FormLabel>
                                                <Field
                                                    name="rt_id"
                                                    datas={rts.map((data) => {
                                                        return {
                                                            value: data.id,
                                                            title: data.name,
                                                        };
                                                    })}
                                                    component={Selects}
                                                />

                                                <FormErrorMessage>
                                                    {errors.rt_id}
                                                </FormErrorMessage>
                                            </FormControl>
                                        </HStack>

                                        <FormControl
                                            isInvalid={errors.kelurahan_id}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Kelurahan
                                            </FormLabel>
                                            <Field
                                                name="kelurahan_id"
                                                datas={kelurahans.map(
                                                    (data) => {
                                                        return {
                                                            value: data.id,
                                                            title: data.name,
                                                        };
                                                    }
                                                )}
                                                component={Selects}
                                            />

                                            <FormErrorMessage>
                                                {errors.kelurahan_id}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.subdistrict_id}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Kecamatan
                                            </FormLabel>
                                            <Field
                                                name="subdistrict_id"
                                                datas={subdistricts.map(
                                                    (data) => {
                                                        return {
                                                            value: data.id,
                                                            title: data.name,
                                                        };
                                                    }
                                                )}
                                                component={Selects}
                                            />

                                            <FormErrorMessage>
                                                {errors.subdistrict_id}
                                            </FormErrorMessage>
                                        </FormControl>
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

export default KeluargaForm;
