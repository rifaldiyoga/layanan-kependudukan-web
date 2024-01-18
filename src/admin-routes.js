// import
import Article from "views/Dashboard/Article";
import ArticleForm from "views/Dashboard/Article/views/Form";
import Dashboard from "views/Dashboard/Dashboard";
import District from "views/Dashboard/District";
import DistrictForm from "views/Dashboard/District/views/Form";
import Education from "views/Dashboard/Education";
import EducationForm from "views/Dashboard/Education/views/Form";
import Job from "views/Dashboard/Job";
import JobForm from "views/Dashboard/Job/views/Form";
import Kelahiran from "views/Dashboard/Kelahiran";
import KelahiranForm from "views/Dashboard/Kelahiran/views/Form";
import Janda from "views/Dashboard/Janda";
import JandaForm from "views/Dashboard/Janda/views/Form";
import BelumNikah from "views/Dashboard/BelumNikah";
import BelumNikahForm from "views/Dashboard/BelumNikah/views/Form";
import PernahNikah from "views/Dashboard/PernahNikah";
import PernahNikahForm from "views/Dashboard/PernahNikah/views/Form";
import Keluarga from "views/Dashboard/Keluarga";
import KeluargaForm from "views/Dashboard/Keluarga/views/Form";
import Kelurahan from "views/Dashboard/Kelurahan";
import KelurahanForm from "views/Dashboard/Kelurahan/views/Form";
import Kematian from "views/Dashboard/Kematian";
import KematianForm from "views/Dashboard/Kematian/views/Form";
import Layanan from "views/Dashboard/Layanan";
import LayananForm from "views/Dashboard/Layanan/views/Form";

import AparaturDesa from "views/Dashboard/AparaturDesa";
import AparaturDesaForm from "views/Dashboard/AparaturDesa/views/Form";
import Jabatan from "views/Dashboard/Jabatan";
import JabatanForm from "views/Dashboard/Jabatan/views/Form";
import Penduduk from "views/Dashboard/Penduduk";
import PendudukForm from "views/Dashboard/Penduduk/views/Form";
import Pengajuan from "views/Dashboard/Pengajuan";
import PengajuanForm from "views/Dashboard/Pengajuan/views/Form";
import Province from "views/Dashboard/Province";
import ProvinceForm from "views/Dashboard/Province/views/Form";
import RT from "views/Dashboard/RT";
import RTForm from "views/Dashboard/RT/views/Form";
import RW from "views/Dashboard/RW";
import RWForm from "views/Dashboard/RW/views/Form";
import Religion from "views/Dashboard/Religion";
import ReligionForm from "views/Dashboard/Religion/views/Form";
import SKTM from "views/Dashboard/SKTM";
import SKTMForm from "views/Dashboard/SKTM/views/Form";
import Keramaian from "views/Dashboard/Keramaian";
import KeramaianForm from "views/Dashboard/Keramaian/views/Form";
import Domisili from "views/Dashboard/Domisili";
import DomisiliForm from "views/Dashboard/Domisili/views/Form";
import Penghasilan from "views/Dashboard/Penghasilan";
import PenghasilanForm from "views/Dashboard/Penghasilan/views/Form";
import Rumah from "views/Dashboard/Rumah";
import RumahForm from "views/Dashboard/Rumah/views/Form";
import Kepolisian from "views/Dashboard/Kepolisian";
import KepolisianForm from "views/Dashboard/Kepolisian/views/Form";
import Pindah from "views/Dashboard/Pindah";
import PindahForm from "views/Dashboard/Pindah/views/Form";
import Berpergian from "views/Dashboard/Berpergian";
import BerpergianForm from "views/Dashboard/Berpergian/views/Form";
import SKU from "views/Dashboard/SKU";
import SKUForm from "views/Dashboard/SKU/views/Form";
import Status from "views/Dashboard/Status";
import StatusForm from "views/Dashboard/Status/views/Form";
import Sporadik from "views/Dashboard/Sporadik";
import SporadikForm from "views/Dashboard/Sporadik/views/Form";
import Tanah from "views/Dashboard/Tanah";
import TanahForm from "views/Dashboard/Tanah/views/Form";
import SubDistrict from "views/Dashboard/SubDistrict";
import SubDistrictForm from "views/Dashboard/SubDistrict/views/Form";
import Users from "views/Dashboard/Users";
import UserForm from "views/Dashboard/Users/views/Form";
import Sistem from "views/Dashboard/Sistem";

import { Icon } from "@chakra-ui/react";
import { HomeIcon, StatsIcon } from "components/Icons/Icons";
import {
    BsCarFrontFill,
    BsEnvelopeFill,
    BsPeopleFill,
    BsPersonFill,
} from "react-icons/bs";
import {
    FaBaby,
    FaBusinessTime,
    FaCity,
    FaCross,
    FaHatWizard,
    FaMoneyBill,
    FaMosque,
    FaSchool,
    FaServicestack,
    FaUser,
} from "react-icons/fa";
import { RiArticleFill, RiServiceFill } from "react-icons/ri";
import { SiWorkplace } from "react-icons/si";
import { IoEnter, IoExit, IoPrint } from "react-icons/io5";
import Laporans from "views/Dashboard/Laporan";
import { GrPrint } from "react-icons/gr";

var dashRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        rtlName: "لوحة القيادة",
        icon: <HomeIcon color="inherit" />,
        component: Dashboard,
        layout: "/admin",
    },
    {
        path: "/keluargas",
        name: "Keluarga",
        rtlName: "لوحة القيادة",
        icon: <Icon as={BsPeopleFill} />,
        component: Keluarga,
        layout: "/admin",
        views: [
            {
                path: "/new",
                component: KeluargaForm,
                key: "new",
            },
            {
                path: "/:id",
                component: KeluargaForm,
                key: "edit",
            },
        ],
    },
    {
        path: "/penduduks",
        name: "Penduduk",
        rtlName: "لوحة القيادة",
        icon: <Icon as={BsPersonFill} />,
        component: Penduduk,
        layout: "/admin",
        views: [
            {
                path: "/new",
                component: PendudukForm,
                key: "new",
            },
            {
                path: "/:id",
                component: PendudukForm,
                key: "edit",
            },
        ],
    },

    {
        path: "/pengajuans",
        name: "Daftar Pengajuan",
        rtlName: "لوحة القيادة",
        icon: <BsEnvelopeFill color="inherit" />,
        component: Pengajuan,
        layout: "/admin",
        views: [
            {
                path: "/new",
                component: PengajuanForm,
                key: "new",
            },
            {
                path: "/:id",
                component: PengajuanForm,
                key: "edit",
            },
        ],
    },
    {
        name: "Layanan Umum",
        category: "account",
        rtlName: "صفحات",
        icon: <RiServiceFill color="inherit" />,
        state: "pageCollapse",
        views: [
            {
                path: "/sktms",
                name: "Tidak Mampu",
                rtlName: "لوحة القيادة",
                icon: <FaMoneyBill color="inherit" />,
                component: SKTM,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: SKTMForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: SKTMForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/skus",
                name: "Keterangan Usaha",
                rtlName: "لوحة القيادة",
                icon: <FaBusinessTime color="inherit" />,
                component: SKU,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: SKUForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: SKUForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/berpergians",
                name: "Berpergian / Boro Kerja",
                rtlName: "لوحة القيادة",
                icon: <BsCarFrontFill color="inherit" />,
                component: Berpergian,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: BerpergianForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: BerpergianForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/keramaians",
                name: "Ijin Keramaian",
                rtlName: "لوحة القيادة",
                icon: <FaHatWizard color="inherit" />,
                component: Keramaian,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: KeramaianForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: KeramaianForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/domisilis",
                name: "Domisili",
                rtlName: "لوحة القيادة",
                icon: <HomeIcon color="inherit" />,
                component: Domisili,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: DomisiliForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: DomisiliForm,
                        key: "edit",
                    },
                ],
            },

            {
                path: "/rumahs",
                name: "Tidak Memiliki Rumah",
                rtlName: "لوحة القيادة",
                icon: <HomeIcon color="inherit" />,
                component: Rumah,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: RumahForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: RumahForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/penghasilans",
                name: "Penghasilan",
                rtlName: "لوحة القيادة",
                icon: <HomeIcon color="inherit" />,
                component: Penghasilan,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: PenghasilanForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: PenghasilanForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/kepolisians",
                name: "Pengantar SKCK",
                rtlName: "لوحة القيادة",
                icon: <HomeIcon color="inherit" />,
                component: Kepolisian,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: KepolisianForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: KepolisianForm,
                        key: "edit",
                    },
                ],
            },
        ],
    },
    {
        name: "Kelahiran & Kematian",
        category: "account",
        rtlName: "صفحات",
        icon: <RiServiceFill color="inherit" />,
        state: "pageCollapse",
        views: [
            {
                path: "/kelahirans",
                name: "Kelahiran",
                rtlName: "لوحة القيادة",
                icon: <FaBaby color="inherit" />,
                component: Kelahiran,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: KelahiranForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: KelahiranForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/kematians",
                name: "Kematian",
                rtlName: "لوحة القيادة",
                icon: <FaCross color="inherit" />,
                component: Kematian,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: KematianForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: KematianForm,
                        key: "edit",
                    },
                ],
            },
        ],
    },
    {
        name: "Layanan Pindah",
        category: "account",
        rtlName: "صفحات",
        icon: <RiServiceFill color="inherit" />,
        state: "pageCollapse",
        views: [
            {
                path: "/pindahs",
                name: "Pindah ",
                rtlName: "لوحة القيادة",
                icon: <IoEnter color="inherit" />,
                component: Pindah,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: PindahForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: PindahForm,
                        key: "edit",
                    },
                ],
            },
        ],
    },
    {
        name: "Layanan Pernikahan",
        category: "account",
        rtlName: "صفحات",
        icon: <RiServiceFill color="inherit" />,
        state: "pageCollapse",
        views: [
            {
                path: "/jandas",
                name: "Keterangan Duda/Janda",
                rtlName: "لوحة القيادة",
                icon: <BsPeopleFill color="inherit" />,
                component: Janda,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: JandaForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: JandaForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/pernah_menikahs",
                name: "Pernah Nikah",
                rtlName: "لوحة القيادة",
                icon: <FaCross color="inherit" />,
                component: PernahNikah,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: PernahNikahForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: PernahNikahForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/belum_menikahs",
                name: "Belum Pernah Nikah",
                rtlName: "لوحة القيادة",
                icon: <FaCross color="inherit" />,
                component: BelumNikah,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: BelumNikahForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: BelumNikahForm,
                        key: "edit",
                    },
                ],
            },
        ],
    },
    {
        name: "Layanan Pertanahan",
        category: "account",
        rtlName: "صفحات",
        icon: <RiServiceFill color="inherit" />,
        state: "pageCollapse",
        views: [
            {
                path: "/tanahs",
                name: "Kepemilikan Tanah",
                rtlName: "لوحة القيادة",
                icon: <FaBaby color="inherit" />,
                component: Tanah,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: TanahForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: TanahForm,
                        key: "edit",
                    },
                ],
            },
        ],
    },
    {
        name: "Master",
        category: "account",
        rtlName: "صفحات",
        icon: <StatsIcon color="inherit" />,
        state: "pageCollapse",
        views: [
            {
                path: "/layanans",
                name: "Layanan",
                rtlName: "لوحة القيادة",
                icon: <RiServiceFill color="inherit" />,
                component: Layanan,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: LayananForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: LayananForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/aparatur_desas",
                name: "Aparatur Desa",
                rtlName: "لوحة القيادة",
                icon: <FaMosque color="inherit" />,
                component: AparaturDesa,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: AparaturDesaForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: AparaturDesaForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/positions",
                name: "Jabatan",
                rtlName: "لوحة القيادة",
                icon: <FaMosque color="inherit" />,
                component: Jabatan,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: JabatanForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: JabatanForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/articles",
                name: "Artikel",
                rtlName: "لوحة القيادة",
                icon: <RiArticleFill color="inherit" />,
                component: Article,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: ArticleForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: ArticleForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/educations",
                name: "Pendidikan",
                rtlName: "لوحة القيادة",
                icon: <FaSchool color="inherit" />,
                component: Education,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: EducationForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: EducationForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/status",
                name: "Status",
                rtlName: "لوحة القيادة",
                icon: <StatsIcon color="inherit" />,
                component: Status,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: StatusForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: StatusForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/jobs",
                name: "Pekerjaan",
                rtlName: "لوحة القيادة",
                icon: <SiWorkplace color="inherit" />,
                component: Job,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: JobForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: JobForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/religions",
                name: "Agama",
                rtlName: "لوحة القيادة",
                icon: <FaMosque color="inherit" />,
                component: Religion,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: ReligionForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: ReligionForm,
                        key: "edit",
                    },
                ],
            },

            {
                path: "/provinces",
                name: "Provinsi",
                rtlName: "لوحة القيادة",
                icon: <FaCity color="inherit" />,
                component: Province,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: ProvinceForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: ProvinceForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/districts",
                name: "Kota",
                rtlName: "لوحة القيادة",
                icon: <FaCity color="inherit" />,
                component: District,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: DistrictForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: DistrictForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/subdistricts",
                name: "Kecamatan",
                rtlName: "لوحة القيادة",
                icon: <FaCity color="inherit" />,
                component: SubDistrict,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: SubDistrictForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: SubDistrictForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/kelurahans",
                name: "Kelurhan",
                rtlName: "لوحة القيادة",
                icon: <FaCity color="inherit" />,
                component: Kelurahan,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: KelurahanForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: KelurahanForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/rws",
                name: "RW",
                rtlName: "لوحة القيادة",
                icon: <FaCity color="inherit" />,
                component: RW,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: RWForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: RWForm,
                        key: "edit",
                    },
                ],
            },
            {
                path: "/rts",
                name: "RT",
                rtlName: "لوحة القيادة",
                icon: <FaCity color="inherit" />,
                component: RT,
                layout: "/admin",
                views: [
                    {
                        path: "/new",
                        component: RTForm,
                        key: "new",
                    },
                    {
                        path: "/:id",
                        component: RTForm,
                        key: "edit",
                    },
                ],
            },
        ],
    },
    {
        path: "/users",
        name: "Users",
        rtlName: "لوحة القيادة",
        icon: <Icon as={FaUser} />,
        component: Users,
        layout: "/admin",
        views: [
            {
                path: "/new",
                component: UserForm,
                key: "new",
            },
            {
                path: "/:id",
                component: UserForm,
                key: "edit",
            },
        ],
    },
    {
        path: "/sistems",
        name: "Sistem",
        rtlName: "لوحة القيادة",
        icon: <Icon as={FaUser} />,
        component: Sistem,
        layout: "/admin",
    },
    {
        path: "/laporans",
        name: "Laporan",
        rtlName: "لوحة القيادة",
        icon: <Icon as={IoPrint} />,
        component: Laporans,
        layout: "/admin",
    },
];
export default dashRoutes;
