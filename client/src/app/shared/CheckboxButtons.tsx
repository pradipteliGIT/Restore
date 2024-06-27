import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useState } from 'react';

type Props = {
  options: string[];
  checked?: string[];
  disabled?: boolean;
  onChange: (items: string[]) => void;
};
export default function CheckboxButtons({
  options,
  checked,
  disabled = false,
  onChange,
}: Props) {
  const [checkedItems, setSelectedItems] = useState(checked || []);

  const handleChecked = (value: string) => {
    const itemIndex = checkedItems.findIndex((item) => item === value);
    let newChecked: string[] = [];
    if (itemIndex === -1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter((item) => item !== value);
    setSelectedItems(newChecked);
    onChange(newChecked);
  };

  return (
    <FormGroup>
      {options.map((item) => (
        <FormControlLabel
          sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
          disabled={disabled}
          control={
            <Checkbox
              size='small'
              id={item}
              onClick={() => handleChecked(item)}
              checked={checkedItems.findIndex((value) => value === item) !== -1}
            />
          }
          label={item}
          key={item}
        />
      ))}
    </FormGroup>
  );
}
