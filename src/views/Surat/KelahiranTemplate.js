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

const KelahiranTemplate = () => {
    let { id } = useParams();
    const [datas, setDatas] = useState(null);

    const getDatas = () => {
        axiosClient
            .get("/v1/kelahirans/" + id)
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
                name={"SURAT KETERANGAN KELAHIRAN"}
                no_surat={datas.kode_surat}
                size={24}
            />
            <Text style={{ lineHeight: 1.5 }}>
                Yang bertanda tangan dibawah ini, Lurah Ngaglik Kecamatan Batu
                Pemerintah Kota Batu, menerangkan bahwa :
            </Text>
            <table fontSize={14}>
                <tbody>
                    <tr p={8}>
                        <td width={"30%"}>Nama</td>
                        <td>:</td>
                        <td style={{ fontWeight: "bold" }}>
                            {" "}
                            {datas.nama.toUpperCase()}
                        </td>
                    </tr>
                    <tr>
                        <td>Jenis Kelamin</td>
                        <td>:</td>
                        <td>{datas.jk == "L" ? "Laki - Laki" : "Perempuan"}</td>
                    </tr>
                    <tr>
                        <td>Anak Ke</td>
                        <td>:</td>
                        <td>{datas.anak_ke}</td>
                    </tr>
                    <tr>
                        <td>Tempat / Tanggal Lahir</td>
                        <td>:</td>
                        <td>
                            {Helper.capitalizeFirstLetter(datas.birth_place)},{" "}
                            {Helper.formatDate(datas.birth_date)}
                        </td>
                    </tr>
                    <tr>
                        <td>Pukul</td>
                        <td>:</td>
                        <td>{datas.jam}</td>
                    </tr>
                </tbody>
            </table>

            <Text>Nama Orang Tua</Text>
            <table>
                <tr>
                    <td width={"30%"}>Ayah</td>
                    <td>:</td>
                    <td>{datas.ayah.fullname}</td>
                </tr>
                <tr>
                    <td>Ibu</td>
                    <td>:</td>
                    <td>{datas.ibu.fullname}</td>
                </tr>
                <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>
                        <Text lineHeight={1.5}>
                            {Helper.capitalizeFirstLetter(datas.ayah.address)}{" "}
                            RT {datas.ayah.rt.name} / RW {datas.ayah.rw.name}{" "}
                            {datas.ayah.kelurahan.name} Kecamatan{" "}
                            {Helper.capitalizeFirstLetter(
                                datas.ayah.kecamatan.name
                            )}{" "}
                            {Helper.capitalizeFirstLetter(datas.ayah.kota.name)}{" "}
                            {Helper.capitalizeFirstLetter(
                                datas.ayah.provinsi.name
                            )}
                        </Text>
                    </td>
                </tr>
            </table>
            <Text textAlign="justify" style={{ lineHeight: 2 }}>
                Adalah benar-benar penduduk Kelurahan Ngaglik Kecamatan Batu
                Kota Batu.
                <ol>
                    <li>
                        Surat Keterangan ini digunakan untuk {datas.keterangan}{" "}
                        dan memenuhi salah satu persyaratan mengurus Akta
                        Kelahiran pada Dinas Kependudukan dan Pencatatan Sipil.
                    </li>
                </ol>
            </Text>
            <Text textAlign="justify" style={{ lineHeight: 2 }}>
                Demikian surat pengantar ini dibuat dengan sebenarnya dan agar
                dapat dipergunakan sebagimana mestinya.
            </Text>
            <Text color={"white"}>\n</Text>
            <Footer penduduk={datas.penduduk} isUser={false} id={24} />
        </Flex>
    ) : (
        <Flex />
    );
};

export default KelahiranTemplate;
