// Chakra imports
import {
    Button,
    Center,
    Flex,
    Spacer,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import SearchTable1 from "components/Datatable/datatable";
import { useEffect, useState } from "react";
import {
    Link,
    NavLink,
    Redirect,
} from "react-router-dom/cjs/react-router-dom.min";

const ListView = ({
    title,
    captions,
    data,
    loading,
    path,
    onDelete,
    onFilter,
    initialValues,
    actionType,
    status,
    isAdd,
    isPrint,
}) => {
    const [list, setData] = useState([]);

    useEffect(() => {
        setData(data);
    }, [data]);

    const textColor = useColorModeValue("gray.700", "white");
    const bgButton = useColorModeValue(
        "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
        "gray.800"
    );

    return (
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <Flex p="16px">
                <Text
                    fontSize="xl"
                    color={textColor}
                    fontWeight="bold"
                    flex="1"
                >
                    {title}
                </Text>
                <Spacer />
                {isAdd && (
                    <Link to={"/admin" + path + "/new"}>
                        <Button
                            bg={bgButton}
                            color="white"
                            fontSize="xs"
                            variant="no-hover"
                        >
                            ADD NEW
                        </Button>
                    </Link>
                )}
                {isPrint && (
                    <Link
                        to={
                            "/surat/laporan?start_date=" +
                            initialValues.start_date +
                            "&end_date=" +
                            initialValues.end_date
                        }
                        target="_blank"
                    >
                        <Button
                            bg={bgButton}
                            color="white"
                            fontSize="xs"
                            variant="no-hover"
                        >
                            Lihat Laporan
                        </Button>
                    </Link>
                )}
            </Flex>
            <CardBody>
                <SearchTable1
                    tableData={list}
                    columnsData={captions}
                    path={path}
                    onDelete={onDelete}
                    onFilter={onFilter}
                    actionType={actionType}
                    initialValues={initialValues}
                    status={status}
                    isAdd={isAdd}
                />
            </CardBody>
        </Card>
    );
};

export default ListView;
