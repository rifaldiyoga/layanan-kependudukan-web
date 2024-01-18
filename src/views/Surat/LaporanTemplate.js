import signInImage from "assets/img/logo_kota_batu.png";
import axiosClient from "axios-client";
import { Header } from "components/Surat/Header";
import { SubHeader } from "components/Surat/SubHeader";
import { useEffect, useState } from "react";
import {
    useHistory,
    useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Helper from "../../helper/Helper";
import { statusNikah } from "constants";
import "./style.css";
import { Footer } from "components/Surat/Footer";
const {
    Image,
    Flex,
    Text,
    Box,
    Center,
    Divider,
    Table,
    Tbody,
    Tr,
    Td,
    Spacer,
} = require("@chakra-ui/react");

const getQueryParams = (query = null) => {
    const history = useHistory();
    return (
        (query || history.location.search.replace("?", ""))

            // get array of KeyValue pairs
            .split("&")

            // Decode values
            .map((pair) => {
                let [key, val] = pair.split("=");

                return [key, decodeURIComponent(val || "")];
            })

            // array to object
            .reduce((result, [key, val]) => {
                result[key] = val;
                return result;
            }, {})
    );
};

const groupFunc = (data, props) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    // reduce has two params callback function and initialValue : optional.
    // here I have call back function (a, i) => {...}
    // add initialValue = []
    let resultGroups = data.reduce((a, i) => {
        // loop through each properties
        props.forEach((p) => {
            // get index of matching value with result object a and current object data.
            let index = a.findIndex((x) => x.key === p && x.value === i[p]);
            // if index = -1 then no such value exists. So add new value. else increment count
            if (index === -1) {
                a.push({ key: p, value: i[p], count: 1 });
            } else {
                a[index].count++;
            }
        });
        // return result object (aka accumulator in reduce function)
        return a;
    }, []);

    let result = [];
    // loop through each property and create group for each property.
    props.forEach((p) => {
        // check if there is any object available with this property.
        // If yes then filter object and push into result array.
        if (resultGroups.some((x) => x.key === p)) {
            result.push(resultGroups.filter((x) => x.key === p));
        }
    });
    // return result.
    return result;
};

const LaporanTemplate = () => {
    const params = getQueryParams();
    const [datas, setDatas] = useState(null);
    const [count, setCount] = useState(null);
    const [layanans, setLayanans] = useState([]);
    const filter = {
        status: "VALID",
        start_date: params.start_date,
        end_date: params.end_date,
    };

    const getDatas = () => {
        console.log(filter);
        axiosClient
            .get("/v1/pengajuans/admin", { params: filter })
            .then(({ data }) => {
                console.log(data.data.data);

                const a = data.data.data;
                setCount(a.length);
                const b = groupFunc(a, ["code"])[0];
                console.log(b);
                setDatas(b);
            })
            .catch(() => {});
    };

    const getCount = (layanan) => {
        const data = datas.filter((obj) => obj.value == layanan.code)[0];

        return data && data?.count ? data.count : 0;
    };

    const getLayanans = () => {
        console.log(filter);
        axiosClient
            .get("/v1/layanans/paging")
            .then(({ data }) => {
                setLayanans(data.data.data);
            })
            .catch(() => {});
    };

    useEffect(() => {
        getDatas();
        getLayanans();
    }, []);

    console.log(datas);

    return datas ? (
        <Flex
            direction="column"
            p={"2cm"}
            bg={"white"}
            w={"21cm"}
            h={"29.7cm"}
            style={{
                fontFamily: "Bookman Old Style",
                fontSize: 14,
            }}
        >
            <Header />
            <Flex direction="column" alignItems="center">
                <Text
                    fontWeight="bold"
                    fontSize={18}
                    style={{
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                        textAlign: "center",
                        fontFamily: "Bookman Old Style",
                    }}
                >
                    REKAPITULASI PENGAJUAN PELAYANAN KEPENDUDUKAN
                </Text>
                <Text fontSize={14} style={{ fontFamily: "Bookman Old Style" }}>
                    Tanggal : {Helper.formatDate(params.start_date)} /{" "}
                    {Helper.formatDate(params.end_date)}
                </Text>
            </Flex>

            <table style={{ marginTop: "16px" }}>
                <tr style={{ background: "#0087ff36" }}>
                    <td
                        width={"10%"}
                        style={{
                            border: "2px solid rgb(0, 0, 0)",
                            textAlign: "center",
                        }}
                    >
                        No.
                    </td>
                    <td
                        style={{
                            border: "2px solid rgb(0, 0, 0)",
                            textAlign: "center",
                        }}
                    >
                        Jenis Dokumen
                    </td>
                    <td
                        width={"15%"}
                        style={{
                            border: "2px solid rgb(0, 0, 0)",
                            textAlign: "center",
                        }}
                    >
                        Jumlah
                    </td>
                </tr>
                {layanans.map((data, index) => {
                    return (
                        <tr>
                            <td
                                style={{
                                    border: "2px solid rgb(0, 0, 0)",
                                    textAlign: "center",
                                }}
                            >
                                {index + 1}
                            </td>
                            <td
                                style={{
                                    border: "2px solid rgb(0, 0, 0)",
                                    paddingLeft: "14px",
                                }}
                            >
                                {data.name}
                            </td>
                            <td
                                style={{
                                    border: "2px solid rgb(0, 0, 0)",
                                    textAlign: "center",
                                }}
                            >
                                {getCount(data)}
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <td
                        width={"10%"}
                        colSpan={2}
                        style={{
                            border: "2px solid rgb(0, 0, 0)",
                            textAlign: "center",
                        }}
                    >
                        Total Pengajuan
                    </td>

                    <td
                        width={"15%"}
                        style={{
                            border: "2px solid rgb(0, 0, 0)",
                            textAlign: "center",
                        }}
                    >
                        {count}
                    </td>
                </tr>
            </table>
        </Flex>
    ) : (
        <Flex />
    );
};

export default LaporanTemplate;
