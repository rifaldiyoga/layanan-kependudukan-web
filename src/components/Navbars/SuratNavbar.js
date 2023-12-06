// Chakra imports
import {
    Box,
    Button,
    Flex,
    HStack,
    Image,
    Link,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import {
    CreativeTimLogo,
    DocumentIcon,
    HomeIcon,
    PersonIcon,
    RocketIcon,
} from "components/Icons/Icons";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import routes from "admin-routes.js";
import { FaPrint } from "react-icons/fa";
import signInImage from "assets/img/logo_kota_batu.png";

export default function SuratNavbar(props) {
    const [open, setOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setOpen(!open);
    };
    const { logo, logoText, secondary, ...rest } = props;
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    };
    // Chakra color mode
    let navbarIcon = useColorModeValue("gray.700", "gray.200");
    let mainText = useColorModeValue("gray.700", "gray.200");
    let navbarBg = useColorModeValue(
        "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
        "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
    );
    let navbarBorder = useColorModeValue(
        "1.5px solid #FFFFFF",
        "1.5px solid rgba(255, 255, 255, 0.31)"
    );
    let navbarShadow = useColorModeValue(
        "0px 7px 23px rgba(0, 0, 0, 0.05)",
        "none"
    );
    let navbarFilter = useColorModeValue(
        "none",
        "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
    );
    let navbarBackdrop = "blur(21px)";
    let bgButton = useColorModeValue(
        "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
        "gray.800"
    );
    let navbarPosition = "";
    let colorButton = "white";
    if (props.secondary === true) {
        navbarIcon = "white";
        navbarBg = "none";
        navbarBorder = "none";
        navbarShadow = "initial";
        navbarFilter = "initial";
        navbarBackdrop = "none";
        bgButton = "white";
        colorButton = "gray.700";
        mainText = "white";
        navbarPosition = "absolute";
    }
    var brand = (
        <Link
            href={`${process.env.PUBLIC_URL}/`}
            display="flex"
            lineHeight="100%"
            fontWeight="bold"
            justifyContent="center"
            alignItems="center"
            color={mainText}
        >
            <Image w="28px" me="16px" ms="16px" src={signInImage} />
            <Text fontSize="sm" mt="3px" lineHeight={1.5}>
                LAYANAN
                <br></br>
                KEPENDUDUKAN
            </Text>
        </Link>
    );
    var linksAuth = (
        <HStack display={{ sm: "none", lg: "flex" }}>
            <NavLink to="/admin/dashboard">
                <Button
                    fontSize="sm"
                    ms="0px"
                    px="0px"
                    me={{ sm: "2px", md: "16px" }}
                    color={navbarIcon}
                    variant="transparent-with-icon"
                    leftIcon={
                        <HomeIcon
                            color={navbarIcon}
                            w="12px"
                            h="12px"
                            me="0px"
                        />
                    }
                >
                    <Text>Dashboard</Text>
                </Button>
            </NavLink>
            <NavLink to="/admin/profile">
                <Button
                    fontSize="sm"
                    ms="0px"
                    px="0px"
                    me={{ sm: "2px", md: "16px" }}
                    color={navbarIcon}
                    variant="transparent-with-icon"
                    leftIcon={
                        <PersonIcon
                            color={navbarIcon}
                            w="12px"
                            h="12px"
                            me="0px"
                        />
                    }
                >
                    <Text>Profile</Text>
                </Button>
            </NavLink>
            <NavLink to="/auth/signup">
                <Button
                    fontSize="sm"
                    ms="0px"
                    px="0px"
                    me={{ sm: "2px", md: "16px" }}
                    color={navbarIcon}
                    variant="transparent-with-icon"
                    leftIcon={
                        <RocketIcon
                            color={navbarIcon}
                            w="12px"
                            h="12px"
                            me="0px"
                        />
                    }
                >
                    <Text>Sign Up</Text>
                </Button>
            </NavLink>
            <NavLink to="/auth/signin">
                <Button
                    fontSize="sm"
                    ms="0px"
                    px="0px"
                    me={{ sm: "2px", md: "16px" }}
                    color={navbarIcon}
                    variant="transparent-with-icon"
                    leftIcon={
                        <DocumentIcon
                            color={navbarIcon}
                            w="12px"
                            h="12px"
                            me="0px"
                        />
                    }
                >
                    <Text>Sign In</Text>
                </Button>
            </NavLink>
        </HStack>
    );
    return (
        <Flex
            position={navbarPosition}
            top="16px"
            background={navbarBg}
            border={navbarBorder}
            boxShadow={navbarShadow}
            filter={navbarFilter}
            backdropFilter={navbarBackdrop}
            borderRadius="15px"
            px="16px"
            py="22px"
            mx="auto"
            alignItems="center"
        >
            <Flex w="100%" justifyContent={"space-between"}>
                {brand}

                <Button
                    leftIcon={<FaPrint />}
                    colorScheme="blue"
                    px="30px"
                    onClick={() => props.onPrint()}
                >
                    Print
                </Button>
            </Flex>
        </Flex>
    );
}

SuratNavbar.propTypes = {
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    brandText: PropTypes.string,
};
