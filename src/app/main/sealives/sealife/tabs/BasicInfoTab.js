import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import GoogleMap from 'google-map-react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useMemo } from 'react';
let marker, _map;
function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState, watch, setValue } = methods;
  const { errors } = formState;
  const binomialName = watch('name');
  const latitude = watch('latitude');
  const longitude = watch('longitude');


  const defaultCenter = useMemo(() => {
    return {
      lat: latitude,
      lng: longitude
    }
  }, [latitude, longitude])

  useEffect(()=>{
    if(marker)
     marker.setPosition({ lat: latitude, lng: longitude })

    }, [latitude, longitude])
   
   
     var loadMap = (map, maps) => { 
      _map = map
   
   
       marker = new maps.Marker({
         title: binomialName,
         position: { lat: latitude, lng: longitude },
         map,
         draggable: true,
         icon: "assets/images/markers/blue_MarkerD.png"
       })
   

   
   

   
       document.addEventListener("contextmenu", e => e.preventDefault());
   
   
       maps.event.addListener(marker, 'drag', function (event) {
         setValue("latitude", event.latLng.lat(), { shouldDirty: true })
         setValue("longitude", event.latLng.lng(), { shouldDirty: true })
       });
   
       maps.event.addListener(marker, 'dragend', function (event) {
         map.setCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() })
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
                       setValue("latitude", event.latLng.lat(), { shouldDirty: true })
                       setValue("longitude", event.latLng.lng(), { shouldDirty: true })
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
   
   
   
   
     }
  return (
    <div>
      <Controller
        name="source"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
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
        name="distribution"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="distribution"
            label="Distribution"
            type="text"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
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
            id="binomialName"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="commonNames"
        control={control}
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
        name="locations"
        control={control}
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
                placeholder="Write some locations"
                label="Locations"
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
        name="similarSealife"
        control={control}
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
                placeholder="Write some similar sealife"
                label="Similar Sealife"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />


<div className="flex -mx-4">
<div className="flex-col">

<Controller
  name="latitude"
  control={control}
  render={({ field: { value, onChange } }) => (
    <TextField
      value={value}
      onChange={(e) => {
        onChange(parseFloat(e.target.value ? e.target.value : ''))
        marker.setPosition({ lat: parseFloat(e.target.value ? e.target.value : ''), lng: longitude })
        marker.map.setCenter({ lat: parseFloat(e.target.value ? e.target.value : ''), lng: longitude })
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
  name="longitude"
  control={control}
  render={({ field: { value, onChange } }) => (
    <TextField
      value={value}
      onChange={(e) => {
        onChange(parseFloat(e.target.value ? e.target.value : ''))
        marker.setPosition({ lat: latitude, lng: parseFloat(e.target.value ? e.target.value : '') })
        marker.map.setCenter({ lat: latitude, lng: parseFloat(e.target.value ? e.target.value : '') })
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
              onChange(newValue.map(x=> { return x.name ? x : {name : x}}))
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
