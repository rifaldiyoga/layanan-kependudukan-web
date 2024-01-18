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

const JandaTemplate = () => {
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

    useEffect(() => {
        getDatas();
        getSistem();
    }, []);

    const getDatas = () => {
        axiosClient
            .get("/v1/jandas/" + id)
            .then(({ data }) => {
                console.log(data.data);
                console.log(datas);
                setDatas(data.data);
            })
            .catch(() => {
                console.log();
            });
    };

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
                name="SURAT KETERANGAN JANDA / DUDA"
                no_surat={datas.kode_surat}
                size={22}
            />
            <Text style={{ lineHeight: 1.5 }}>
                Yang bertanda tangan dibawah ini, Kepala {sistem?.nama}{" "}
                Kecamatan {sistem?.kecamatan?.name} Pemerintah{" "}
                {sistem?.kota?.name}, menerangkan bahwa :
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
                                Rt {datas.penduduk.rt.name} / RW{" "}
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
            <Text textAlign="justify" style={{ lineHeight: 2 }}>
                Adalah benar-benar penduduk {sistem?.nama} Kecamatan{" "}
                {sistem?.kecamatan?.name} {sistem?.kota?.name}.
                <ol>
                    <li>
                        Menerangkan bahwa berdasarkan pengantar dari ketua RT{" "}
                        {datas.penduduk.rt.name} RW {datas.penduduk.rw.name}{" "}
                        serta surat kematian / surat perceraian dari yang
                        bersangkutan yang bersangkutan benar-benar Janda / Duda
                        dan sampai sekarang belum menikah lagi.
                    </li>
                    <li>
                        Surat Keterangan ini digunakan untuk{" "}
                        <b>{datas.keterangan}</b> dan memenuhi salah satu
                        persyaratan <b>Surat Keterangan Catatan Janda (SKCK)</b>
                        .
                    </li>
                </ol>
                Demikian surat keterangan ini dibuat dengan sebenarnya dan agar
                dapat dipergunakan sebagimana mestinya.
            </Text>
            <Text color={"white"}>\n</Text>
            <Footer penduduk={datas.penduduk} isUser={false} id={28} />
        </Flex>
    ) : (
        <Flex />
    );
};

export default JandaTemplate;
