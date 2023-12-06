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

const TanahTemplate = () => {
    let { id } = useParams();
    const [datas, setDatas] = useState(null);
    const [saksis, setSaksi] = useState([]);

    const getDatas = () => {
        axiosClient
            .get("/v1/tanahs/" + id)
            .then(({ data }) => {
                setDatas(data.data);
            })
            .catch(() => {});
    };

    useEffect(() => {
        getDatas();
    }, []);

    console.log(datas);

    return datas ? (
        <Flex
            direction="column"
            p={"2cm"}
            bg={"white"}
            w={"21cm"}
            h={"29.7cm"}
            style={{
                fontFamily: "Bookman Old Style",
                fontSize: 14,
            }}
        >
            <Header />
            <SubHeader
                name="SURAT KETERANGAN KEPEMELIKAN TANAH"
                no_surat={datas.kode_surat}
                size={22}
            />
            <Text style={{ lineHeight: 1.5 }}>
                Yang bertanda tangan dibawah ini, Lurah Ngaglik Kecamatan Batu
                Pemerintah Kota Batu, menerangkan bahwa berdasarkan Surat
                Pernyataan yang dibuat pada tanggal {Helper.formatDate(Date())}{" "}
                oleh :
            </Text>
            <table fontSize={14}>
                <tbody>
                    <tr p={8}>
                        <td>Nama</td>
                        <td>:</td>
                        <td style={{ fontWeight: "bold" }}>
                            {" "}
                            {datas.penduduk.fullname.toUpperCase()}
                        </td>
                    </tr>
                    <tr>
                        <td>Tempat / Tanggal Lahir</td>
                        <td>:</td>
                        <td>
                            {Helper.capitalizeFirstLetter(
                                datas.penduduk.birth_place
                            )}
                            , {Helper.formatDate(datas.penduduk.birth_date)}
                        </td>
                    </tr>
                    <tr>
                        <td>Pekerjaan</td>
                        <td>:</td>
                        <td>{datas.penduduk.job.name}</td>
                    </tr>
                    <tr>
                        <td>Alamat</td>
                        <td>:</td>
                        <td>
                            <text lineHeight={1.5}>
                                {Helper.capitalizeFirstLetter(
                                    datas.penduduk.address
                                )}{" "}
                                RT {datas.penduduk.rt.name} / RW{" "}
                                {datas.penduduk.rw.name} <br />
                                {datas.penduduk.kelurahan.name} Kecamatan{" "}
                                {Helper.capitalizeFirstLetter(
                                    datas.penduduk.kecamatan.name
                                )}{" "}
                                {Helper.capitalizeFirstLetter(
                                    datas.penduduk.kota.name
                                )}{" "}
                                {Helper.capitalizeFirstLetter(
                                    datas.penduduk.provinsi.name
                                )}
                            </text>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Text>
                Bahwa setelah dicocokan dengan buku Registrasi Kelurahan
                Ngaglik, maka tanah dengan SPPT PBB No. . Atas nama dengan luas{" "}
                {datas.luas_tanah} yang terletak di {datas.lokasi_tanah} dengan
                batas-batas sebagai berikut :
            </Text>
            <table fontSize={14}>
                <tbody>
                    <tr>
                        <td width="30%">Batas Utara</td>
                        <td width="4px">:</td>
                        <td>{datas.batas_utara}</td>
                    </tr>
                    <tr>
                        <td>Batas Selatan</td>
                        <td>:</td>
                        <td>{datas.batas_selatan}</td>
                    </tr>
                    <tr>
                        <td>Batas Timur</td>
                        <td>:</td>
                        <td>{datas.batas_timur}</td>
                    </tr>
                    <tr>
                        <td>Batas Barat</td>
                        <td>:</td>
                        <td>{datas.batas_barat}</td>
                    </tr>
                </tbody>
            </table>
            <Text textAlign="justify" style={{ lineHeight: 2 }}>
                Demikian surat keterangan ini dibuat dengan sebenarnya dan agar
                dapat dipergunakan sebagimana mestinya.
            </Text>
            <Text color={"white"}>\n</Text>
            <Footer
                penduduk={datas.penduduk}
                isUser={false}
                isSaksi={true}
                saksi={[datas.saksi1, datas.saksi2]}
            />
        </Flex>
    ) : (
        <Flex />
    );
};

export default TanahTemplate;
