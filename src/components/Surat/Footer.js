import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import Helper from "helper/Helper";

export const Footer = ({ penduduk, isUser, isSaksi, saksi }) => {
    let sak = saksi;
    if (saksi) {
        sak = saksi.filter((value) => value != "");
    } else {
        sak = [];
    }
    return (
        <Flex>
            {isSaksi && sak.length > 0 ? (
                <Flex direction="column">
                    <Text color={"white"}>
                        Batu, {Helper.formatDate(Date())}
                    </Text>
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
            ) : (
                <Box />
            )}
            {isUser ? (
                <Flex direction="column" style={{ textAlign: "center" }}>
                    <Text color={"white"}>
                        Batu, {Helper.formatDate(Date())}
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
            ) : (
                <Box />
            )}

            <Spacer />
            <Flex direction="column" style={{ textAlign: "center" }}>
                <Text>Batu, {Helper.formatDate(Date())}</Text>
                <Text>Kepala Kelurahan Ngaglik</Text>
                <Text> Kota Batu</Text>
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
                    RENDRA ADINATA, S.Kom., M.AP.
                </Text>
                <Text>NIP : 19870427 201101 1 09</Text>
            </Flex>
        </Flex>
    );
};

const Saksi = (element) => {
    return <Text color={"black"}>{element}</Text>;
};
