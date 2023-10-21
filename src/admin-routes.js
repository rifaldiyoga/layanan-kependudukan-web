// import
import Dashboard from "views/Dashboard/Dashboard";
import Users from "views/Dashboard/Users";
import UserForm from "views/Dashboard/Users/views/Form";
import Layanan from "views/Dashboard/Layanan";
import LayananForm from "views/Dashboard/Layanan/views/Form";
import Education from "views/Dashboard/Education";
import EducationForm from "views/Dashboard/Education/views/Form";
import Job from "views/Dashboard/Job";
import JobForm from "views/Dashboard/Job/views/Form";
import Religion from "views/Dashboard/Religion";
import ReligionForm from "views/Dashboard/Religion/views/Form";
import Province from "views/Dashboard/Province";
import ProvinceForm from "views/Dashboard/Province/views/Form";
import Kelurahan from "views/Dashboard/Kelurahan";
import KelurahanForm from "views/Dashboard/Kelurahan/views/Form";
import District from "views/Dashboard/District";
import DistrictForm from "views/Dashboard/District/views/Form";
import SubDistrict from "views/Dashboard/SubDistrict";
import SubDistrictForm from "views/Dashboard/SubDistrict/views/Form";
import RW from "views/Dashboard/RW";
import RWForm from "views/Dashboard/RW/views/Form";
import RT from "views/Dashboard/RT";
import RTForm from "views/Dashboard/RT/views/Form";
import Penduduk from "views/Dashboard/Penduduk";
import PendudukForm from "views/Dashboard/Penduduk/views/Form";
import Keluarga from "views/Dashboard/Keluarga";
import KeluargaForm from "views/Dashboard/Keluarga/views/Form";
import Pengajuan from "views/Dashboard/Pengajuan";
import PengajuanForm from "views/Dashboard/Pengajuan/views/Form";
import Kelahiran from "views/Dashboard/Kelahiran";
import KelahiranForm from "views/Dashboard/Kelahiran/views/Form";
import Kematian from "views/Dashboard/Kematian";
import KematianForm from "views/Dashboard/Kematian/views/Form";

import {
    HomeIcon,
    StatsIcon,
    CreditIcon,
    PersonIcon,
    DocumentIcon,
    RocketIcon,
    SupportIcon,
} from "components/Icons/Icons";

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
        icon: <StatsIcon color="inherit" />,
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
        icon: <StatsIcon color="inherit" />,
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
        name: "Pengajuan",
        rtlName: "لوحة القيادة",
        icon: <StatsIcon color="inherit" />,
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
        path: "/kelahirans",
        name: "Kelahiran",
        rtlName: "لوحة القيادة",
        icon: <StatsIcon color="inherit" />,
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
        icon: <StatsIcon color="inherit" />,
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
                icon: <StatsIcon color="inherit" />,
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
                path: "/educations",
                name: "Pendidikan",
                rtlName: "لوحة القيادة",
                icon: <StatsIcon color="inherit" />,
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
                path: "/jobs",
                name: "Pekerjaan",
                rtlName: "لوحة القيادة",
                icon: <StatsIcon color="inherit" />,
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
                icon: <StatsIcon color="inherit" />,
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
                icon: <StatsIcon color="inherit" />,
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
                icon: <StatsIcon color="inherit" />,
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
                icon: <StatsIcon color="inherit" />,
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
                icon: <StatsIcon color="inherit" />,
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
                icon: <StatsIcon color="inherit" />,
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
                icon: <StatsIcon color="inherit" />,
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
        icon: <StatsIcon color="inherit" />,
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
];
export default dashRoutes;
