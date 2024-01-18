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

const PindahTemplate = () => {
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
            .get("/v1/pindahs/" + id)
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
            h={"29.7cm"}
            style={{
                fontFamily: "Bookman Old Style",
                fontSize: 14,
            }}
        >
            <Header />
            <SubHeader
                name={
                    datas.type == "Pindah Keluar"
                        ? "SURAT PENGANTAR PINDAH KELUAR"
                        : "SURAT PENGANTAR PINDAH DATANG"
                }
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
                    <tr>
                        <td width={"26%"}>NIK</td>
                        <td>:</td>
                        <td>{datas.penduduk.nik}</td>
                    </tr>
                    <tr p={8}>
                        <td>Nama</td>
                        <td>:</td>
                        <td style={{ fontWeight: "bold" }}>
                            {" "}
                            {datas.penduduk.fullname.toUpperCase()}
                        </td>
                    </tr>
                    <tr p={8}>
                        <td>Nomor Kartu Keluarga</td>
                        <td>:</td>
                        <td> {datas.penduduk.no_kk}</td>
                    </tr>
                    <tr>
                        <td>Nama Kepala Keluarga</td>
                        <td>:</td>
                        <td>
                            {
                                datas.pindah_detail.find((obj) => {
                                    console.log(obj);
                                    return (
                                        obj.status_family === "Kepala Keluarga"
                                    );
                                }).nama
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Alamat Sekarang</td>
                        <td>:</td>
                        <td>
                            <Text lineHeight={1.5}>
                                {Helper.capitalizeFirstLetter(
                                    datas.penduduk.address
                                )}{" "}
                                RT {datas.penduduk.rt.name} / RW{" "}
                                {datas.penduduk.rw.name}{" "}
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
                            </Text>
                        </td>
                    </tr>
                    <tr>
                        <td>Alamat Tujuan</td>
                        <td>:</td>
                        <td>
                            <Text lineHeight={1.5}>
                                {datas.alamat_tujuan} Rt {datas.rt} / RW{" "}
                                {datas.rw} Kelurahan{" "}
                                {Helper.capitalizeFirstLetter(datas.kelurahan)}{" "}
                                Kecamatan{" "}
                                {Helper.capitalizeFirstLetter(
                                    datas.kecamatan.name
                                )}{" "}
                                {Helper.capitalizeFirstLetter(datas.kota.name)}{" "}
                                {Helper.capitalizeFirstLetter(
                                    datas.provinsi.name
                                )}
                            </Text>
                        </td>
                    </tr>
                    <tr>
                        <td>Jumlah Keluarga Yang Pindah</td>
                        <td>:</td>
                        <td>{datas.pindah_detail.length} Orang</td>
                    </tr>
                </tbody>
            </table>
            <Text textAlign="justify" style={{ lineHeight: 2 }}>
                Adapun Permohonan Pindah Penduduk yang bersangkutan sebagimana
                terlampir.
            </Text>
            <Text textAlign="justify" style={{ lineHeight: 2 }}>
                &nbsp;&nbsp;&nbsp;&nbsp;Demikian surat pengantar ini dibuat
                dengan sebenarnya dan agar dapat dipergunakan sebagimana
                mestinya.
            </Text>
            <Text color={"white"}>\n</Text>
            <Footer penduduk={datas.penduduk} isUser={false} id={24} />
        </Flex>
    ) : (
        <Flex />
    );
};

export default PindahTemplate;
