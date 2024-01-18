import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import Helper from "helper/Helper";
import signInImage from "assets/img/sign_kelurahan.png";
import { useEffect, useState } from "react";
import axiosClient from "axios-client";

export const Footer = ({ penduduk, isUser, isSaksi, saksi, isSign, id }) => {
    const [layanans, setLayanans] = useState([]);
    const [lurah, setLurah] = useState([]);
    const [sistem, setSistems] = useState([]);

    let sak = saksi;
    if (saksi) {
        sak = saksi.filter((value) => value != "");
    } else {
        sak = [];
    }

    const getLayanan = () => {
        axiosClient
            .get("/v1/layanans/" + id)
            .then(({ data }) => {
                console.log(data.data);
                setLayanans(data.data);
            })
            .catch(() => {});
    };

    const getSistem = () => {
        axiosClient
            .get("/v1/sistems/1")
            .then(({ data }) => {
                console.log(data);
                setSistems(data.data);
            })
            .catch(() => {});
    };

    const getLurah = () => {
        axiosClient
            .get("/v1/aparatur_desas/lurah")
            .then(({ data }) => {
                console.log(data);
                setLurah(data.data);
            })
            .catch(() => {});
    };

    useEffect(() => {
        getLayanan();
        getSistem();
        getLurah();
    }, []);

    console.log(layanans.is_sign);

    const SaksiComponent = () => {
        return (
            <Flex direction="column">
                <Text color={"white"}>Batu, {Helper.formatDate(Date())}</Text>
                <Text mb="8px">Tanda Tangan Saksi</Text>
                <table>
                    {sak.map((data, index) => {
                        console.log(data);
                        return (
                            <tr mb="24px">
                                <td padding="24px">
                                    <br></br>
                                    <Text color={"black"} me="16px">
                                        {index + 1}. {data}
                                    </Text>
                                </td>
                                <td>
                                    <br></br>
                                    <Text color={"black"}>
                                        (........................)
                                    </Text>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </Flex>
        );
    };

    const UserComponent = () => {
        return (
            <Flex direction="column" style={{ textAlign: "center" }}>
                <Text color={layanans.code != "SPORADIK" ? "white" : "black"}>
                    {sistem?.kecamatan?.name} , {Helper.formatDate(Date())}
                </Text>
                <Text>Tanda Tangan</Text>
                <Text> Yang Bersangkutan</Text>
                <Text>{"\n"}</Text>
                <Text color={"white"}>\n</Text>
                <Text color={"white"}>\n</Text>
                <Text color={"white"}>\n</Text>
                <Text color={"white"}>\n</Text>
                <Text color={"white"}>\n</Text>
                <Text
                    fontWeight="bold"
                    style={{
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                        fontFamily: "Bookman Old Style",
                    }}
                >
                    {penduduk.fullname}
                </Text>
            </Flex>
        );
    };

    const LurahComponent = () => {
        return (
            <Flex direction="column" style={{ textAlign: "center" }}>
                {layanans.code != "SPORADIK" ? (
                    <Text>
                        {Helper.capitalizeFirstLetter(sistem?.kecamatan?.name)},{" "}
                        {Helper.formatDate(Date())}
                    </Text>
                ) : (
                    <Text>Mengetahui : </Text>
                )}

                <Text>Kepala {sistem?.nama}</Text>
                <Text> {Helper.capitalizeFirstLetter(sistem?.kota?.name)}</Text>

                {layanans.is_sign == true ? (
                    <Image
                        src={signInImage}
                        w="230px"
                        position="absolute"
                        mt={"50px"}
                    />
                ) : (
                    <Box></Box>
                )}
                <Flex direction="column">
                    <Text>{"\n"}</Text>
                    <Text color={"white"}>\n</Text>
                    <Text color={"white"}>\n</Text>
                    <Text color={"white"}>\n</Text>
                    <Text color={"white"}>\n</Text>
                    <Text color={"white"}>\n</Text>
                </Flex>

                <Text
                    fontWeight="bold"
                    style={{
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                        fontFamily: "Bookman Old Style",
                    }}
                >
                    {lurah?.nama}
                </Text>
                <Text>NIP : {lurah?.nip}</Text>
            </Flex>
        );
    };

    return layanans.code == "SPORADIK" ? (
        <Flex direction="column" alignItems="center">
            <Flex alignSelf="stretch">
                {isSaksi && sak.length > 0 ? <SaksiComponent /> : <Box />}
                <Spacer />
                <UserComponent />
            </Flex>

            <LurahComponent />
        </Flex>
    ) : (
        <Flex>
            {isSaksi && sak.length > 0 ? <SaksiComponent /> : <Box />}
            {isUser ? <UserComponent /> : <Box />}
            <Spacer />
            <LurahComponent />
        </Flex>
    );
};

const Saksi = (element) => {
    return <Text color={"black"}>{element}</Text>;
};
