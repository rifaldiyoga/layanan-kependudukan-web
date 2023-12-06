import axiosClient from "axios-client";
import { Footer } from "components/Surat/Footer";
import { Header } from "components/Surat/Header";
import { SubHeader } from "components/Surat/SubHeader";
import { statusNikah } from "constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Helper from "../../helper/Helper";
import "./style.css";
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

const DomisisliTemplate = () => {
    let { id } = useParams();
    const [datas, setDatas] = useState(null);

    const getDatas = () => {
        axiosClient
            .get("/v1/domisilis/" + id)
            .then(({ data }) => {
                console.log(data.data);
                console.log(datas);
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
                name="SURAT KETERANGAN DOMISLI"
                no_surat={datas.kode_surat}
                size={22}
            />
            <Text style={{ lineHeight: 1.5 }}>
                Yang bertanda tangan dibawah ini, Lurah Ngaglik Kecamatan Batu
                Pemerintah Kota Batu, menerangkan bahwa :
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
                        <td>NIK</td>
                        <td>:</td>
                        <td>{datas.penduduk.nik}</td>
                    </tr>
                    <tr>
                        <td>Jenis Kelamin</td>
                        <td>:</td>
                        <td>
                            {datas.penduduk.jk == "L"
                                ? "Laki - Laki"
                                : "Perempuan"}
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
                        <td>Agama</td>
                        <td>:</td>
                        <td>
                            {Helper.capitalizeFirstLetter(
                                datas.penduduk.religion.name
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Pekerjaan</td>
                        <td>:</td>
                        <td>{datas.penduduk.job.name}</td>
                    </tr>
                    <tr>
                        <td>Status Perkawinan</td>
                        <td>:</td>
                        <td>
                            {
                                statusNikah.find((obj) => {
                                    console.log(obj);
                                    return (
                                        obj.value === datas.penduduk.maried_type
                                    );
                                }).label
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Kewarganegaraan</td>
                        <td>:</td>
                        <td>{datas.penduduk.nationality}</td>
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
            {datas.type == "Perorangan" ? (
                <Text textAlign="justify" style={{ lineHeight: 2 }}>
                    Adalah benar-benar penduduk Kelurahan Ngaglik Kecamatan Batu
                    Kota Batu.
                    <ol>
                        <li>
                            Menerangkan bahwa berdasarkan pengantar dari ketua
                            RT {datas.penduduk.rt.name} RW{" "}
                            {datas.penduduk.rw.name} serta surat pernyataan dari
                            yang bersangkutan bahwa orang tersebut diatas
                            benar-benar warga kami.
                        </li>

                        <li>
                            Surat Keterangan ini digunakan untuk{" "}
                            <b>{datas.keterangan}</b>.
                        </li>
                    </ol>
                </Text>
            ) : (
                <Flex direction="column">
                    <Text>
                        Benar saat ini Membuka / Mempunyai Usaha sebagai berikut
                    </Text>
                    <table fontSize={14}>
                        <tbody>
                            <tr p={8}>
                                <td>Nama Perusahaan</td>
                                <td>:</td>
                                <td style={{ fontWeight: "bold" }}>
                                    {" "}
                                    {datas.nama_perusahaan.toUpperCase()}
                                </td>
                            </tr>

                            <tr>
                                <td>Jenis Usaha</td>
                                <td>:</td>
                                <td>{datas.jenis_perusahaan}</td>
                            </tr>
                            <tr>
                                <td>Alamat Perusahaan</td>
                                <td>:</td>
                                <td>{datas.alamat_perusahaan}</td>
                            </tr>
                            <tr>
                                <td>No. Telpon Perusahaan</td>
                                <td>:</td>
                                <td>{datas.telp_perusahaan}</td>
                            </tr>
                            <tr>
                                <td>Status Bangunan</td>
                                <td>:</td>
                                <td>{datas.status_bangunan}</td>
                            </tr>
                            <tr>
                                <td>No. Akta Pendirian</td>
                                <td>:</td>
                                <td>{datas.akta_perusahaan}</td>
                            </tr>
                            <tr>
                                <td>SK. Pengesahan</td>
                                <td>:</td>
                                <td>{datas.sk_pengesahan}</td>
                            </tr>
                            <tr>
                                <td>Penanggung Jawab</td>
                                <td>:</td>
                                <td>{datas.penanggung_jawab}</td>
                            </tr>
                        </tbody>
                    </table>
                </Flex>
            )}
            <Text>
                Demikian surat keterangan ini dibuat dengan sebenarnya dan agar
                dapat dipergunakan sebagimana mestinya.
            </Text>
            <Text color={"white"}>\n</Text>
            <Footer penduduk={datas.penduduk} isUser={false} />
        </Flex>
    ) : (
        <Flex />
    );
};

export default DomisisliTemplate;
