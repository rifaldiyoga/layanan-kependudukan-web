import {
    Button,
    Center,
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
    Table,
    TableCaption,
    Tabs,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
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

function KeluargaForm() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [kelurahans, setKelurahan] = useState([]);
    const [kecamatans, setKecamatan] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [penduduks, setPenduduk] = useState([]);
    const [keluargas, setKeluarga] = useState([]);
    const [dataKeluraga, setDataKeluarga] = useState([]);
    const [rts, setRt] = useState([]);
    const [rws, setRw] = useState([]);

    let { id } = useParams();
    const isEdit = id;

    const getRt = () => {
        axiosClient
            .get("/v1/rts")
            .then(({ data }) => {
                const penduduks = data.data.data;

                setRt([]);
                setRt(penduduks);
            })
            .catch(() => {});
    };

    const getRw = () => {
        axiosClient
            .get("/v1/rws")
            .then(({ data }) => {
                const penduduks = data.data.data;

                setRw([]);
                setRw(penduduks);
            })
            .catch(() => {});
    };

    const getKelurahan = () => {
        axiosClient
            .get("/v1/kelurahans")
            .then(({ data }) => {
                const penduduks = data.data.data;

                setKelurahan([]);
                setKelurahan(penduduks);
            })
            .catch(() => {});
    };

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

    const getPenduduk = () => {
        axiosClient
            .get("/v1/penduduks")
            .then(({ data }) => {
                const penduduks = data.data.data;
                console.log(penduduks);
                setPenduduk(penduduks);
            })
            .catch(() => {});
    };

    useEffect(() => {
        getRt();
        getRw();
        getKelurahan();
        getProvince();
        // getKecamatan();
        getPenduduk();
    }, []);

    function onSubmit(fields, { setStatus, setSubmitting }) {
        const data = {
            ...fields,
            rt_id: parseInt(fields.rt_id),
            rw_id: parseInt(fields.rw_id),
            kelurahan_id: parseInt(fields.kelurahan_id),
            subdistrict_id: parseInt(fields.subdistrict_id),
            kepala_keluarga: penduduks.find(
                (data) => data.nik == fields.nik_kepala_keluarga
            ).fullname,
        };
        setStatus();
        if (!isEdit) {
            createKeluarga(data, setSubmitting);
        } else {
            updateKeluarga(data, setSubmitting);
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
        no_kk: "",
        nik_kepala_keluarga: "",
        alamat: "",
        rt_id: "",
        rw_id: "",
        kelurahan_id: "",
        subdistrict_id: "",
    };

    const validationSchema = Yup.object().shape({
        alamat: Yup.string().required("Alamat is required"),
        rt_id: Yup.number().required("Rt is required"),
        rw_id: Yup.number().required("Rw is required"),
        kelurahan_id: Yup.number().required("Kelurahan is required"),
        subdistrict_id: Yup.number().required("Kecamatan is required"),
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
                                    console.log(keluargas);
                                    setLoading(false);
                                    const fields = [
                                        "no_kk",
                                        "rt_id",
                                        "rw_id",
                                        "alamat",
                                        "kelurahan_id",
                                        "subdistrict_id",
                                        "district_id",
                                        "province_id",
                                        "nik_kepala_keluarga",
                                    ];
                                    getDistrict(keluargas.province_id);
                                    getKecamatan(keluargas.district_id);
                                    fields.forEach((field) => {
                                        setFieldValue(
                                            field,
                                            keluargas[field],
                                            false
                                        );
                                    });
                                    setKeluarga(keluargas);
                                    getDataPenduduk(keluargas);
                                })
                                .catch(() => {
                                    setLoading(false);
                                });
                        };

                        const getDataPenduduk = (keluargas) => {
                            axiosClient
                                .get("/v1/penduduks?no_kk=" + keluargas.no_kk)
                                .then(({ data }) => {
                                    const penduduks = data.data.data;
                                    setDataKeluarga(penduduks);
                                })
                                .catch(() => {});
                        };

                        useEffect(() => {
                            if (isEdit) {
                                getDatas(id);
                            }
                        }, []);

                        return (
                            <Form flex="1">
                                <Flex direction="row" p="16px">
                                    <Tabs flex="1">
                                        <TabList>
                                            <Tab>Data</Tab>
                                            <Tab>Daftar Keluarga</Tab>
                                        </TabList>
                                        <TabPanels>
                                            <TabPanel>
                                                <Flex
                                                    flex="1"
                                                    direction="column"
                                                >
                                                    <FormControl
                                                        isInvalid={errors.no_kk}
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
                                                            name="no_kk"
                                                            component={Inputs}
                                                        />

                                                        <FormErrorMessage>
                                                            {errors.no_kk}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl
                                                        isInvalid={
                                                            errors.nik_kepala_keluarga
                                                        }
                                                        mb="16px"
                                                    >
                                                        <FormLabel
                                                            ms="4px"
                                                            fontSize="sm"
                                                            fontWeight="normal"
                                                        >
                                                            Kepala Keluarga
                                                        </FormLabel>
                                                        <Field
                                                            placeholder="Kepala Keluarga"
                                                            name="nik_kepala_keluarga"
                                                            component={
                                                                SearchSelect
                                                            }
                                                            options={penduduks.map(
                                                                (data) => {
                                                                    return {
                                                                        value:
                                                                            data.nik,
                                                                        label:
                                                                            data.nik +
                                                                            " - " +
                                                                            data.fullname,
                                                                    };
                                                                }
                                                            )}
                                                        />

                                                        <FormErrorMessage>
                                                            {
                                                                errors.nik_kepala_keluarga
                                                            }
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl
                                                        isInvalid={
                                                            errors.alamat
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
                                                            type="disabled"
                                                            placeholder="Alamat"
                                                            name="alamat"
                                                            component={Inputs}
                                                        />

                                                        <FormErrorMessage>
                                                            {errors.alamat}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl
                                                        isInvalid={
                                                            errors.province_id
                                                        }
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
                                                            {errors.province_id}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl
                                                        isInvalid={
                                                            errors.district_id
                                                        }
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
                                                            {errors.district_id}
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
                                                                {errors.rw_id}
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
                                                                {errors.rt_id}
                                                            </FormErrorMessage>
                                                        </FormControl>
                                                    </HStack>
                                                </Flex>
                                                <Flex flex="1" />
                                            </TabPanel>
                                            <TabPanel>
                                                {/* <Flex direction="column">
                                                    <FormControl
                                                        isInvalid={
                                                            errors.nik_kepala_keluarga
                                                        }
                                                        mb="16px"
                                                    >
                                                        <FormLabel
                                                            ms="4px"
                                                            fontSize="sm"
                                                            fontWeight="normal"
                                                        >
                                                            Tambah Data Keluarga
                                                        </FormLabel>
                                                        <Field
                                                            placeholder="Kepala Keluarga"
                                                            name="nik_kepala_keluarga"
                                                            component={
                                                                SearchSelect
                                                            }
                                                            options={penduduks.map(
                                                                (data) => {
                                                                    return {
                                                                        value:
                                                                            data.nik,
                                                                        label:
                                                                            data.nik +
                                                                            " - " +
                                                                            data.fullname,
                                                                    };
                                                                }
                                                            )}
                                                        />

                                                        <FormErrorMessage>
                                                            {
                                                                errors.nik_kepala_keluarga
                                                            }
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                </Flex> */}
                                                <Table variant="striped">
                                                    <Thead>
                                                        <Tr>
                                                            <Th>NIK</Th>
                                                            <Th>Nama</Th>
                                                            <Th>
                                                                Status Dalam
                                                                Keluarga
                                                            </Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {dataKeluraga.map(
                                                            (data) => (
                                                                <Tr>
                                                                    <Td>
                                                                        {
                                                                            data.nik
                                                                        }
                                                                    </Td>
                                                                    <Td>
                                                                        {
                                                                            data.fullname
                                                                        }
                                                                    </Td>
                                                                    <Td>
                                                                        {
                                                                            data.status_family
                                                                        }
                                                                    </Td>
                                                                </Tr>
                                                            )
                                                        )}
                                                    </Tbody>
                                                </Table>
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
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

export default KeluargaForm;
