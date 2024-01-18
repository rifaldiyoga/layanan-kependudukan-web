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
import SearchSelect from "components/Select/SearchSelect";

function UserForm() {
    const history = useHistory();
    const [penduduks, setPenduduks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [kecamatans, setKecamatan] = useState([]);

    let { id } = useParams();
    const isEdit = id;

    const getKecamatan = (id) => {
        let params = id
            ? "/v1/subdistricts?district_id=" + id
            : "/v1/subdistricts";

        axiosClient
            .get(params)
            .then(({ data }) => {
                const penduduks = data.data.data;
                setKecamatan([]);
                setKecamatan(penduduks);
            })
            .catch(() => {});
    };

    const getDistrict = (id) => {
        let params = id ? "/v1/districts?province_id=" + id : "/v1/districts";
        console.log(params);
        axiosClient
            .get(params)
            .then(({ data }) => {
                const penduduks = data.data.data;
                setDistricts([]);
                setDistricts(penduduks);
            })
            .catch(() => {});
    };

    const getProvince = () => {
        axiosClient
            .get("/v1/provinces")
            .then(({ data }) => {
                const penduduks = data.data.data;

                setProvinces(penduduks);
            })
            .catch(() => {});
    };

    useEffect(() => {
        getProvince();
        // getKecamatan();
        getDistrict();
    }, []);

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();

        updateUser(fields, setSubmitting);
    }

    function updateUser(fields, setSubmitting) {
        axiosClient
            .post("/v1/sistems/1", fields)
            .then((response) => {
                if (response.status == 200) {
                    console.log(response);
                    alert("Berhasil Diperbarui");
                    setSubmitting(false);
                }
            })
            .catch((error) => {
                setSubmitting(false);
                console.log(error);
            });
    }

    const initialValues = {
        nama: "",
        code: "",
        alamat: "",
        telp: "",
        kode_pos: "",
    };

    const validationSchema = Yup.object().shape({
        nama: Yup.string().required("Nama is required"),
        code: Yup.string().required("Kode is required"),
        alamat: Yup.string().required("Alamat is required"),
        telp: Yup.string().required("Telp is required"),
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
                        Edit Setting Kelurahan
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
                                .get("/v1/sistems/1")
                                .then(({ data }) => {
                                    const sistem = data.data;
                                    console.log(sistem);
                                    setLoading(false);
                                    const fields = [
                                        "nama",
                                        "code",
                                        "alamat",
                                        "telp",
                                        "kode_pos",
                                        "district_id",
                                        "subdistrict_id",
                                        "province_id",
                                    ];
                                    getDistrict(sistem.province_id);
                                    getKecamatan(sistem.district_id);
                                    fields.forEach((field) => {
                                        setFieldValue(
                                            field,
                                            sistem[field],
                                            false
                                        );
                                    });
                                    setUser(sistem);
                                })
                                .catch(() => {
                                    setLoading(false);
                                });
                        };

                        useEffect(() => {
                            getDatas(id);
                        }, []);

                        return (
                            <Form flex="1">
                                <Flex direction="row" p="16px">
                                    <Flex direction="column" flex="1">
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
                                                placeholder="Email"
                                                name="code"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.code}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.telp}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Telpon Kelurahan
                                            </FormLabel>
                                            <Field
                                                placeholder="Email"
                                                name="telp"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.telp}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.alamat}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Alamat Kelurahan
                                            </FormLabel>
                                            <Field
                                                placeholder="Email"
                                                name="alamat"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.alamat}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.province_id}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Provinsi
                                            </FormLabel>
                                            <Field
                                                placeholder="Provinsi"
                                                name="province_id"
                                                onChange={(e) => {
                                                    getDistrict(e);
                                                }}
                                                options={provinces.map(
                                                    (data) => {
                                                        return {
                                                            value: data.id,
                                                            label: data.name,
                                                        };
                                                    }
                                                )}
                                                component={SearchSelect}
                                            />

                                            <FormErrorMessage>
                                                {errors.province_id}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={errors.district_id}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Kota
                                            </FormLabel>
                                            <Field
                                                placeholder="Kota"
                                                name="district_id"
                                                onChange={(e) => {
                                                    getKecamatan(e);
                                                }}
                                                options={districts.map(
                                                    (data) => {
                                                        return {
                                                            value: data.id,
                                                            label: data.name,
                                                        };
                                                    }
                                                )}
                                                component={SearchSelect}
                                            />

                                            <FormErrorMessage>
                                                {errors.district_id}
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
                                                placeholder="Kecamatan"
                                                name="subdistrict_id"
                                                options={kecamatans.map(
                                                    (data) => {
                                                        return {
                                                            value: data.id,
                                                            label: data.name,
                                                        };
                                                    }
                                                )}
                                                component={SearchSelect}
                                            />

                                            <FormErrorMessage>
                                                {errors.subdistrict_id}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={errors.kode_pos}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Kode Pos
                                            </FormLabel>
                                            <Field
                                                placeholder="Kode Pos"
                                                name="kode_pos"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.kode_pos}
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
