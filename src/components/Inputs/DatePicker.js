import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DatePicker from "react-multi-date-picker";

export const CustomDatePicker = ({ field, form, ...props }) => {
    return (
        <DatePicker
            {...field}
            {...props}
            style={{
                width: "100%",
                borderRadius: "12px",
                paddingLeft: "16px",
                paddingTop: "22px",
                paddingBottom: "22px",
            }}
            w="100%"
            value={props.value}
            onChange={(option) => {
                form.setFieldValue(field.name, option);
            }}
            range
        />
    );
};
