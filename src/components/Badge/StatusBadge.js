import { Badge } from "@chakra-ui/react";

const status = {
    PENDING_ADMIN: {
        text: "Menunggu Persetujuan",
        color: "blue",
    },
    APPROVED_RW: {
        text: "Disetujui RW",
        color: "blue",
    },
    VALID: {
        text: "Disetujui",
        color: "green",
    },
    REJECTED: {
        text: "Ditolak",
        color: "red",
    },
};

function StatusBadge(props) {
    const s = props.status;
    const currentStatus = status[s];
    return (
        <Badge
            fontSize={16}
            paddingStart={4}
            paddingEnd={4}
            paddingTop={2}
            paddingBottom={2}
            borderRadius={16}
            colorScheme={currentStatus.color}
        >
            {currentStatus.text}
        </Badge>
    );
}

export default StatusBadge;
