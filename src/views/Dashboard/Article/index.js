// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListView from "../../../components/Layout/ListView";
import axiosClient from "axios-client";
import { Redirect, Route, Switch } from "react-router-dom";

function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        setLoading(true);
        axiosClient
            .get("/v1/articles")
            .then(({ data }) => {
                setLoading(false);
                setArticles(data.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteArticle = (id) => {
        axiosClient
            .delete("/v1/articles/" + id)
            .then((response) => {
                if (response.status == 200) {
                    console.log(response);
                    getDatas();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const columnsData1 = [
        {
            Header: "Judul",
            accessor: "title",
        },
        {
            Header: "Author",
            accessor: "author",
        },

        {
            Header: "Tgl Dibuat",
            accessor: "created_at",
        },
        {
            Header: "Action",
            accessor: "action",
        },
    ];

    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <ListView
                title={"Daftar Artikel Berita"}
                captions={columnsData1}
                data={articles}
                loading={loading}
                path="/articles"
                onDelete={deleteArticle}
                isAdd={true}
            />
        </Flex>
    );
}

export default Articles;
