import { orange } from '@mui/material/colors';
import { lighten, styled } from '@mui/material/styles';
import clsx from 'clsx';
import FuseUtils from '@fuse/utils';
import { Controller, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';

const Root = styled('div')(({ theme }) => ({
  '& .sealifeImageFeaturedStar': {
    position: 'absolute',
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },

  '& .sealifeImageUpload': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },

  '& .sealifeImageItem': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& .sealifeImageFeaturedStar': {
        opacity: 0.8,
      },
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& .sealifeImageFeaturedStar': {
        opacity: 1,
      },
      '&:hover .sealifeImageFeaturedStar': {
        opacity: 1,
      },
    },
  },
}));

function SealifeImagesTab(props) {
  const methods = useFormContext();
  const { control, watch, setValue, getValues } = methods;

  const images = watch('images');
  const uploadedImages = watch('uploadedImages');


  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  return (
    <Root>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <Controller
          name="uploadedImages"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Box
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              component="label"
              htmlFor="button-file"
              className="sealifeImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
            >
              <input
                accept="image/*"
                className="hidden"
                id="button-file"
                type="file"
                onChange={async (e) => {
                  const newImage = await toBase64(e.target.files[0])
                  setValue("uploadedImages", (uploadedImages ? [newImage, ...uploadedImages] : [newImage]), { shouldDirty: true })
                }}
                onClick={(e) =>  e.target.value = ''}
              />
              <FuseSvgIcon size={32} color="action">
                heroicons-outline:upload
              </FuseSvgIcon>
            </Box>
          )}
        />

        {uploadedImages?.map((image, key) => (
          <div
          onClick={() => setValue("uploadedImages", uploadedImages.filter(function(value, index){ 
            return index != key
        }), { shouldDirty: true })}
            role="button"
            tabIndex={0}
            className={clsx(
              'sealifeImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
            )}
            key={'uploaded' + key}
          >
            <FuseSvgIcon className="sealifeImageFeaturedStar">heroicons-solid:upload</FuseSvgIcon>
            <img className="max-w-none w-auto h-full" src={image} alt="divespot" />
           
            </div>
            
        ))}

        {images?.map((image, key) => (
          <div
            onClick={() => setValue("images", images.filter(function(value, index){ 
              return index != key
          }), { shouldDirty: true })}
            role="button"
            tabIndex={0}
            className={clsx(
              'sealifeImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
            )}
            key={'image' + key}
          >
            <FuseSvgIcon className="sealifeImageFeaturedStar">heroicons-solid:check</FuseSvgIcon>
            <img className="max-w-none w-auto h-full" src={image} alt="divespot" />
          </div>
        ))}

      </div>
    </Root>
  );
}

export default SealifeImagesTab;
