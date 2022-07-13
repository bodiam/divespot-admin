import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { selectDivespot } from '../../store/divespotSlice';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState } from 'react';

function ReviewsTab(props) {
  const methods = useFormContext();
  const { control } = methods;
  const divespot = useSelector(selectDivespot);
  const [open, setOpen] = useState(false)
  return (
    <div className="table-responsive">

      <Fab
        className="absolute right-0 bottom-0 m-8"
        variant="extended"
        size="small"
        color="secondary"
        aria-label="Add a review"
        type="button"
        onClick={() => setOpen(true)}
        disabled
      >
        <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
      </Fab>

      <table className="simple">
        <thead>
          <tr>
            <th>
              <Typography className="font-semibold">User</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Content</Typography>
            </th>
            <th className="w-64 text-right">
              <Typography className="font-semibold">Activity</Typography>
            </th>
            <th className="w-64 text-right">
              <Typography className="font-semibold">Score</Typography>
            </th>
            <th className="w-64 text-right">
              <Typography className="font-semibold">createDateTime</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {divespot?.reviews?.map((s, key) => (
            <tr key={key}>
              <td className="w-64 text-left">
                <Typography
                  //component={Link}
                  //to={`/reviews/${s.id}`}
                  className="truncate"
                  //style={{
                    //color: 'inherit',
                    //textDecoration: 'underline',
                  //}}
                >
                  {s.userAccount.firstName + s.userAccount.lastName}
                </Typography>
              </td>
              <td className="w-128 text-left">
                <span >{s.content}</span>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">{s.activity}</span>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">{s.score}</span>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">{s.createDateTime ? new Date(s.createDateTime).toLocaleString() : 'N/A'}</span>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewsTab;
