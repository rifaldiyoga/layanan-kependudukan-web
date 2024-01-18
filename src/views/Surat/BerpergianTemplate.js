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

const BerpergianTemplate = () => {
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
            .get("/v1/berpergians/" + id)
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

    const styles = {
        striped: {
            border: "1px solid",
            borderColor: "black",
            padding: "8px",
        },
    };

    console.log(datas);

    return datas ? (
        <Flex
            direction="column"
            p={"2cm"}
            bg={"white"}
            w={"21cm"}
            minH={"29.7cm"}
            style={{
                fontFamily: "Bookman Old Style",
                fontSize: 14,
            }}
        >
            <Header />
            <SubHeader
                name={"SURAT KETERANGAN BERPERGIAN / BORO KERJA"}
                no_surat={datas.kode_surat}
                size={20}
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
                        <td width={"26%"}>NIK</td>
                        <td>:</td>
                        <td>{datas.penduduk.nik}</td>
                    </tr>
                    <tr p={8}>
                        <td>Nomor Kartu Keluarga</td>
                        <td>:</td>
                        <td> {datas.penduduk.no_kk}</td>
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
                            <Text>{datas.tujuan}</Text>
                        </td>
                    </tr>
                    <tr>
                        <td>Tanggal Berangkat</td>
                        <td>:</td>
                        <td>
                            <Text>
                                {Helper.formatDate(datas.tgl_berangkat)}
                            </Text>
                        </td>
                    </tr>
                    <tr>
                        <td>Tanggal Kembali</td>
                        <td>:</td>
                        <td>
                            <Text>{Helper.formatDate(datas.tgl_kembali)}</Text>
                        </td>
                    </tr>
                    <tr>
                        <td>Keperluan</td>
                        <td>:</td>
                        <td>{datas.keterangan}</td>
                    </tr>
                    {datas.berpergian_detail.length - 1 != 0 && (
                        <tr>
                            <td>Pengikut</td>
                            <td>:</td>
                            <td>{datas.berpergian_detail.length} Orang</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {datas.berpergian_detail.length - 1 != 0 && (
                <table style={{ marginTop: "16px", marginBottom: "16px" }}>
                    <thead>
                        <tr>
                            <td style={styles.striped}>No.</td>
                            <td style={styles.striped}>NAMA</td>
                            <td style={styles.striped}>NIK</td>
                            <td style={styles.striped}>HUB. KELUARGA</td>
                            <td style={styles.striped}>KET</td>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.berpergian_detail.map((detail, index) => {
                            return (
                                <tr>
                                    <td style={styles.striped}>{index + 1}</td>
                                    <td style={styles.striped}>
                                        {detail.nama}
                                    </td>
                                    <td style={styles.striped}>{detail.nik}</td>
                                    <td style={styles.striped}>
                                        {detail.status_family}
                                    </td>
                                    <td style={styles.striped}></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            <Text textAlign="justify" style={{ lineHeight: 2 }}>
                Demikian surat pengantar ini dibuat dengan sebenarnya dan agar
                dapat dipergunakan sebagimana mestinya.
            </Text>
            <Text color={"white"}>\n</Text>
            <Footer penduduk={datas.penduduk} isUser={true} id={24} />
        </Flex>
    ) : (
        <Flex />
    );
};

export default BerpergianTemplate;
