export default class Helper {
    static formatDate(inputDateString) {
        const dateObj = new Date(inputDateString);

        const day = dateObj.getDate();
        const month = dateObj.toLocaleString("ID", { month: "long" });
        const year = dateObj.getFullYear();

        return `${day} ${month} ${year}`;
    }

    static capitalizeFirstLetter(str) {
        if (str == null || !str) return "";
        return str
            .split(" ")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
    }
}
