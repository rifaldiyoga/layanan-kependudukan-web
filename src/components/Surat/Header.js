import { Box, Center, Divider, Flex, Image, Text } from "@chakra-ui/react";
import signInImage from "assets/img/logo_kota_batu.png";

export const Header = () => {
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
                                PEMERINTAH KOTA BATU
                            </Text>
                            <Text
                                fontWeight="bold"
                                fontSize={16}
                                style={{ fontFamily: "Bookman Old Style" }}
                            >
                                KECAMATAN BATU
                            </Text>
                            <Text
                                fontWeight="bold"
                                fontSize={24}
                                style={{ fontFamily: "Bookman Old Style" }}
                            >
                                KELURAHAN NGAGLIK
                            </Text>
                            <Text fontStyle="italic" fontSize={14}>
                                Jln. Abdul Rachman No. 10, Telp (0341) 591441
                                Batu Kode Pos 65311
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
