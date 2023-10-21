// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import Footer from "components/Footer/Footer.js";
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "admin-routes.js";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// Custom Chakra theme
import theme from "theme/theme.js";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import { useStateContext } from "context/ContextProvider";
import { Navigate } from "react-big-calendar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function Dashboard(props) {
    const history = useHistory();
    const { ...rest } = props;
    // states and functions
    const [sidebarVariant, setSidebarVariant] = useState("transparent");
    const [fixed, setFixed] = useState(false);
    const { token } = useStateContext();

    if (!token) {
        history.push({ pathname: "/auth/signin" });
    }

    const getActiveRoute = (routes) => {
        let activeRoute = "Default Brand Text";
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse) {
                let collapseActiveRoute = getActiveRoute(routes[i].views);
                if (collapseActiveRoute !== activeRoute) {
                    return collapseActiveRoute;
                }
            } else if (routes[i].category) {
                let categoryActiveRoute = getActiveRoute(routes[i].views);
                if (categoryActiveRoute !== activeRoute) {
                    return categoryActiveRoute;
                }
            } else {
                if (
                    window.location.href.indexOf(
                        routes[i].layout + routes[i].path
                    ) !== -1
                ) {
                    return routes[i].name;
                }
            }
        }
        return activeRoute;
    };

    // This changes navbar state(fixed or not)
    const getActiveNavbar = (routes) => {
        let activeNavbar = false;
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].category) {
                let categoryActiveNavbar = getActiveNavbar(routes[i].views);
                if (categoryActiveNavbar !== activeNavbar) {
                    return categoryActiveNavbar;
                }
            } else {
                if (
                    window.location.href.indexOf(
                        routes[i].layout + routes[i].path
                    ) !== -1
                ) {
                    if (routes[i].secondaryNavbar) {
                        return routes[i].secondaryNavbar;
                    }
                }
            }
        }
        return activeNavbar;
    };

    const getRoutes = (routes) => {
        const results = [];
        routes.forEach((prop, index) => {
            if (prop.collapse) {
                return getRoutes(prop.views);
            }
            if (prop.category) {
                results.push(getRoutes(prop.views));
            }
            if (prop.layout === "/admin") {
                if (prop.views != null) {
                    prop.views.forEach((propView, indexView) => {
                        results.push(
                            <Route
                                path={prop.layout + prop.path + propView.path}
                                component={propView.component}
                                key={`${index}` + `${indexView}`}
                            />
                        );
                    });
                }

                results.push(
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={index}
                    />
                );
            } else {
                return null;
            }
        });
        return results;
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    document.documentElement.dir = "ltr";
    // Chakra Color Mode
    return (
        <ChakraProvider theme={theme} resetCss={false}>
            <Sidebar
                routes={routes}
                logoText={"Layanan Kependudukan"}
                display="none"
                sidebarVariant={sidebarVariant}
                {...rest}
            />
            <MainPanel
                w={{
                    base: "100%",
                    xl: "calc(100% - 275px)",
                }}
            >
                <Portal>
                    <AdminNavbar
                        onOpen={onOpen}
                        logoText={"LAYANAN KEPENDUDUKAN"}
                        brandText={getActiveRoute(routes)}
                        secondary={getActiveNavbar(routes)}
                        fixed={fixed}
                        {...rest}
                    />
                </Portal>
                <PanelContent>
                    <PanelContainer>
                        <Switch>
                            {getRoutes(routes)}
                            <Redirect from="/admin" to="/admin/dashboard" />
                        </Switch>
                    </PanelContainer>
                </PanelContent>
                <Footer />
                {/* <Portal>
                    <FixedPlugin
                        secondary={getActiveNavbar(routes)}
                        fixed={fixed}
                        onOpen={onOpen}
                    />
                </Portal> */}
                <Configurator
                    secondary={getActiveNavbar(routes)}
                    isOpen={isOpen}
                    onClose={onClose}
                    isChecked={fixed}
                    onSwitch={(value) => {
                        setFixed(value);
                    }}
                    onOpaque={() => setSidebarVariant("opaque")}
                    onTransparent={() => setSidebarVariant("transparent")}
                />
            </MainPanel>
        </ChakraProvider>
    );
}
