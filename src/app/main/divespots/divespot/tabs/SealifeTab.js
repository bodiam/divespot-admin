import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { selectDivespot } from '../../store/divespotSlice';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { getSealives, selectSealives } from '../../../sealives/store/sealivesSlice';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function SealifeTab(props) {
  const dispatch = useDispatch()
  const [sealivesOptions, setSealivesOptions] = useState([])
  const methods = useFormContext();
  const { control, watch } = methods;
  const divespot = useSelector(selectDivespot);
  const sealives = watch("sealives")
  const [searchText, setSearchText] = useState('')

  useEffect(() => {


    const asyncFn = async () => {
      const response = await axios.get(`/admin/sealife/search?q=${searchText}&sort=binomialName&page=0&size=20`);
      const data = await response.data;
      setSealivesOptions(data)
    };
    asyncFn();




  }, [searchText]);


  const handleLinkSealife = () => {

  }

  return (
    <div>

      <div className='flex'>

        <Controller
          name="sealives"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
              freeSolo
              multiple
              fullWidth
              options={sealivesOptions}
              getOptionLabel={(s) => s && s.binomialName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Sealives"
                  label="Sealives"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onInput={(e) => {
                    setSearchText(e.target.value)
                  }}
                />
              )}
            />

          )}
        />

<Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          disabled={!sealives}
          onClick={handleLinkSealife}
        >
          Add
        </Button>

      </div>

      <div className="table-responsive">
        <table className="simple">
          <thead>
            <tr>
              <th>
                <Typography className="font-semibold">ID</Typography>
              </th>
              <th>
                <Typography className="font-semibold">Image</Typography>
              </th>
              <th>
                <Typography className="font-semibold">Name</Typography>
              </th>
              <th>
                <Typography className="font-semibold">Family Name</Typography>
              </th>
              <th>
                <Typography className="font-semibold">Distribution</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {divespot.sealife?.map((s) => (
              <tr key={s.id}>
                <td className="w-64">{s.id}</td>
                <td className="w-80">
                  <img className="product-image" src={s.images[0]} alt="product" />
                </td>
                <td>
                  <Typography
                    component={Link}
                    to={`/sealives/${s.id}`}
                    className="truncate"
                    style={{
                      color: 'inherit',
                      textDecoration: 'underline',
                    }}
                  >
                    {s.commonName}
                  </Typography>
                </td>
                <td className="w-64 text-right">
                  <span className="truncate">${s.familyName}</span>
                </td>
                <td className="w-64 text-right">
                  <span className="truncate">{s.distribution}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


  );
}

export default SealifeTab;
