import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import GoogleMap from 'google-map-react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Tooltip from '@mui/material/Tooltip';


function Marker(props) {
  return (
    <Tooltip title={props.text} placement="top">
      <FuseSvgIcon className="text-red">heroicons-outline:location-marker</FuseSvgIcon>
    </Tooltip>
  );
}

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState, watch } = methods;
  const { errors } = formState;
  const name = watch('name');
  const latitude = watch('latitude');
  const longitude = watch('longitude');

  return (
    <div>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="description"
            label="Description"
            type="text"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <div className="flex -mx-4">
        <div className="flex-col">
          <Controller
            name="latitude"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                error={!!errors.latitude}
                helperText={errors?.latitude?.message}
                label="Latitude"
                autoFocus
                id="latitude"
                variant="outlined"
                fullWidth
                type="number"
              />
            )}
          />

          <Controller
            name="longitude"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                error={!!errors.longitude}
                helperText={errors?.longitude?.message}
                label="Longitude"
                autoFocus
                id="longitude"
                variant="outlined"
                fullWidth
                type="number"
              />
            )}
          />

<Controller
            name="depth"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                error={!!errors.longitude}
                helperText={errors?.longitude?.message}
                label="Depth"
                autoFocus
                id="depth"
                variant="outlined"
                fullWidth
                type="number"
              />
            )}
          />
        </div>

        <div className="w-full h-320 rounded-16 overflow-hidden mx-8">
          <GoogleMap
            bootstrapURLKeys={{
              key: process.env.REACT_APP_MAP_KEY,
            }}
            defaultZoom={0}
            defaultCenter={[
              latitude,
              longitude,
            ]}
          >
            <Marker
              text={name}
              lat={latitude}
              lng={longitude}
            />
          </GoogleMap>
        </div>

      </div>

      <Controller
        name="level"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            options={["BEGINNER", "INTERMEDIATE", "ADVANCED"]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select level"
                label="Level"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <Controller
        name="entranceType"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            options={["SHORE_DIVE", "BOAT_DIVE"]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select entrance type"
                label="Entrance Type"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <Controller
        name="diveSiteType"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            options={["WRECK_DIVE", "CAVE_DIVE", "REEF_DIVE", "ARTIFICAL_REEF", "QUARRY_DIVE", "LAKE", "MUCK", "ROCKY_REEF", "POOL", "RIVER", "RESERVOIR", "WALL"]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select diveSite type"
                label="DiveSite Type"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />


<Controller
        name="tags"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            freeSolo
            multiple
            options={[]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Tags"
                label="Tags"
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

export default BasicInfoTab;
