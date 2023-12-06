// import
import BelumMenikahTemplate from "views/Surat/BelumMenikahTemplate";
import DomisisliTemplate from "views/Surat/DomisiliTemplate";
import KepolisianTemplate from "views/Surat/KepolisianTemplate";
import KeramaianTemplate from "views/Surat/KeramaianTemplate";
import PenghasilanTemplate from "views/Surat/PenghasilanTemplate";
import PernahMenikahTemplate from "views/Surat/PernahMenikahTemplate";
import PindahTemplate from "views/Surat/PindahTemplate";
import RumahTemplate from "views/Surat/RumahTemplate";
import SKTMTemplate from "views/Surat/SKTMTemplate";
import SKUTemplate from "views/Surat/SKUTemplate";
import TanahTemplate from "views/Surat/TanahTemplate";

var dashRoutes = [
    {
        path: "/sktms/:id",
        name: "SKTM",
        rtlName: "لوحة القيادة",
        component: SKTMTemplate,
        layout: "/surat",
    },
    {
        path: "/skus/:id",
        name: "SKU",
        rtlName: "لوحة القيادة",
        component: SKUTemplate,
        layout: "/surat",
    },
    {
        path: "/domisilis/:id",
        name: "Domisili",
        rtlName: "لوحة القيادة",
        component: DomisisliTemplate,
        layout: "/surat",
    },
    {
        path: "/kepolisians/:id",
        name: "Kepolisian",
        rtlName: "لوحة القيادة",
        component: KepolisianTemplate,
        layout: "/surat",
    },
    {
        path: "/penghasilans/:id",
        name: "Kepolisian",
        rtlName: "لوحة القيادة",
        component: PenghasilanTemplate,
        layout: "/surat",
    },
    {
        path: "/belum_menikahs/:id",
        name: "Kepolisian",
        rtlName: "لوحة القيادة",
        component: BelumMenikahTemplate,
        layout: "/surat",
    },
    {
        path: "/pernah_menikahs/:id",
        name: "Kepolisian",
        rtlName: "لوحة القيادة",
        component: PernahMenikahTemplate,
        layout: "/surat",
    },
    {
        path: "/rumahs/:id",
        name: "Kepolisian",
        rtlName: "لوحة القيادة",
        component: RumahTemplate,
        layout: "/surat",
    },
    {
        path: "/keramaians/:id",
        name: "Keramaian",
        rtlName: "لوحة القيادة",
        component: KeramaianTemplate,
        layout: "/surat",
    },
    {
        path: "/pindahs/:id",
        name: "Pindah",
        rtlName: "لوحة القيادة",
        component: PindahTemplate,
        layout: "/surat",
    },
    {
        path: "/tanahs/:id",
        name: "Pindah",
        rtlName: "لوحة القيادة",
        component: TanahTemplate,
        layout: "/surat",
    },
];
export default dashRoutes;
