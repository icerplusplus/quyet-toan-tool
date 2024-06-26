import dateFormat from "dateformat";

export const DateFormat = {
    convert: (datetime: Date) => dateFormat(datetime, "paddedShortDate")
}