/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Spacer, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function Footer(props) {
    // const linkTeal = useColorModeValue("teal.400", "red.200");=
    return (
        <Flex px="30px" pb="20px">
            <Spacer />
            <Text color="gray.400" mb={{ base: "20px", xl: "0px" }}>
                &copy; {1900 + new Date().getYear()},{" "}
                <Text as="span">
                    {document.documentElement.dir === "rtl"
                        ? " مصنوع من ❤️ بواسطة"
                        : "Made with ❤️ by "}
                </Text>
                <Link
                    // color={linkTeal}
                    color="teal.400"
                    href="https://github.com/rifaldiyoga"
                    target="_blank"
                >
                    {"Rifaldi Yoga A"}
                </Link>
            </Text>
            <Spacer />
        </Flex>
    );
}
