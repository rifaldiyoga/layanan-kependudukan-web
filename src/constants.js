export const BASE_URL =
    "https://layanan-kependudukan-345245fcf467.herokuapp.com/api";
export const BASE_IMAGE_URL =
    "https://layanan-kependudukan-345245fcf467.herokuapp.com/";

// export const BASE_URL = "http://localhost:8080/api";
// export const BASE_IMAGE_URL = "http://localhost:8080/";

export const statusNikah = [
    {
        value: "BK",
        label: "Belum Kawin",
    },
    {
        value: "K",
        label: "Kawin",
    },
    {
        value: "CH",
        label: "Cerai Hidup",
    },
    {
        value: "CM",
        label: "Cerai Mati",
    },
];

export const statusPengajuan = [
    {
        value: "ALL",
        label: "Semua",
    },
    {
        value: "PENDING",
        label: "Belum Diproses",
    },
    {
        value: "VALID",
        label: "Disetujui",
    },
    {
        value: "REJECTED",
        label: "Ditolak",
    },
];
