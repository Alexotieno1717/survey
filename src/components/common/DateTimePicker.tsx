import { DateTimePicker as _DateTimePicker } from '@atlaskit/datetime-picker';
import { useField } from 'formik';


const DateTimePicker = ({name}: {name: string}) => {
	const [field, meta, helpers] = useField<string>(name);
    return (    
        <_DateTimePicker value={field.value} onChange={(value: string) => helpers.setValue(value)}/>
      );
}

export default DateTimePicker