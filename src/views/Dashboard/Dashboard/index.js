// Chakra imports
import { Flex, Grid, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
// assets
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
// Custom icons
import axiosClient from "axios-client";
import { PersonIcon } from "components/Icons/Icons";
import { DocumentIcon } from "components/Icons/Icons.js";
import { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import ActiveUsers from "./components/ActiveUsers";
import MiniStatistics from "./components/MiniStatistics";
import SalesOverview from "./components/SalesOverview";

export default function Dashboard() {
    const iconBoxInside = useColorModeValue("white", "white");

    const [dashboards, setDashboards] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/dashboards")
            .then(({ data }) => {
                console.log(data);
                setLoading(false);
                setDashboards(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
            <SimpleGrid columns={{ sm: 1, md: 3, xl: 3 }} spacing="24px">
                <MiniStatistics
                    title={"Data Penduduk"}
                    amount={dashboards.penduduk}
                    icon={
                        <PersonIcon
                            h={"24px"}
                            w={"24px"}
                            color={iconBoxInside}
                        />
                    }
                />
                <MiniStatistics
                    title={"Data Keluraga"}
                    amount={dashboards.keluarga}
                    icon={<BsPeopleFill color={iconBoxInside} />}
                />
                <MiniStatistics
                    title={"Data Pengajuan Hari Ini"}
                    amount={dashboards.pengajuan}
                    percentage={-14}
                    icon={
                        <DocumentIcon
                            h={"24px"}
                            w={"24px"}
                            color={iconBoxInside}
                        />
                    }
                />
            </SimpleGrid>

            {/* <Grid
                templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
                templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
                gap="24px"
                my="26px"
                mb={{ lg: "26px" }}
            >
                <ActiveUsers
                    title={"Active Users"}
                    percentage={23}
                    chart={<BarChart />}
                />
                <SalesOverview
                    title={"Sales Overview"}
                    percentage={5}
                    chart={<LineChart />}
                />
            </Grid> */}
        </Flex>
    );
}
