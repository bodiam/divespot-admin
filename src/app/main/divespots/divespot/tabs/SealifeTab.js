import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { selectDivespot } from '../../store/divespotSlice';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function SealifeTab(props) {
  const methods = useFormContext();
  const { control } = methods;
  const divespot = useSelector(selectDivespot);

  return (
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
  );
}

export default SealifeTab;
