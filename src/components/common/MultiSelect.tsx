import {useField} from "formik";
import Tooltip from "@atlaskit/tooltip";
import Select, { components, InputProps, MultiValue } from "react-select";

interface Option {
	label: string;
	value: string;
}

const Input = (
	props: InputProps<{ readonly label: string; readonly value: string }, true>
) => {
	if (props.isHidden) {
		return <components.Input {...props} />;
	}
	return (
		<Tooltip content={"Custom Input"}>
			<components.Input {...props} />
		</Tooltip>
	);
};

const MultiSelect = ({ name }: { name: string }) => {
	const [fieldContactGroups, metaContactGroups, helpersContactGroups] =
		useField<MultiValue<Option>>(name);
	return (
		<Select
			name={name}
			closeMenuOnSelect={false}
			components={{ Input }}
			defaultValue={[
				{ label: "Lamea", value: "lamea" },
				{ label: "Pamea", value: "pamea" },
			]}
			isMulti
			options={[
				{ label: "Mea", value: "mea" },
				{ label: "Amea", value: "amea" },
				{ label: "Lamea", value: "lamea" },
				{ label: "Pamea", value: "pamea" },
			
			]}
			value={fieldContactGroups.value}
			onChange={(value) => helpersContactGroups.setValue(value)}
		/>
	);
};


export default MultiSelect;