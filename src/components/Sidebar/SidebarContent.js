/*eslint-disable*/
// chakra imports
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import { CreativeTimLogo } from "components/Icons/Icons";
import { Separator } from "components/Separator/Separator";
import { SidebarHelp } from "components/Sidebar/SidebarHelp";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import signInImage from "assets/img/logo_kota_batu.png";

// this function creates the links and collapses that appear in the sidebar (left menu)

const SidebarContent = ({ logoText, routes }) => {
    // to check for active links and opened collapses
    let location = useLocation();
    // this is for the rest of the collapses
    const [state, setState] = React.useState({});

    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        return location.pathname.includes(routeName) ? "active" : "";
    };
    const createLinks = (routes) => {
        // Chakra Color Mode
        const activeBg = useColorModeValue("white", "gray.700");
        const inactiveBg = useColorModeValue("white", "gray.700");
        const activeColor = useColorModeValue("gray.700", "white");
        const inactiveColor = useColorModeValue("gray.500", "gray.500");

        return routes.map((prop, key) => {
            if (prop.redirect) {
                return null;
            }
            if (prop.category) {
                var st = {};
                st[prop["state"]] = !state[prop.state];
                return (
                    <div key={prop.name}>
                        <Accordion
                            allowToggle
                            mb={{
                                xl: "12px",
                            }}
                        >
                            <AccordionItem borderColor="transparent">
                                <AccordionButton p={0} bgColor="transparent">
                                    <Button
                                        boxSize="initial"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        mx={{
                                            xl: "auto",
                                        }}
                                        ps={{
                                            sm: "10px",
                                            xl: "16px",
                                        }}
                                        py="12px"
                                        bgColor="transparent"
                                        borderRadius="15px"
                                        _hover="none"
                                        w="100%"
                                        _focus={{
                                            boxShadow: "none",
                                        }}
                                    >
                                        <Flex flex="1">
                                            {typeof prop.icon === "string" ? (
                                                <Icon>{prop.icon}</Icon>
                                            ) : (
                                                <IconBox
                                                    bg={inactiveBg}
                                                    color="teal.300"
                                                    h="30px"
                                                    w="30px"
                                                    me="12px"
                                                >
                                                    {prop.icon}
                                                </IconBox>
                                            )}
                                            <Text
                                                color={inactiveColor}
                                                my="auto"
                                                fontSize="sm"
                                            >
                                                {document.documentElement
                                                    .dir === "rtl"
                                                    ? prop.rtlName
                                                    : prop.name}
                                            </Text>
                                        </Flex>
                                        <Flex>
                                            <AccordionIcon />
                                        </Flex>
                                    </Button>
                                </AccordionButton>
                                <AccordionPanel ps={2} pe={0} pb={0}>
                                    <Flex direction="column">
                                        {createLinks(prop.views)}
                                    </Flex>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </div>
                );
            }
            return (
                <NavLink to={prop.layout + prop.path} key={prop.name}>
                    {activeRoute(prop.layout + prop.path) === "active" ? (
                        <Button
                            boxSize="initial"
                            justifyContent="flex{`${process.env.PUBLIC_URL}/`}-start"
                            alignItems="center"
                            bg={activeBg}
                            mb={{
                                xl: "12px",
                            }}
                            mx={{
                                xl: "auto",
                            }}
                            ps={{
                                sm: "10px",
                                xl: "16px",
                            }}
                            py="12px"
                            borderRadius="15px"
                            w="100%"
                            _active={{
                                bg: "inherit",
                                transform: "none",
                                borderColor: "transparent",
                            }}
                            _focus={{
                                boxShadow: "none",
                            }}
                        >
                            <Flex>
                                {typeof prop.icon === "string" ? (
                                    <Icon>{prop.icon}</Icon>
                                ) : (
                                    <IconBox
                                        bg="teal.300"
                                        color="white"
                                        h="30px"
                                        w="30px"
                                        me="12px"
                                    >
                                        {prop.icon}
                                    </IconBox>
                                )}
                                <Text
                                    color={activeColor}
                                    my="auto"
                                    fontSize="sm"
                                >
                                    {document.documentElement.dir === "rtl"
                                        ? prop.rtlName
                                        : prop.name}
                                </Text>
                            </Flex>
                        </Button>
                    ) : (
                        <Button
                            boxSize="initial"
                            justifyContent="flex-start"
                            alignItems="center"
                            bg="transparent"
                            mb={{
                                xl: "12px",
                            }}
                            mx={{
                                xl: "auto",
                            }}
                            py="12px"
                            ps={{
                                sm: "10px",
                                xl: "16px",
                            }}
                            borderRadius="15px"
                            w="100%"
                            _active={{
                                bg: "inherit",
                                transform: "none",
                                borderColor: "transparent",
                            }}
                            _focus={{
                                boxShadow: "none",
                            }}
                        >
                            <Flex>
                                {typeof prop.icon === "string" ? (
                                    <Icon>{prop.icon}</Icon>
                                ) : (
                                    <IconBox
                                        bg={inactiveBg}
                                        color="teal.300"
                                        h="30px"
                                        w="30px"
                                        me="12px"
                                    >
                                        {prop.icon}
                                    </IconBox>
                                )}
                                <Text
                                    color={inactiveColor}
                                    my="auto"
                                    fontSize="sm"
                                >
                                    {document.documentElement.dir === "rtl"
                                        ? prop.rtlName
                                        : prop.name}
                                </Text>
                            </Flex>
                        </Button>
                    )}
                </NavLink>
            );
        });
    };

    const links = <>{createLinks(routes)}</>;

    return (
        <>
            <Box pt={"25px"} mb="12px">
                <Link
                    href={`${process.env.PUBLIC_URL}/`}
                    display="flex"
                    lineHeight="100%"
                    mb="30px"
                    fontWeight="bold"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="11px"
                >
                    <Image w="28px" me="16px" src={signInImage} />
                    <Text fontSize="sm" mt="3px" lineHeight={1.5}>
                        LAYANAN
                        <br></br>
                        KEPENDUDUKAN
                    </Text>
                </Link>
                <Separator></Separator>
            </Box>
            <Stack direction="column" mb="40px" overflowY={"scroll  "}>
                <Box>{links}</Box>
            </Stack>
        </>
    );
};

export default SidebarContent;
