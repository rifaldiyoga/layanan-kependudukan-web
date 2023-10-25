import React from "react";
import { Select } from "chakra-react-select";

export default function SearchSelect({ field, form, ...props }) {
    const chakraStyles = {
        fontSize: "10px",
        borderRadius: "14px",
    };
    return (
        <Select
            useBasicStyles
            {...field}
            {...props}
            size="lg"
            borderRadius="15px"
            placeholder={"Silahkan Pilih"}
            options={props.options}
            chakraStyles={{
                placeholder: (base) => ({
                    ...base,
                    fontSize: "sm",
                    color: "#cbd3dc",
                }),
                option: (base) => ({
                    ...base,
                    fontSize: "sm",
                }),
                control: (base) => ({
                    ...base,
                    fontSize: "sm",
                    borderRadius: "15px",
                }),
            }}
            value={
                props.options
                    ? props.options.find(
                          (option) => option.value === field.value
                      )
                    : ""
            }
            onChange={(option) => form.setFieldValue(field.name, option.value)}
        />
    );
}
