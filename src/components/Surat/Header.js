import { Box, Center, Divider, Flex, Image, Text } from "@chakra-ui/react";
import signInImage from "assets/img/logo_kota_batu.png";
import axiosClient from "axios-client";
import Helper from "helper/Helper";
import { useEffect, useState } from "react";

export const Header = () => {
    const [sistem, setSistem] = useState([]);

    const getKecamatan = () => {
        axiosClient
            .get("/v1/sistems/1")
            .then(({ data }) => {
                const penduduks = data.data;
                console.log(data);
                setSistem(penduduks);
            })
            .catch(() => {});
    };

    useEffect(() => {
        getKecamatan();
    }, []);

    return (
        <Flex direction="column">
            <Flex direction="row" alignSelf="center">
                <Box position={"absolute"} ml={-20}>
                    <Image src={signInImage} width="80px" />
                </Box>

                <Center mb={4}>
                    <Flex direction="row">
                        <Flex direction="column" alignItems="center">
                            <Text
                                fontWeight="bold"
                                fontSize={16}
                                style={{ fontFamily: "Bookman Old Style" }}
                            >
                                PEMERINTAH {sistem?.kota?.name?.toUpperCase()}
                            </Text>
                            <Text
                                fontWeight="bold"
                                fontSize={16}
                                style={{ fontFamily: "Bookman Old Style" }}
                            >
                                KECAMATAN{" "}
                                {sistem?.kecamatan?.name?.toUpperCase()}
                            </Text>
                            <Text
                                fontWeight="bold"
                                fontSize={24}
                                style={{ fontFamily: "Bookman Old Style" }}
                            >
                                {sistem?.nama?.toUpperCase()}
                            </Text>
                            <Text fontStyle="italic" fontSize={14}>
                                {sistem?.alamat}, Telp {sistem?.telp}{" "}
                                {Helper.capitalizeFirstLetter(
                                    sistem?.kecamatan?.name
                                )}{" "}
                                Kode Pos {sistem?.kode_pos}
                            </Text>
                        </Flex>
                    </Flex>
                </Center>
            </Flex>
            <Divider
                orientation="horizontal"
                borderWidth={1.5}
                borderColor="black"
                colorScheme="black"
                mb={6}
            />
        </Flex>
    );
};
