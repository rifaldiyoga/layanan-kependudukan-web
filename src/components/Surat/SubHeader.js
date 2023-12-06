import { Center, Flex, Text } from "@chakra-ui/react";

export const SubHeader = ({ name, no_surat, size }) => {
    return (
        <Flex direction="column">
            <Center mb={6}>
                <Flex direction="column" alignItems="center">
                    <Text
                        fontWeight="bold"
                        fontSize={size}
                        style={{
                            fontWeight: "bold",
                            textDecorationLine: "underline",
                            fontFamily: "Bookman Old Style",
                        }}
                    >
                        {name}
                    </Text>
                    <Text
                        fontSize={14}
                        style={{ fontFamily: "Bookman Old Style" }}
                    >
                        Nomor : {no_surat}
                    </Text>
                </Flex>
            </Center>
        </Flex>
    );
};
