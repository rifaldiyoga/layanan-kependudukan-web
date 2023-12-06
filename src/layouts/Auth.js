// chakra imports
import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
import Footer from "components/Footer/Footer.js";
// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "auth-routes.js";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "theme/theme.js";
import { useStateContext } from "context/ContextProvider";
import { requestForToken } from "fcm";

export default function Pages(props) {
    const { ...rest } = props;
    const { token } = useStateContext();

    // ref for the wrapper div
    const wrapper = React.createRef();

    if (token) {
        return <Redirect to="/admin/dashboard" />;
    }

    React.useEffect(() => {
        document.body.style.overflow = "unset";
        // Specify how to clean up after this effect:
        return function cleanup() {};
    });

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.collapse) {
                return getRoutes(prop.views);
            }
            if (prop.category === "account") {
                return getRoutes(prop.views);
            }
            if (prop.layout === "/auth") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    const navRef = React.useRef();
    document.documentElement.dir = "ltr";
    return (
        <ChakraProvider theme={theme} resetCss={false} w="100%">
            <Box ref={navRef} w="100%">
                <Box w="100%">
                    <Box ref={wrapper} w="100%">
                        <Switch>{getRoutes(routes)}</Switch>
                    </Box>
                </Box>
                <Box px="24px" mx="auto" width="1044px" maxW="100%">
                    <Footer />
                </Box>
            </Box>
        </ChakraProvider>
    );
}
