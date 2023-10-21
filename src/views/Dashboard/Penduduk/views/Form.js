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
    SimpleGrid,
    Spacer,
    Stack,
    Switch,
    Text,
    Select,
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

function PendudukForm() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [religions, setReligions] = useState([]);
    const [educations, setEducations] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [kelurahans, setKelurahan] = useState([]);
    const [kecamatans, setKecamatan] = useState([]);
    const [rts, setRt] = useState([]);
    const [rws, setRw] = useState([]);

    let { id } = useParams();
    const isEdit = id;

    const getReligion = () => {
        axiosClient
            .get("/v1/religions")
            .then(({ data }) => {
                const penduduks = data.data.data;
                setReligions(penduduks);
            })
            .catch(() => {});
    };

    const getEducation = () => {
        axiosClient
            .get("/v1/educations")
            .then(({ data }) => {
                const penduduks = data.data.data;

                setEducations(penduduks);
            })
            .catch(() => {});
    };

    const getJob = () => {
        axiosClient
            .get("/v1/jobs")
            .then(({ data }) => {
                const penduduks = data.data.data;
                setJobs(penduduks);
            })
            .catch(() => {});
    };

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

    const getDistrict = () => {
        axiosClient
            .get("/v1/districts")
            .then(({ data }) => {
                const penduduks = data.data.data;

                setDistricts(penduduks);
            })
            .catch(() => {});
    };

    useEffect(() => {
        getKecamatan();
        getReligion();
        getEducation();
        getDistrict();
        getJob();
        getRt();
        getRw();
        getKelurahan();
    }, []);

    function onSubmit(fields, { setStatus, setSubmitting }) {
        const data = {
            ...fields,
            religion_id: parseInt(fields.religion_id),
            job_id: parseInt(fields.job_id),
            education_id: parseInt(fields.education_id),
            education_id: parseInt(fields.education_id),
            rt_id: parseInt(fields.rt_id),
            rw_id: parseInt(fields.rw_id),
            kelurahan_id: parseInt(fields.kelurahan_id),
            subdistrict_id: parseInt(fields.subdistrict_id),
        };
        console.log(data);
        setStatus();
        if (!isEdit) {
            createPenduduk(data, setSubmitting);
        } else {
            updatePenduduk(data, setSubmitting);
        }
    }

    function createPenduduk(fields, setSubmitting) {
        console.log(fields);
        axiosClient
            .post("/v1/penduduks", fields)
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

    function updatePenduduk(fields, setSubmitting) {
        axiosClient
            .post("/v1/penduduks/" + id, fields)
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
        nik: "",
        fullname: "",
        birth_place: "",
        birth_date: "",
        jk: "",
        religion_id: "",
        education_id: "",
        job_id: "",
        maried_type: "",
        nationality: "",
        address: "",
        rt_id: "",
        rw_id: "",
        kelurahan_id: "",
        subdistrict_id: "",
    };

    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required("Nama lengkap is required"),
        birth_place: Yup.string().required("Tempat lahir is required"),
        birth_date: Yup.string().required("Tanggal lahir is required"),
        jk: Yup.string().required("Jenis kelamin is required"),
        religion_id: Yup.string().required("Agama is required"),
        education_id: Yup.string().required("Pendidikan is required"),
        job_id: Yup.string().required("Pekerjaan is required"),
        maried_type: Yup.string().required("Status perkawinan is required"),
        nationality: Yup.string().required(
            "Status Kewarganegaraan is required"
        ),
        address: Yup.string().required("Alamat is required"),
        rw_id: Yup.string().required("RW is required"),
        rt_id: Yup.string().required("RT is required"),
        kelurahan_id: Yup.string().required("Kelurahan is required"),
        subdistrict_id: Yup.string().required("Kecamatan is required"),
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
                        {!isEdit ? "Tambah Penduduk" : "Edit Penduduk"}
                    </Text>
                </Flex>
                <Formik
                    flex="1"
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    validator={() => ({})}
                >
                    {({
                        errors,
                        touched,
                        isSubmitting,
                        setFieldValue,
                        handleChange,
                        values,
                    }) => {
                        useEffect(() => {
                            if (isEdit) {
                                getDatas(id);
                            }
                        }, []);

                        return (
                            <Form flex="1">
                                <Flex direction="row" p="16px">
                                    <Flex direction="column" flex="1" me="16px">
                                        <FormControl
                                            isInvalid={errors.nik}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Nomor Induk Penduduk
                                            </FormLabel>
                                            <Field
                                                type="disabled"
                                                placeholder="Nomor Induk Penduduk"
                                                name="nik"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.nik}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.fullname}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Nama Lengkap
                                            </FormLabel>
                                            <Field
                                                placeholder="Nama Lengkap"
                                                name="fullname"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.fullname}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <HStack spacing="16px" mb="16px">
                                            <FormControl
                                                isInvalid={errors.birth_place}
                                            >
                                                <FormLabel
                                                    ms="4px"
                                                    fontSize="sm"
                                                    fontWeight="normal"
                                                >
                                                    Tempat Lahir
                                                </FormLabel>
                                                <Field
                                                    name="birth_place"
                                                    hint="Tempat Lahir"
                                                    datas={districts.map(
                                                        (data) => {
                                                            return {
                                                                value:
                                                                    data.name,
                                                                title:
                                                                    data.name,
                                                            };
                                                        }
                                                    )}
                                                    component={Selects}
                                                />

                                                <FormErrorMessage>
                                                    {errors.birth_place}
                                                </FormErrorMessage>
                                            </FormControl>
                                            <FormControl
                                                isInvalid={errors.birth_date}
                                            >
                                                <FormLabel
                                                    ms="4px"
                                                    fontSize="sm"
                                                    fontWeight="normal"
                                                >
                                                    Tanggal Lahir
                                                </FormLabel>
                                                <Field
                                                    type="date"
                                                    name="birth_date"
                                                    component={Inputs}
                                                />

                                                <FormErrorMessage>
                                                    {errors.birth_date}
                                                </FormErrorMessage>
                                            </FormControl>
                                        </HStack>
                                        <FormControl
                                            isInvalid={errors.jk}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Jenis Kelamin
                                            </FormLabel>
                                            <Field
                                                name="jk"
                                                hint="Jenis Kelamin"
                                                datas={[
                                                    {
                                                        value: "L",
                                                        title: "Laki-Laki",
                                                    },
                                                    {
                                                        value: "P",
                                                        title: "Perempuan",
                                                    },
                                                ]}
                                                component={Selects}
                                            />

                                            <FormErrorMessage>
                                                {errors.jk}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.religion_id}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Agama
                                            </FormLabel>
                                            <Field
                                                hint="Agama"
                                                name="religion_id"
                                                datas={religions.map((data) => {
                                                    return {
                                                        value: data.id,
                                                        title: data.name,
                                                    };
                                                })}
                                                component={Selects}
                                            />

                                            <FormErrorMessage>
                                                {errors.religion_id}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.education_id}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Pendidikan
                                            </FormLabel>
                                            <Field
                                                hint="Pendidikan"
                                                name="education_id"
                                                datas={educations.map(
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
                                                {errors.education_id}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.job_id}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Pekerjaan
                                            </FormLabel>
                                            <Field
                                                name="job_id"
                                                hint="Pekerjaan"
                                                datas={jobs.map((data) => {
                                                    return {
                                                        value: data.id,
                                                        title: data.name,
                                                    };
                                                })}
                                                component={Selects}
                                            />

                                            <FormErrorMessage>
                                                {errors.job_id}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.maried_type}
                                            mb="16px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Status Perkawinan
                                            </FormLabel>
                                            <Field
                                                name="maried_type"
                                                hint="Status Perkawinan"
                                                datas={[
                                                    {
                                                        value: "BK",
                                                        title: "Belum Kawin",
                                                    },
                                                    {
                                                        value: "K",
                                                        title: "Kawin",
                                                    },
                                                    {
                                                        value: "CH",
                                                        title: "Cerai Hidup",
                                                    },
                                                    {
                                                        value: "CM",
                                                        title: "Cerai Mati",
                                                    },
                                                ]}
                                                component={Selects}
                                            />

                                            <FormErrorMessage>
                                                {errors.maried_type}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={errors.nationality}
                                            mb="32px"
                                        >
                                            <FormLabel
                                                ms="4px"
                                                fontSize="sm"
                                                fontWeight="normal"
                                            >
                                                Kewarganegaraan
                                            </FormLabel>
                                            <Field
                                                name="nationality"
                                                datas={[
                                                    {
                                                        value: "BK",
                                                        title: "Belum Kawin",
                                                    },
                                                    {
                                                        value: "K",
                                                        title: "Kawin",
                                                    },
                                                    {
                                                        value: "CH",
                                                        title: "Cerai Hidup",
                                                    },
                                                    {
                                                        value: "CM",
                                                        title: "Cerai Mati",
                                                    },
                                                ]}
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.nationality}
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
                                    <Flex flex="1" direction="column">
                                        <FormControl
                                            isInvalid={errors.address}
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
                                                placeholder="Alamat"
                                                name="address"
                                                component={Inputs}
                                            />

                                            <FormErrorMessage>
                                                {errors.address}
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
                                                    hint="RW"
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
                                                    hint="RT"
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
                                                hint="Kelurahan"
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
                                                hint="Kecamatan"
                                                name="subdistrict_id"
                                                datas={kecamatans.map(
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
                                </Flex>
                            </Form>
                        );
                    }}
                </Formik>
            </Card>
        </Flex>
    );
}

export default PendudukForm;
