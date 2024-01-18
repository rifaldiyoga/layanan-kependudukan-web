import signInImage from "assets/img/logo_kota_batu.png";
import axiosClient from "axios-client";
import { Header } from "components/Surat/Header";
import { SubHeader } from "components/Surat/SubHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Helper from "../../helper/Helper";
import { statusNikah } from "constants";
import "./style.css";
import { Footer } from "components/Surat/Footer";
const {
    Image,
    Flex,
    Text,
    Box,
    Center,
    Divider,
    Table,
    Tbody,
    Tr,
    Td,
    Spacer,
} = require("@chakra-ui/react");

const PernahMenikahTemplate = () => {
    let { id } = useParams();
    const [datas, setDatas] = useState(null);
    const [sistem, setSistem] = useState([]);

    const getSistem = () => {
        axiosClient
            .get("/v1/sistems/1")
            .then(({ data }) => {
                const penduduks = data.data;
                console.log(data);
                setSistem(penduduks);
            })
            .catch(() => {});
    };

    const getDatas = () => {
        axiosClient
            .get("/v1/pernah_menikahs/" + id)
            .then(({ data }) => {
                console.log(data.data);
                console.log(datas);
                setDatas(data.data);
            })
            .catch(() => {});
    };

    useEffect(() => {
        getDatas();
        getSistem();
    }, []);

    console.log(datas);

    return datas ? (
        <Flex
            direction="column"
            p={"2cm"}
            bg={"white"}
            w={"21cm"}
            style={{
                fontFamily: "Bookman Old Style",
                fontSize: 14,
            }}
        >
            <Header />
            <SubHeader
                name="SURAT KETERANGAN PERNAH MENIKAH"
                no_surat={datas.kode_surat}
                size={22}
            />
            <Text style={{ lineHeight: 1.5 }}>
                Yang bertanda tangan dibawah ini, Kepala {sistem?.nama}{" "}
                Kecamatan {sistem?.kecamatan?.name} Pemerintah{" "}
                {sistem?.kota?.name}, menerangkan bahwa :
            </Text>
            <Text>1. Suami</Text>
            <table fontSize={14}>
                <tbody>
                    <tr p={8}>
                        <td>Nama</td>
                        <td>:</td>
                        <td style={{ fontWeight: "bold" }}>
                            {" "}
                            {datas.suami.fullname.toUpperCase()}
                        </td>
                    </tr>

                    <tr>
                        <td>Tempat / Tanggal Lahir</td>
                        <td>:</td>
                        <td>
                            {Helper.capitalizeFirstLetter(
                                datas.suami.birth_place
                            )}
                            , {Helper.formatDate(datas.suami.birth_date)}
                        </td>
                    </tr>
                    <tr>
                        <td>Agama</td>
                        <td>:</td>
                        <td>
                            {Helper.capitalizeFirstLetter(
                                datas.suami.religion.name
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Pekerjaan</td>
                        <td>:</td>
                        <td>{datas.suami.job.name}</td>
                    </tr>

                    <tr>
                        <td>Kewarganegaraan</td>
                        <td>:</td>
                        <td>{datas.suami.nationality}</td>
                    </tr>
                    <tr>
                        <td>Alamat</td>
                        <td>:</td>
                        <td>
                            <text lineHeight={1.5}>
                                {Helper.capitalizeFirstLetter(
                                    datas.suami.address
                                )}{" "}
                                RT {datas.suami.rt.name} / RW{" "}
                                {datas.suami.rw.name} <br />
                                {datas.suami.kelurahan.name} Kecamatan{" "}
                                {Helper.capitalizeFirstLetter(
                                    datas.suami.kecamatan.name
                                )}{" "}
                                {Helper.capitalizeFirstLetter(
                                    datas.suami.kota.name
                                )}{" "}
                                {Helper.capitalizeFirstLetter(
                                    datas.suami.provinsi.name
                                )}
                            </text>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Text>2. Istri</Text>
            <table fontSize={14}>
                <tbody>
                    <tr p={8}>
                        <td>Nama</td>
                        <td>:</td>
                        <td style={{ fontWeight: "bold" }}>
                            {" "}
                            {datas.istri.fullname.toUpperCase()}
                        </td>
                    </tr>

                    <tr>
                        <td>Tempat / Tanggal Lahir</td>
                        <td>:</td>
                        <td>
                            {Helper.capitalizeFirstLetter(
                                datas.istri.birth_place
                            )}
                            , {Helper.formatDate(datas.istri.birth_date)}
                        </td>
                    </tr>
                    <tr>
                        <td>Agama</td>
                        <td>:</td>
                        <td>
                            {Helper.capitalizeFirstLetter(
                                datas.istri.religion.name
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Pekerjaan</td>
                        <td>:</td>
                        <td>{datas.istri.job.name}</td>
                    </tr>

                    <tr>
                        <td>Kewarganegaraan</td>
                        <td>:</td>
                        <td>{datas.istri.nationality}</td>
                    </tr>
                    <tr>
                        <td>Alamat</td>
                        <td>:</td>
                        <td>
                            <text lineHeight={1.5}>
                                {Helper.capitalizeFirstLetter(
                                    datas.istri.address
                                )}{" "}
                                RT {datas.istri.rt.name} / RW{" "}
                                {datas.istri.rw.name} <br />
                                {datas.istri.kelurahan.name} Kecamatan{" "}
                                {Helper.capitalizeFirstLetter(
                                    datas.istri.kecamatan.name
                                )}{" "}
                                {Helper.capitalizeFirstLetter(
                                    datas.istri.kota.name
                                )}{" "}
                                {Helper.capitalizeFirstLetter(
                                    datas.istri.provinsi.name
                                )}
                            </text>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Text textAlign="justify" style={{ lineHeight: 2 }}>
                Ke dua nama di atas adalah benar-benar penduduk Kelurahan
                Ngaglik Kecamatan {sistem?.kecamatan?.name} {sistem?.kota?.name}
                .
                <ol>
                    <li>
                        Menerangkan bahwa berdasarkan pengantar dari ketua RT{" "}
                        {datas.penduduk.rt.name} RW {datas.penduduk.rw.name}{" "}
                        serta surat pernyataan dari yang bersangkutan bahwa
                        benar-benar <b>Pernah Menikah</b> pada tanggal{" "}
                        {Helper.formatDate(datas.penduduk.maried_date)}.
                    </li>
                    <li>
                        Surat Keterangan ini digunakan untuk{" "}
                        <b>{datas.keterangan}</b>.
                    </li>
                </ol>
                Demikian surat keterangan ini dibuat dengan sebenarnya dan agar
                dapat dipergunakan sebagimana mestinya.
            </Text>
            <Text color={"white"}>\n</Text>
            <Footer penduduk={datas.penduduk} isUser={false} id={6} />
        </Flex>
    ) : (
        <Flex />
    );
};

export default PernahMenikahTemplate;
