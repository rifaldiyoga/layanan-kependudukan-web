// chakra imports
import { Box, Center, ChakraProvider } from "@chakra-ui/react";
// core components
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SuratNavbar from "components/Navbars/SuratNavbar";
import { useStateContext } from "context/ContextProvider";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useReactToPrint } from "react-to-print";
import routes from "surat-routes.js";
import theme from "theme/theme.js";
import Header from "views/Dashboard/Profile/components/Header";

export default function Pages(props) {
    const { ...rest } = props;
    const history = useHistory();
    const { token } = useStateContext();

    if (!token) {
        history.push({ pathname: "/auth/signin" });
    }
    // ref for the wrapper div
    const wrapper = React.createRef();

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
            if (prop.layout === "/surat") {
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
    const handlePrint = useReactToPrint({
        // pageStyle: `@media print {
        //     @page {
        //       size: 21cm 29.7cm;
        //       margin-top: 2cm;
        //     }
        //   }`,
        content: () => navRef.current,
    });
    return (
        <ChakraProvider theme={theme} resetCss={false} w="100%">
            <SuratNavbar
                onPrint={handlePrint}
                logoText={"LAYANAN KEPENDUDUKAN"}
            />
            <Center marginTop="16px">
                <Box w={{ sm: "none", lg: "flex" }}>
                    <Box w="100%" ref={navRef}>
                        <Box ref={wrapper} w="100%">
                            <Switch>{getRoutes(routes)}</Switch>
                        </Box>
                    </Box>
                </Box>
            </Center>
        </ChakraProvider>
    );
}
