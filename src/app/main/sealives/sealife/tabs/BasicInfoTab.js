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
        name="source"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            error={!!errors.source}
            helperText={errors?.source?.message}
            label="Source"
            autoFocus
            id="source"
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

<Controller
        name="content"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="content"
            label="Content"
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
        name="commonNames"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            freeSolo
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Write some common names"
                label="Common Names"
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
        name="binomialName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            error={!!errors.binomialName}
            helperText={errors?.binomialName?.message}
            label="Binomial Name"
            autoFocus
            id="binomialName"
            variant="outlined"
            fullWidth
          />
        )}
      />

<Controller
        name="familyName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            error={!!errors.familyName}
            helperText={errors?.familyName?.message}
            label="Family Name"
            autoFocus
            id="familyName"
            variant="outlined"
            fullWidth
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
