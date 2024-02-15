import { IOptions } from "tailwind-datepicker-react/types/Options";

export const options: IOptions = {
    // title: "Date",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        background: "bg-white",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "bg-gray-200",
        input: "",
        inputIcon: "",
        selected: "",
    },
    icons: {
        // () => ReactElement | JSX.Element
        prev: () => <span className="text-bold">{`<`}</span>,
        next: () => <span className="text-bold ">{`>`}</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date(),
    language: "en",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
        day: "2-digit",   // Two-digit day
        month: "2-digit", // Two-digit month
        year: "numeric"   // Four-digit year
    }
}