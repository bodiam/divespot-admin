import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import codes from "./codes"
import Autocomplete from '@mui/material/Autocomplete';
import { selectDivespot } from '../../store/divespotSlice';
import { useSelector } from 'react-redux';

function PricingTab(props) {
  const methods = useFormContext();
  const { control } = methods;
  const divespot = useSelector(selectDivespot);

  return (
    <div>
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Amount"
            id="amount"
            type="number"
            variant="outlined"
            autoFocus
            fullWidth
            defaultValue={divespot.price.amount}
          />
        )}
      />

<Controller
        name="code"
        control={control}
        defaultValue={divespot.price.code}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            freeSolo
            options={codes}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Currency Code"
                label="Code"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}

          />
        )}
      />


    </div>
  );
}

export default PricingTab;
