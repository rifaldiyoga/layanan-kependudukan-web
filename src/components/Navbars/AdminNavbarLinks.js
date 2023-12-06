// Chakra Icons
import { BellIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import { useStateContext } from "context/ContextProvider";
import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function HeaderLinks(props) {
    const history = useHistory();
    const { variant, children, fixed, secondary, onOpen, ...rest } = props;
    const { name, setToken } = useStateContext();

    // Chakra Color Mode
    let mainTeal = useColorModeValue("teal.300", "teal.300");
    let inputBg = useColorModeValue("white", "gray.800");
    let mainText = useColorModeValue("gray.700", "gray.200");
    let navbarIcon = useColorModeValue("gray.500", "gray.200");
    let searchIcon = useColorModeValue("gray.700", "gray.200");

    if (secondary) {
        navbarIcon = "white";
        mainText = "white";
    }
    const settingsRef = React.useRef();

    const onLogout = (e) => {
        setToken(null);
        history.push({ pathname: "/auth/signin" });
    };

    return (
        <Flex
            pe={{ sm: "0px", md: "16px" }}
            w={{ sm: "100%", md: "auto" }}
            alignItems="center"
            flexDirection="row"
        >
            <Menu>
                <MenuButton>
                    <Button
                        ms="0px"
                        px="0px"
                        me={{ sm: "2px", md: "16px" }}
                        color={navbarIcon}
                        variant="transparent-with-icon"
                        rightIcon={
                            document.documentElement.dir ? (
                                ""
                            ) : (
                                <ProfileIcon
                                    color={navbarIcon}
                                    w="22px"
                                    h="22px"
                                    me="0px"
                                />
                            )
                        }
                        leftIcon={
                            document.documentElement.dir ? (
                                <ProfileIcon
                                    color={navbarIcon}
                                    w="22px"
                                    h="22px"
                                    me="0px"
                                />
                            ) : (
                                ""
                            )
                        }
                    >
                        <Text display={{ sm: "none", md: "flex" }}>{name}</Text>
                    </Button>
                </MenuButton>
                <MenuList p="16px 8px">
                    <Flex flexDirection="column">
                        <MenuItem borderRadius="8px" onClick={onLogout}>
                            <Button
                                ms="0px"
                                px="0px"
                                me={{ sm: "2px", md: "16px" }}
                                color={navbarIcon}
                                variant="transparent-with-icon"
                                rightIcon={
                                    document.documentElement.dir ? (
                                        ""
                                    ) : (
                                        <ProfileIcon
                                            color={navbarIcon}
                                            w="22px"
                                            h="22px"
                                            me="0px"
                                        />
                                    )
                                }
                                leftIcon={
                                    document.documentElement.dir ? (
                                        <ProfileIcon
                                            color={navbarIcon}
                                            w="22px"
                                            h="22px"
                                            me="0px"
                                        />
                                    ) : (
                                        ""
                                    )
                                }
                            >
                                <Text display={{ sm: "none", md: "flex" }}>
                                    Logout
                                </Text>
                            </Button>
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton>
                    <BellIcon color={navbarIcon} w="18px" h="18px" />
                </MenuButton>
                <MenuList p="16px 8px">
                    <Flex flexDirection="column">
                        <MenuItem borderRadius="8px" mb="10px">
                            <ItemContent
                                time="13 minutes ago"
                                info="from Alicia"
                                boldInfo="New Message"
                                aName="Alicia"
                                aSrc={avatar1}
                            />
                        </MenuItem>
                        <MenuItem borderRadius="8px" mb="10px">
                            <ItemContent
                                time="2 days ago"
                                info="by Josh Henry"
                                boldInfo="New Album"
                                aName="Josh Henry"
                                aSrc={avatar2}
                            />
                        </MenuItem>
                        <MenuItem borderRadius="8px">
                            <ItemContent
                                time="3 days ago"
                                info="Payment succesfully completed!"
                                boldInfo=""
                                aName="Kara"
                                aSrc={avatar3}
                            />
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>
        </Flex>
    );
}

HeaderLinks.propTypes = {
    variant: PropTypes.string,
    fixed: PropTypes.bool,
    secondary: PropTypes.bool,
    onOpen: PropTypes.func,
};
