import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { selectDivespot } from '../../store/divespotSlice';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function ReviewsTab(props) {
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
              <Typography className="font-semibold">User</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Score</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Content</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Activity</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {divespot?.reviews?.map((s) => (
            <tr key={s.id}>
              <td className="w-64">{s.id}</td>
              <td>
                <Typography
                  component={Link}
                  to={`/reviews/${s.id}`}
                  className="truncate"
                  style={{
                    color: 'inherit',
                    textDecoration: 'underline',
                  }}
                >
                  {s.userAccount.firstName}
                </Typography>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">${s.score}</span>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">${s.content}</span>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">{s.activity}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewsTab;
