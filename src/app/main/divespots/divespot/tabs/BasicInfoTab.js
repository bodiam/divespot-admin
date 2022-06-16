import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import GoogleMap from 'google-map-react';
import { useMemo } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';


function BasicInfoTab(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, setValue } = methods;
  const { errors } = formState;
  const name = watch('name');
  const latitude = watch('diveLocation.latitude');
  const longitude = watch('diveLocation.longitude');

  const startLatitude = watch('startLocation.latitude');
  const startLongitude = watch('startLocation.longitude');

  const defaultCenter = useMemo(() => {
    return {
      lat: latitude,
      lng: longitude
    }
  }
    , [])

  let marker, startLocationMarker;
  var loadMap = (map, maps) => {



    marker = new maps.Marker({
      title: name,
      position: { lat: latitude, lng: longitude },
      map,
      draggable: true,
      icon: "assets/images/markers/blue_MarkerD.png"
    })


    startLocationMarker = new maps.Marker({
      title: name,
      position: { lat: startLatitude, lng: startLongitude },
      map,
      draggable: true,
      icon: "assets/images/markers/yellow_MarkerS.png"


    })


    document.addEventListener("contextmenu", e => e.preventDefault());


    maps.event.addListener(marker, 'drag', function (event) {
      setValue("diveLocation.latitude", event.latLng.lat())
      setValue("diveLocation.longitude", event.latLng.lng())
    });

    maps.event.addListener(marker, 'dragend', function (event) {
      map.setCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() })
    });

    maps.event.addListener(startLocationMarker, 'drag', function (event) {
      setValue("startLocation.latitude", event.latLng.lat())
      setValue("startLocation.longitude", event.latLng.lng())
    });

    maps.event.addListener(map, "rightclick", function (event) {
      dispatch(
        openDialog({
          children: (
            <>
              <DialogTitle id="alert-dialog-title">Wanna place a location ?</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Choose the location type to mark it on the map
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => dispatch(closeDialog())} color="primary">
                  Close
                </Button>

                <Button
                  onClick={() => {
                    setValue("startLocation.latitude", event.latLng.lat())
                    setValue("startLocation.longitude", event.latLng.lng())
                    startLocationMarker.setPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() })
                    dispatch(closeDialog());
                  }}
                  sx={{ backgroundColor: '#FFFF00' }}
                >
                  Start Location
                </Button>

                <Button
                  onClick={() => {
                    setValue("diveLocation.latitude", event.latLng.lat())
                    setValue("diveLocation.longitude", event.latLng.lng())
                    marker.setPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() })
                    dispatch(closeDialog());
                  }}
                  sx={{ backgroundColor: '#2E2EFF' }}
                  
                >
                  Dive Location
                </Button>

              </DialogActions>
            </>
          ),
        })
      )
    });




  };




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

          <Typography className="font-semibold">Dive Location</Typography>

          <div className="flex">

            <Controller
              name="diveLocation.latitude"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value)
                    marker.setPosition({ lat: parseFloat(e.target.value).toFixed(6), lng: longitude })
                    marker.map.setCenter({ lat: parseFloat(e.target.value).toFixed(6), lng: longitude })
                  }}
                  className="mt-8 mb-16 mx-2"
                  error={!!errors.latitude}
                  helperText={errors?.latitude?.message}
                  label="Latitude"
                  
                  id="latitude"
                  variant="outlined"
                  fullWidth
                  type="number"
                />
              )}
            />

            <Controller
              name="diveLocation.longitude"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value)
                    marker.setPosition({ lat: latitude, lng: parseFloat(e.target.value).toFixed(6) })
                    marker.map.setCenter({ lat: latitude, lng: parseFloat(e.target.value).toFixed(6) })
                  }}
                  className="mt-8 mb-16"
                  error={!!errors.longitude}
                  helperText={errors?.longitude?.message}
                  label="Longitude"
                  
                  id="longitude"
                  variant="outlined"
                  fullWidth
                  type="number"
                />
              )}
            />
          </div>

          <Typography className="font-semibold">Start Location</Typography>

          <div className="flex">
            <Controller
              name="startLocation.latitude"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value)
                    startLocationMarker.setPosition({ lat: parseFloat(e.target.value), lng: startLongitude })
                  }}
                  className="mt-8 mb-16 mx-2"
                  error={!!errors.startLatitude}
                  helperText={errors?.startLatitude?.message}
                  label="Latitude"
                  
                  id="startLatitude"
                  variant="outlined"
                  fullWidth
                  type="number"
                />
              )}
            />

            <Controller
              name="startLocation.longitude"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value)
                    startLocationMarker.setPosition({ lat: startLatitude, lng: parseFloat(e.target.value) })
                  }}
                  className="mt-8 mb-16"
                  error={!!errors.startLongitude}
                  helperText={errors?.startLongitude?.message}
                  label="Longitude"
                  
                  id="startLongitude"
                  variant="outlined"
                  fullWidth
                  type="number"
                />
              )}
            />
          </div>

          <Typography className="font-semibold">Depth</Typography>

          <div className="flex">

            <Controller
              name="depth.minDepth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16 mx-2"
                  error={!!errors.longitude}
                  helperText={errors?.longitude?.message}
                  label="Min"
                  
                  id="depth.minDepth"
                  variant="outlined"
                  fullWidth
                  type="number"
                />
              )}
            />

            <Controller
              name="depth.maxDepth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  error={!!errors.longitude}
                  helperText={errors?.longitude?.message}
                  label="Max"
                  
                  id="depth.maxDepth"
                  variant="outlined"
                  fullWidth
                  type="number"
                />
              )}
            />
          </div>

          <Typography className="font-semibold">Visibility</Typography>

          <div className="flex">

            <Controller
              name="visibility.minVisibility"
              control={control}
              render={({ field:{value, onChange} }) => (
                <TextField
                  value={value ?? 0}
                  onChange={(event) => {
                    onChange(parseInt(event.target.value).toFixed(0));
                  }}
                  className="mt-8 mb-16 mx-2"
                  error={!!errors.longitude}
                  helperText={errors?.longitude?.message}
                  label="Min"
                  
                  id="visibility.minVisibility"
                  variant="outlined"
                  fullWidth
                  type="number"
                />
              )}
            />

            <Controller
              name="visibility.maxVisibility"
              control={control}
              render={({ field:{value, onChange} }) => (
                <TextField
                value={value ?? 0}
                onChange={(event) => {
                  onChange(parseInt(event.target.value).toFixed(0));
                }}
                  className="mt-8 mb-16"
                  error={!!errors.longitude}
                  helperText={errors?.longitude?.message}
                  label="Max"
                  
                  id="visibility.maxVisibility"
                  variant="outlined"
                  fullWidth
                  type="number"
                />
              )}
            />
          </div>


        </div>

        <div className="w-full h-480 rounded-16 overflow-hidden mx-8">
          <GoogleMap
            bootstrapURLKeys={{
              key: process.env.REACT_APP_MAP_KEY,
            }}
            center={defaultCenter}
            defaultZoom={5}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
          >
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
        name="activityType"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            options={["SWIMMING", "SNORKELING", "FREEDIVING", "SPEARFISHING", "SCUBA"]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select activity type"
                label="Activity Type"
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
            value={value.map(x=> x.name)}
            onChange={(event, newValue) => {
              onChange(newValue.map(x=> {return {name: x}}));
            }}
            options={[]}
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
