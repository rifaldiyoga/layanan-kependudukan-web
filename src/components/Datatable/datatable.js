import {
    AbsoluteCenter,
    Button,
    Center,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormLabel,
    Icon,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";

import { useMemo, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
    TiArrowSortedDown,
    TiArrowSortedUp,
    TiArrowUnsorted,
} from "react-icons/ti";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

import { CustomDatePicker } from "components/Inputs/DatePicker";
import SearchSelect from "components/Select/SearchSelect";
import { statusPengajuan } from "constants";
import { Field, Form, Formik } from "formik";
import {
    FaEye,
    FaFilter,
    FaPencilAlt,
    FaPrint,
    FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const defaultActions = (actionType, path, row, setSelectedId, onOpen) => {
    if (actionType == "print")
        return (
            <Flex justify="center" flex="1">
                <Link to={"/admin" + path + "/" + row.original.id}>
                    <Button p="0px" bg="transparent">
                        <Flex cursor="pointer" align="center" p="6px">
                            <Icon as={FaEye} />
                        </Flex>
                    </Button>
                </Link>

                <Link
                    to={"/surat" + path + "/" + row.original.id}
                    target="_blank"
                >
                    <Button p="0px" bg="transparent">
                        <Flex cursor="pointer" align="center" p="6px">
                            <Icon as={FaPrint} />
                        </Flex>
                    </Button>
                </Link>
            </Flex>
        );
    if (actionType == "view_only")
        return (
            <Flex justify="center" flex="1">
                <Link to={"/admin" + path + "/" + row.original.id}>
                    <Button p="0px" bg="transparent">
                        <Flex cursor="pointer" align="center" p="6px">
                            <Icon as={FaEye} />
                        </Flex>
                    </Button>
                </Link>
            </Flex>
        );
    if (actionType == "default")
        return (
            <Flex justify="center" flex="1">
                <Link to={"/admin" + path + "/" + row.original.id}>
                    <Button p="0px" bg="transparent">
                        <Flex cursor="pointer" align="center" p="6px">
                            <Icon as={FaEye} />
                        </Flex>
                    </Button>
                </Link>
                <Link to={"/admin" + path + "/" + row.original.id}>
                    <Button p="0px" bg="transparent">
                        <Flex cursor="pointer" align="center" p="6px">
                            <Icon as={FaPencilAlt} />
                        </Flex>
                    </Button>
                </Link>

                <Button
                    p="0px"
                    bg="transparent"
                    me={{ md: "12px" }}
                    onClick={() => {
                        setSelectedId(row.original.id);
                        onOpen();
                    }}
                >
                    <Flex
                        color="red.500"
                        cursor="pointer"
                        align="center"
                        p="6px"
                    >
                        <Icon as={FaTrashAlt} />
                    </Flex>
                </Button>
            </Flex>
        );
};

const DatePickers = ({ field, form, ...props }) => {
    return (
        <CustomDatePicker
            {...field}
            {...props}
            form={form}
            field={field}
            borderRadius="15px"
            fontSize="sm"
            size="lg"
        />
    );
};

const Inputs = ({ field, form, ...props }) => {
    return (
        <Input
            {...field}
            {...props}
            borderRadius="15px"
            fontSize="sm"
            size="lg"
        />
    );
};

function SearchTable1(props) {
    const {
        columnsData,
        tableData,
        path,
        onDelete,
        onFilter,
        initialValues,
        actionType = "default",
        status,
    } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    const columns = useMemo(() => columnsData, []);
    const data = useMemo(() => tableData, [tableData]);

    const handleDelete = (id) => {
        onDelete(id);
    };

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        gotoPage,
        pageCount,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        setPageSize,
        setGlobalFilter,
        state,
    } = tableInstance;

    const createPages = (count) => {
        let arrPageCount = [];

        for (let i = 1; i <= count; i++) {
            arrPageCount.push(i);
        }

        return arrPageCount;
    };

    const { pageIndex, pageSize, globalFilter } = state;

    return (
        <>
            <Flex
                direction="column"
                w="100%"
                overflowX={{ sm: "scroll", lg: "hidden" }}
            >
                <Flex justify="space-between" align="center" w="100%" px="22px">
                    <Stack
                        direction={{ sm: "column", md: "row" }}
                        spacing={{ sm: "4px", md: "12px" }}
                        align="center"
                        me="12px"
                        my="24px"
                        minW={{ sm: "100px", md: "200px" }}
                    >
                        <Select
                            value={pageSize}
                            onChange={(e) =>
                                setPageSize(Number(e.target.value))
                            }
                            color="gray.500"
                            size="sm"
                            borderRadius="12px"
                            maxW="75px"
                            cursor="pointer"
                        >
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                        </Select>
                        <Text
                            fontSize="xs"
                            color="gray.400"
                            fontWeight="normal"
                        >
                            entries per page
                        </Text>
                    </Stack>
                    <Flex>
                        <Input
                            type="text"
                            placeholder="Search..."
                            minW="75px"
                            maxW="175px"
                            fontSize="sm"
                            _focus={{ borderColor: "teal.300" }}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                        {onFilter && (
                            <IconButton
                                ms="16px"
                                icon={<FaFilter />}
                                variant="outline"
                                borderRadius="6px"
                                color="gray.400"
                                onClick={() => {
                                    setOpenDrawer(true);
                                }}
                            />
                        )}
                    </Flex>
                </Flex>
                <Table
                    {...getTableProps()}
                    variant="striped"
                    color="gray.700"
                    mb="24px"
                >
                    <Thead>
                        {headerGroups.map((headerGroup) => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <Th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                        pe="0px"
                                    >
                                        <Flex
                                            justify="space-between"
                                            align="center"
                                            fontSize={{
                                                sm: "10px",
                                                lg: "12px",
                                            }}
                                            color="gray.400"
                                        >
                                            {column.render("Header")}
                                            <Icon
                                                w={{ sm: "10px", md: "14px" }}
                                                h={{ sm: "10px", md: "14px" }}
                                                color={
                                                    columns.isSorted
                                                        ? "gray.500"
                                                        : "gray.400"
                                                }
                                                float="right"
                                                as={
                                                    column.isSorted
                                                        ? column.isSortedDesc
                                                            ? TiArrowSortedDown
                                                            : TiArrowSortedUp
                                                        : TiArrowUnsorted
                                                }
                                            />
                                        </Flex>
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    {pageCount == 0 ? (
                        <Tbody>
                            <Tr>
                                <Td colSpan={columnsData.length}>
                                    <Center>
                                        <Text>Tidak Ada Data</Text>
                                    </Center>
                                </Td>
                            </Tr>
                        </Tbody>
                    ) : (
                        ""
                    )}
                    <Tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <Tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <Td
                                                {...cell.getCellProps()}
                                                w={
                                                    cell.column.id == "action"
                                                        ? "40px"
                                                        : null
                                                }
                                                fontSize={{ sm: "14px" }}
                                            >
                                                {cell.column.id != "action" &&
                                                    cell.render("Cell")}

                                                {cell.column.id == "action" &&
                                                    defaultActions(
                                                        actionType,
                                                        path,
                                                        row,
                                                        setSelectedId,
                                                        onOpen
                                                    )}
                                            </Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
                <Flex
                    direction={{ sm: "column", md: "row" }}
                    justify="space-between"
                    align="center"
                    px="22px"
                    w="100%"
                >
                    <Text
                        fontSize="sm"
                        color="gray.500"
                        fontWeight="normal"
                        mb={{ sm: "24px", md: "0px" }}
                    >
                        Showing {pageSize * pageIndex + 1} to{" "}
                        {pageSize * (pageIndex + 1) <= tableData.length
                            ? pageSize * (pageIndex + 1)
                            : tableData.length}{" "}
                        of {tableData.length} entries
                    </Text>
                    <Stack
                        direction="row"
                        alignSelf="flex-end"
                        spacing="4px"
                        ms="auto"
                    >
                        <Button
                            variant="no-hover"
                            onClick={() => previousPage()}
                            transition="all .5s ease"
                            w="40px"
                            h="40px"
                            borderRadius="50%"
                            bg="#fff"
                            border="1px solid lightgray"
                            display={
                                pageSize === 5
                                    ? "none"
                                    : canPreviousPage
                                    ? "flex"
                                    : "none"
                            }
                            _hover={{
                                bg: "gray.200",
                                opacity: "0.7",
                                borderColor: "gray.500",
                            }}
                        >
                            <Icon
                                as={GrFormPrevious}
                                w="16px"
                                h="16px"
                                color="gray.400"
                            />
                        </Button>
                        {pageCount > 10 ? (
                            <NumberInput
                                max={tableData.length}
                                min={1}
                                w="75px"
                                mx="6px"
                                defaultValue="1"
                                value={pageIndex + 1}
                                onChange={(e) => gotoPage(e - 1)}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper
                                        onClick={() => nextPage()}
                                    />
                                    <NumberDecrementStepper
                                        onClick={() => previousPage()}
                                    />{" "}
                                </NumberInputStepper>
                            </NumberInput>
                        ) : (
                            createPages(pageCount).map((pageNumber) => {
                                return (
                                    <Button
                                        variant="no-hover"
                                        transition="all .5s ease"
                                        onClick={() => gotoPage(pageNumber - 1)}
                                        w="40px"
                                        h="40px"
                                        borderRadius="160px"
                                        bg={
                                            pageNumber === pageIndex + 1
                                                ? "teal.300"
                                                : "#fff"
                                        }
                                        border="1px solid lightgray"
                                        _hover={{
                                            bg: "gray.200",
                                            opacity: "0.7",
                                            borderColor: "gray.500",
                                        }}
                                    >
                                        <Text
                                            fontSize="xs"
                                            color={
                                                pageNumber === pageIndex + 1
                                                    ? "#fff"
                                                    : "gray.600"
                                            }
                                        >
                                            {pageNumber}
                                        </Text>
                                    </Button>
                                );
                            })
                        )}
                        <Button
                            variant="no-hover"
                            onClick={() => nextPage()}
                            transition="all .5s ease"
                            w="40px"
                            h="40px"
                            borderRadius="160px"
                            bg="#fff"
                            border="1px solid lightgray"
                            display={
                                pageSize === 5
                                    ? "none"
                                    : canNextPage
                                    ? "flex"
                                    : "none"
                            }
                            _hover={{
                                bg: "gray.200",
                                opacity: "0.7",
                                borderColor: "gray.500",
                            }}
                        >
                            <Icon
                                as={GrFormNext}
                                w="16px"
                                h="16px"
                                color="gray.400"
                            />
                        </Button>
                    </Stack>
                </Flex>
            </Flex>
            <AbsoluteCenter>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Hapus Data?</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Apakah anda yakin akan menghapus data ini?
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Tidak
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    onClose();
                                    handleDelete(selectedId);
                                }}
                            >
                                Hapus
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </AbsoluteCenter>
            <Formik
                initialValues={initialValues}
                validator={() => ({})}
                onSubmit={(values) => {
                    let data = {};

                    if (values.periode) {
                        data = {
                            ...data,
                            start_date: values.periode[0].format("YYYY-MM-DD"),
                            end_date: values.periode[1].format(
                                "YYYY-MM-DD HH:mm:ss"
                            ),
                        };
                    }

                    if (values.status) {
                        data = {
                            ...data,
                            status: values.status,
                        };
                    }

                    onFilter(data);
                    setOpenDrawer(false);
                }}
            >
                {({
                    errors,
                    touched,
                    isSubmitting,
                    setFieldValue,
                    handleChange,
                    submitForm,
                    values,
                }) => {
                    return (
                        <Form flex="1">
                            <Drawer
                                isOpen={isOpenDrawer}
                                placement="right"
                                onClose={() => {
                                    setOpenDrawer(false);
                                }}
                                size="sm"
                            >
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerCloseButton />
                                    <DrawerHeader>Filter Data</DrawerHeader>
                                    <DrawerBody>
                                        <Flex direction="column">
                                            <Flex
                                                mb={"16px"}
                                                direction={"column"}
                                            >
                                                <FormLabel
                                                    ms="4px"
                                                    fontSize="sm"
                                                    fontWeight="normal"
                                                >
                                                    Periode
                                                </FormLabel>
                                                <Field
                                                    id="periode"
                                                    name="periode"
                                                    component={DatePickers}
                                                />
                                            </Flex>
                                            {status ? (
                                                <>
                                                    <FormLabel
                                                        ms="4px"
                                                        fontSize="sm"
                                                        fontWeight="normal"
                                                    >
                                                        Status
                                                    </FormLabel>
                                                    <Field
                                                        placeholder="Status Pengajuan"
                                                        name="status"
                                                        options={
                                                            statusPengajuan
                                                        }
                                                        component={SearchSelect}
                                                    />
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </Flex>
                                    </DrawerBody>
                                    <DrawerFooter>
                                        <Flex alignItems="center">
                                            <Button
                                                colorScheme="blue"
                                                flex={1}
                                                w={"100%"}
                                                type="submit"
                                                onClick={submitForm}
                                            >
                                                Submit
                                            </Button>
                                        </Flex>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}

export default SearchTable1;
