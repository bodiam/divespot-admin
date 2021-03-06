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
  const { control, watch, setValue } = methods;
  const divespot = useSelector(selectDivespot);
  const [searchText, setSearchText] = useState('')
  const [sealives, setSealives] = useState([])
  const [selectedSealives, setSelectedSealives] = useState([])
  const combinedSealives = watch("combinedSealives")



  useEffect(() => {
    setValue("combinedSealives", divespot?.sealife)
  }, [])

  useEffect(() => {


    const asyncFn = async () => {
      if (searchText) {
        const response = await axios.get(`/admin/sealife/search?q=${searchText}&page=0&size=20&sort=binomialName`);
        const data = await response.data.content;
        setSealivesOptions(data)
      }
    };
    asyncFn();




  }, [searchText]);


  const handleLinkSealife = () => {
    setSelectedSealives(sealives)
    if (divespot.sealife && divespot.sealife.length > 0)
      setValue("combinedSealives", [...divespot.sealife, ...selectedSealives, ...sealives], { shouldDirty: true })
    else
      setValue("combinedSealives", [...selectedSealives, ...sealives], { shouldDirty: true })

    setSealives([])
  }

  const handleRemoveSealife = (id) => {
    setValue("combinedSealives", combinedSealives.filter(c => c.id != id), { shouldDirty: true })
  }

  return (
    <div>

      <div className='flex'>


        <Autocomplete
          value={sealives}
          onChange={(event, newValue) => {
            setSealives(newValue);
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

        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          disabled={sealives.length == 0}
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
                <Typography className="font-semibold">Binomial Name</Typography>
              </th>
              <th>
                <Typography className="font-semibold">Family Name</Typography>
              </th>
              <th>
                <Typography className="font-semibold">Distribution</Typography>
              </th>

              <th>
                <Typography className="font-semibold text-right">Action</Typography>
              </th>
            </tr>
          </thead>
          <tbody>

            {combinedSealives?.map((s) => (
              <tr key={s.id}>
                <td className="w-64">{s.id}</td>
                <td className="w-80">
                  <img className="product-image" src={s.images ? s.images[0] : ""} alt="product" />
                </td>
                <td className="w-64 ">
                  <Typography
                    component={Link}
                    to={`/sealives/${s.id}`}
                    className="truncate"
                    style={{
                      color: 'inherit',
                      textDecoration: 'underline',
                    }}
                  >
                    {s.binomialName}
                  </Typography>
                </td>
                <td className="w-64 ">
                  <span className="truncate">{s.familyName}</span>
                </td>
                <td className="w-64 ">
                  <span className="truncate">{s.distribution}</span>
                </td>

                <td className="w-64 text-right">
                  <Button
                    className="whitespace-nowrap"
                    variant="contained"
                    color="primary"
                    onClick={() => handleRemoveSealife(s.id)}
                  >
                    Remove
                  </Button>
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
