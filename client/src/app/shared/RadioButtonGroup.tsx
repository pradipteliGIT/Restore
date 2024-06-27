import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

type Props = {
  options: any[];
  selectedValue: string;
  disabled?: boolean;
  onChange: (event: any) => void;
};
export default function RadioButtonGroup({
  options,
  onChange,
  disabled = false,
  selectedValue,
}: Props) {
  return (
    <FormControl component='fieldset'>
      <RadioGroup
        onChange={onChange}
        value={selectedValue}
      >
        {options.map(({ value, label }) => {
          return (
            <FormControlLabel
              disabled={disabled}
              value={value}
              control={
                <Radio
                  size='small'
                  id={value}
                />
              }
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
              label={label}
              key={value}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
