import {
    AbsoluteCenter,
    Button,
    Center,
    ChakraProvider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import axiosClient from "axios-client";
import Card from "components/Card/Card.js";
import SearchSelect from "components/Select/SearchSelect";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {
    useHistory,
    useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import * as Yup from "yup";

function PendudukForm() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [religions, setReligions] = useState([]);
    const [educations, setEducations] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [keluargas, setKeluragas] = useState([]);
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

    const getKeluarga = () => {
        axiosClient
            .get("/v1/keluargas")
            .then(({ data }) => {
                const penduduks = data.data.data;

                setKeluragas(penduduks);
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
        getKeluarga();
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

    const isNotTomorrow = (value) => {
        const date = new Date(value);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        return !value || date.getTime() < tomorrow.getTime();
    };

    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required("Nama lengkap is required")
            .matches(
                /^[A-Za-z'. ]+$/,
                "Only alphabetic characters are allowed"
            ),
        birth_place: Yup.string().required("Tempat lahir is required"),
        birth_date: Yup.string()
            .required("Tanggal lahir is required")
            .test(
                "not-tomorrow",
                "Tanggal lahir tidak boleh melebihi tanggal sekarang",
                isNotTomorrow
            ),
        jk: Yup.string().required("Jenis kelamin is required"),
        religion_id: Yup.string().required("Agama is required"),
        education_id: Yup.string().required("Pendidikan is required"),
        job_id: Yup.string().required("Pekerjaan is required"),
        maried_type: Yup.string().required("Status perkawinan is required"),
        nationality: Yup.string()
            .required("Status Kewarganegaraan is required")
            .matches(/^[A-Za-z]+$/, "Only alphabetic characters are allowed"),
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
                        const getDatas = (id) => {
                            axiosClient
                                .get("/v1/penduduks/" + id)
                                .then(({ data }) => {
                                    const keluargas = data.data;
                                    console.log(keluargas);
                                    setLoading(false);
                                    const fields = [
                                        "nik",
                                        "fullname",
                                        "birth_place",
                                        "birth_date",
                                        "religion_id",
                                        "education_id",
                                        "job_id",
                                        "jk",
                                        "maried_type",
                                        "nationality",
                                        "no_kk",
                                        "rt_id",
                                        "rw_id",
                                        "alamat",
                                        "kelurahan_id",
                                        "subdistrict_id",
                                        "address",
                                    ];
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
                                <Flex direction="column">
                                    <Tabs flex="1">
                                        <TabList>
                                            <Tab>Biodata</Tab>
                                            <Tab>Domisili</Tab>
                                        </TabList>
                                        <TabPanels>
                                            <TabPanel>
                                                <Flex direction="row">
                                                    <Flex
                                                        direction="column"
                                                        flex="1"
                                                        me="16px"
                                                    >
                                                        <FormControl
                                                            isInvalid={
                                                                errors.nik
                                                            }
                                                            mb="16px"
                                                        >
                                                            <FormLabel
                                                                ms="4px"
                                                                fontSize="sm"
                                                                fontWeight="normal"
                                                            >
                                                                Nomor Induk
                                                                Penduduk
                                                            </FormLabel>
                                                            <Field
                                                                type="disabled"
                                                                placeholder="Nomor Induk Penduduk"
                                                                name="nik"
                                                                component={
                                                                    Inputs
                                                                }
                                                            />

                                                            <FormErrorMessage>
                                                                {errors.nik}
                                                            </FormErrorMessage>
                                                        </FormControl>
                                                        <FormControl
                                                            isInvalid={
                                                                errors.no_kk
                                                            }
                                                            mb="16px"
                                                        >
                                                            <FormLabel
                                                                ms="4px"
                                                                fontSize="sm"
                                                                fontWeight="normal"
                                                            >
                                                                Nomor Kartu
                                                                Keluarga
                                                            </FormLabel>
                                                            <Field
                                                                type="disabled"
                                                                placeholder="Nomor Kartu Keluarga"
                                                                name="no_kk"
                                                                options={keluargas.map(
                                                                    (data) => {
                                                                        return {
                                                                            value:
                                                                                data.no_kk,
                                                                            label:
                                                                                data.no_kk +
                                                                                " - Kepala Keluraga : " +
                                                                                data.kepala_keluarga,
                                                                        };
                                                                    }
                                                                )}
                                                                component={
                                                                    SearchSelect
                                                                }
                                                            />

                                                            <FormErrorMessage>
                                                                {errors.no_kk}
                                                            </FormErrorMessage>
                                                        </FormControl>
                                                        <FormControl
                                                            isInvalid={
                                                                errors.fullname
                                                            }
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
                                                                component={
                                                                    Inputs
                                                                }
                                                            />

                                                            <FormErrorMessage>
                                                                {
                                                                    errors.fullname
                                                                }
                                                            </FormErrorMessage>
                                                        </FormControl>
                                                        <HStack
                                                            spacing="16px"
                                                            mb="16px"
                                                        >
                                                            <FormControl
                                                                isInvalid={
                                                                    errors.birth_place
                                                                }
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
                                                                    placeholder="Tempat Lahir"
                                                                    options={districts.map(
                                                                        (
                                                                            data
                                                                        ) => {
                                                                            return {
                                                                                value:
                                                                                    data.name,
                                                                                label:
                                                                                    data.name,
                                                                            };
                                                                        }
                                                                    )}
                                                                    component={
                                                                        SearchSelect
                                                                    }
                                                                />

                                                                <FormErrorMessage>
                                                                    {
                                                                        errors.birth_place
                                                                    }
                                                                </FormErrorMessage>
                                                            </FormControl>
                                                            <FormControl
                                                                isInvalid={
                                                                    errors.birth_date
                                                                }
                                                            >
                                                                <FormLabel
                                                                    ms="4px"
                                                                    fontSize="sm"
                                                                    fontWeight="normal"
                                                                >
                                                                    Tanggal
                                                                    Lahir
                                                                </FormLabel>
                                                                <Field
                                                                    type="date"
                                                                    name="birth_date"
                                                                    data-date-format="dd-MM-yyyy"
                                                                    component={
                                                                        Inputs
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        console.log(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                        setFieldValue(
                                                                            "birth_date",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                />

                                                                <FormErrorMessage>
                                                                    {
                                                                        errors.birth_date
                                                                    }
                                                                </FormErrorMessage>
                                                            </FormControl>
                                                        </HStack>
                                                        <FormControl
                                                            isInvalid={
                                                                errors.jk
                                                            }
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
                                                                placeholder="Jenis Kelamin"
                                                                options={[
                                                                    {
                                                                        value:
                                                                            "L",
                                                                        label:
                                                                            "Laki-Laki",
                                                                    },
                                                                    {
                                                                        value:
                                                                            "P",
                                                                        label:
                                                                            "Perempuan",
                                                                    },
                                                                ]}
                                                                component={
                                                                    SearchSelect
                                                                }
                                                            />

                                                            <FormErrorMessage>
                                                                {errors.jk}
                                                            </FormErrorMessage>
                                                        </FormControl>

                                                        <FormControl
                                                            isInvalid={
                                                                errors.religion_id
                                                            }
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
                                                                placeholder="Agama"
                                                                name="religion_id"
                                                                options={religions.map(
                                                                    (data) => {
                                                                        return {
                                                                            value:
                                                                                data.id,
                                                                            label:
                                                                                data.name,
                                                                        };
                                                                    }
                                                                )}
                                                                component={
                                                                    SearchSelect
                                                                }
                                                            />

                                                            <FormErrorMessage>
                                                                {
                                                                    errors.religion_id
                                                                }
                                                            </FormErrorMessage>
                                                        </FormControl>
                                                    </Flex>
                                                    <Flex
                                                        direction="column"
                                                        flex="1"
                                                        me="16px"
                                                    >
                                                        <FormControl
                                                            isInvalid={
                                                                errors.education_id
                                                            }
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
                                                                placeholder="Pendidikan"
                                                                name="education_id"
                                                                options={educations.map(
                                                                    (data) => {
                                                                        return {
                                                                            value:
                                                                                data.id,
                                                                            label:
                                                                                data.name,
                                                                        };
                                                                    }
                                                                )}
                                                                component={
                                                                    SearchSelect
                                                                }
                                                            />

                                                            <FormErrorMessage>
                                                                {
                                                                    errors.education_id
                                                                }
                                                            </FormErrorMessage>
                                                        </FormControl>

                                                        <FormControl
                                                            isInvalid={
                                                                errors.job_id
                                                            }
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
                                                                placeholder="Pekerjaan"
                                                                options={jobs.map(
                                                                    (data) => {
                                                                        return {
                                                                            value:
                                                                                data.id,
                                                                            label:
                                                                                data.name,
                                                                        };
                                                                    }
                                                                )}
                                                                component={
                                                                    SearchSelect
                                                                }
                                                            />

                                                            <FormErrorMessage>
                                                                {errors.job_id}
                                                            </FormErrorMessage>
                                                        </FormControl>

                                                        <FormControl
                                                            isInvalid={
                                                                errors.maried_type
                                                            }
                                                            mb="16px"
                                                        >
                                                            <FormLabel
                                                                ms="4px"
                                                                fontSize="sm"
                                                                fontWeight="normal"
                                                            >
                                                                Status
                                                                Perkawinan
                                                            </FormLabel>
                                                            <Field
                                                                name="maried_type"
                                                                placeholder="Status Perkawinan"
                                                                options={[
                                                                    {
                                                                        value:
                                                                            "BK",
                                                                        label:
                                                                            "Belum Kawin",
                                                                    },
                                                                    {
                                                                        value:
                                                                            "K",
                                                                        label:
                                                                            "Kawin",
                                                                    },
                                                                    {
                                                                        value:
                                                                            "CH",
                                                                        label:
                                                                            "Cerai Hidup",
                                                                    },
                                                                    {
                                                                        value:
                                                                            "CM",
                                                                        label:
                                                                            "Cerai Mati",
                                                                    },
                                                                ]}
                                                                component={
                                                                    SearchSelect
                                                                }
                                                            />

                                                            <FormErrorMessage>
                                                                {
                                                                    errors.maried_type
                                                                }
                                                            </FormErrorMessage>
                                                        </FormControl>

                                                        <FormControl
                                                            isInvalid={
                                                                errors.nationality
                                                            }
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
                                                                options={[
                                                                    {
                                                                        value:
                                                                            "BK",
                                                                        label:
                                                                            "Belum Kawin",
                                                                    },
                                                                    {
                                                                        value:
                                                                            "K",
                                                                        label:
                                                                            "Kawin",
                                                                    },
                                                                    {
                                                                        value:
                                                                            "CH",
                                                                        label:
                                                                            "Cerai Hidup",
                                                                    },
                                                                    {
                                                                        value:
                                                                            "CM",
                                                                        label:
                                                                            "Cerai Mati",
                                                                    },
                                                                ]}
                                                                component={
                                                                    Inputs
                                                                }
                                                            />

                                                            <FormErrorMessage>
                                                                {
                                                                    errors.nationality
                                                                }
                                                            </FormErrorMessage>
                                                        </FormControl>
                                                    </Flex>
                                                </Flex>
                                            </TabPanel>
                                            <TabPanel>
                                                <Flex direction="row">
                                                    <Flex
                                                        flex="1"
                                                        direction="column"
                                                    >
                                                        <FormControl
                                                            isInvalid={
                                                                errors.address
                                                            }
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
                                                                component={
                                                                    Inputs
                                                                }
                                                            />

                                                            <FormErrorMessage>
                                                                {errors.address}
                                                            </FormErrorMessage>
                                                        </FormControl>

                                                        <HStack
                                                            spacing="16px"
                                                            mb="16px"
                                                        >
                                                            <FormControl
                                                                isInvalid={
                                                                    errors.rw_id
                                                                }
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
                                                                    placeholder="RW"
                                                                    options={rws.map(
                                                                        (
                                                                            data
                                                                        ) => {
                                                                            return {
                                                                                value:
                                                                                    data.id,
                                                                                label:
                                                                                    data.name,
                                                                            };
                                                                        }
                                                                    )}
                                                                    component={
                                                                        SearchSelect
                                                                    }
                                                                />

                                                                <FormErrorMessage>
                                                                    {
                                                                        errors.rw_id
                                                                    }
                                                                </FormErrorMessage>
                                                            </FormControl>
                                                            <FormControl
                                                                isInvalid={
                                                                    errors.rt_id
                                                                }
                                                            >
                                                                <FormLabel
                                                                    ms="4px"
                                                                    fontSize="sm"
                                                                    fontWeight="normal"
                                                                >
                                                                    RT
                                                                </FormLabel>
                                                                <Field
                                                                    placeholder="RT"
                                                                    name="rt_id"
                                                                    options={rts.map(
                                                                        (
                                                                            data
                                                                        ) => {
                                                                            return {
                                                                                value:
                                                                                    data.id,
                                                                                label:
                                                                                    data.name,
                                                                            };
                                                                        }
                                                                    )}
                                                                    component={
                                                                        SearchSelect
                                                                    }
                                                                />

                                                                <FormErrorMessage>
                                                                    {
                                                                        errors.rt_id
                                                                    }
                                                                </FormErrorMessage>
                                                            </FormControl>
                                                        </HStack>

                                                        <FormControl
                                                            isInvalid={
                                                                errors.kelurahan_id
                                                            }
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
                                                                placeholder="Kelurahan"
                                                                name="kelurahan_id"
                                                                options={kelurahans.map(
                                                                    (data) => {
                                                                        return {
                                                                            value:
                                                                                data.id,
                                                                            label:
                                                                                data.name,
                                                                        };
                                                                    }
                                                                )}
                                                                component={
                                                                    SearchSelect
                                                                }
                                                            />

                                                            <FormErrorMessage>
                                                                {
                                                                    errors.kelurahan_id
                                                                }
                                                            </FormErrorMessage>
                                                        </FormControl>

                                                        <FormControl
                                                            isInvalid={
                                                                errors.subdistrict_id
                                                            }
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
                                                                            value:
                                                                                data.id,
                                                                            label:
                                                                                data.name,
                                                                        };
                                                                    }
                                                                )}
                                                                component={
                                                                    SearchSelect
                                                                }
                                                            />

                                                            <FormErrorMessage>
                                                                {
                                                                    errors.subdistrict_id
                                                                }
                                                            </FormErrorMessage>
                                                        </FormControl>
                                                    </Flex>
                                                    <Flex flex="1" />
                                                </Flex>
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
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
