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

const KeramaianTemplate = () => {
    let { id } = useParams();
    const [datas, setDatas] = useState(null);

    const getDatas = () => {
        axiosClient
            .get("/v1/keramaians/" + id)
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

    if (datas) console.log(datas.penduduk);

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
                name="SURAT IJIN KERAMAIAN"
                no_surat={datas.kode_surat}
                size={20}
            />
            <Text style={{ lineHeight: 1.5 }}>
                Yang bertanda tangan dibawah ini :
            </Text>
            <table fontSize={14}>
                <tbody>
                    <tr p={8}>
                        <td>NAMA</td>
                        <td>:</td>
                        <td style={{ fontWeight: "bold" }}>
                            {" "}
                            RENDRA ADINATA,S.Kom.,M.AP.
                        </td>
                    </tr>

                    <tr>
                        <td>NIP</td>
                        <td>:</td>
                        <td>19870427 201101 1 009</td>
                    </tr>
                    <tr>
                        <td>JABATAN</td>
                        <td>:</td>
                        <td>
                            Ketua Satuan Tugas Pencegahan dan Pengendalian
                            Covid-19 Kel. Ngaglik
                        </td>
                    </tr>
                </tbody>
            </table>
            <Text>
                Sehubungan dengan surat permohonan Saudara{" "}
                {Helper.formatDate(datas.created_at)} perihal Pemberitahuan /
                Ijin Kegiatan <b>{datas.nama_acara}</b> dengan memperhatikan :
            </Text>
            <Text textAlign="justify" style={{ lineHeight: 2 }}>
                <ol>
                    <li>
                        Peraturan Wali Kota Batu No. 78 Tahun 2020 tentang
                        Penerapan Disiplin dan Pengakan Hukum Penerapan Protokol
                        Keshatan Sebagai Upaya Pencegahan dan Pengendalian{" "}
                        <b>CORONA VIRUS DISEASE 2019.</b>
                    </li>
                    <li>
                        Surat Keputusan Wali Kota Batu No. 79 tahun 2020 tentang
                        Pedoman Adaptasi Kebiasaan, dengan ini kami berikan{" "}
                        <b>REKOMENDASI</b> kepada :
                        <table fontSize={14}>
                            <tbody>
                                <tr p={8}>
                                    <td>Nama Pemohon</td>
                                    <td>:</td>
                                    <td style={{ fontWeight: "bold" }}>
                                        {" "}
                                        {datas.penduduk.fullname.toUpperCase()}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Alamat Pemohon</td>
                                    <td>:</td>
                                    <td>
                                        <text lineHeight={1.5}>
                                            {datas.penduduk.address} RT{" "}
                                            {datas.penduduk.rt.name} / RW{" "}
                                            {datas.penduduk.rw.name}
                                            {datas.penduduk.kelurahan.name}{" "}
                                            Kecamatan{" "}
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

                                <tr>
                                    <td>No. Hp</td>
                                    <td>:</td>
                                    <td>{datas.telpon}</td>
                                </tr>
                                <tr>
                                    <td>Acara</td>
                                    <td>:</td>
                                    <td>
                                        <b>{datas.nama_acara}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Hari / Tanggal</td>
                                    <td>:</td>
                                    <td>
                                        {Helper.capitalizeFirstLetter(
                                            datas.tanggal
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Jam</td>
                                    <td>:</td>
                                    <td>
                                        {Helper.capitalizeFirstLetter(
                                            datas.waktu
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tempat Kegiatan</td>
                                    <td>:</td>
                                    <td>{datas.tempat}</td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td>:</td>
                                    <td>{datas.alamat}</td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                </ol>
            </Text>
            <Text textAlign="justify" style={{ lineHeight: 2 }}>
                Dengan jumlah undangan <b>maksimal 300</b>, dengan memperhatikan
                syarat ketentuan sebagai berikut :
                <ol>
                    <li>
                        Agar melakukan sosialisasi, edukasi dan informasi
                        tentang pengertian dan pemahaman mengenai pencegahan dan
                        pengendalian Covid-19 kepada panitia dan tamu undangan.
                    </li>
                    <li>
                        Panitia dan tamu undangan <b>WAJIB</b> menggunakan alat
                        perlindungan diri berupa masker yang menutupi hidung dan
                        mulut hingga dagu.
                    </li>
                    <li>
                        Wajib melakukan pengecekan suhu tubuh kepada semua
                        panitia dan tamu undangan.
                    </li>
                    <li>
                        Menyediakan sarana cuci tangan pakai sabun yang mudah di
                        akses dan menyediakan cairan pembersih tangan (
                        <b>hand sanitizer</b>)
                    </li>
                    <li>
                        Menjaga jarak antar undangan yang hadir (
                        <b>physical distancing</b>) paling sedikit 1(satu)
                        meter.
                    </li>
                    <li>
                        Penyediaan konsumsi dalam box/kotak, bukan prasaman.
                    </li>
                    <li>
                        Pembatasan waktu pelaksanaan di dalam ruangan paling
                        lama 3 (tiga) jam.
                    </li>

                    <li>
                        Apabila ditemukan undangan yang tidak sehat atau
                        mengalami gejala seperti demam 37,3 derajat Celcius,
                        batuk/pilek dan kesulitan bernafas agar segera
                        melaporkan kepada Satgas Penanganan Covid 19 Kelurahan
                        Ngaglik Kecamatan Batu Kta Batu.
                    </li>
                    <li>
                        Apabila dari point 1-8 dimaksud di atas tidak mematuhi
                        atau tidak melaksanakan syarat ketentuan yang berlaku,
                        maka Satgas Penangan Covid-19 Kelurahan Ngaglik berhak
                        memberhentikan pelaksanaan acara tersebut.
                    </li>
                    <li>
                        Wajib menyediakan buku daftar hadir tamu dan mengisi
                        nama lengkap beserta alamat.
                    </li>
                </ol>
            </Text>
            <Text color={"white"}>\n</Text>
            <Footer penduduk={datas.penduduk} isUser={false} id={23} />
        </Flex>
    ) : (
        <Flex />
    );
};

export default KeramaianTemplate;
