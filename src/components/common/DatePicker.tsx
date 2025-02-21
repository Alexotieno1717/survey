import { useField } from "formik";
import { Calendar } from "@/components/ui/calendar";
import { FC } from "react";

interface DatePickerProps {
	name: string;
	minDate?: Date;
}

const DatePicker: FC<DatePickerProps> = ({ name, minDate }) => {
	const [field, meta, helpers] = useField<Date | undefined>(name);

	return (
		<Calendar
			mode="single"
			selected={field.value ? new Date(field.value) : undefined}
			onSelect={(date) => helpers.setValue(date)}
			disabled={(date) => minDate ? date < minDate : false}
			initialFocus
			fromDate={minDate} // ✅ Set minDate for future selection
		/>
		// <Calendar
		// 	mode="single"
		// 	selected={field.value ?? undefined}
		// 	onSelect={(date) => helpers.setValue(date)}
		// 	disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
		// 	initialFocus
		// 	fromDate={minDate}
		// />
	);
};

export default DatePicker;
