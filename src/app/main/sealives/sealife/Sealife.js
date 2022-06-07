import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { getSealife, newSealife, resetSealife, selectSealife } from '../store/sealifeSlice';
import reducer from '../store';
import SealifeHeader from './SealifeHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import SealifeTab from './tabs/PricingTab';
import SealifeImagesTab from './tabs/SealifeImagesTab';
import ReviewsTab from './tabs/ShippingTab';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required('You must enter a sealife name')
});

function Sealife(props) {
  const dispatch = useDispatch();
  const sealife = useSelector(selectSealife);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noSealife, setNoSealife] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateSealifeState() {
      const { sealifeId } = routeParams;

      if (sealifeId === 'new') {
        /**
         * Create New Sealife data
         */
        dispatch(newSealife());
      } else {
        /**
         * Get Sealife data
         */
        dispatch(getSealife(sealifeId)).then((action) => {
          /**
           * If the requested sealife is not exist show message
           */
          if (!action.payload) {
            setNoSealife(true);
          }
        });
      }
    }

    updateSealifeState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!sealife) {
      return;
    }
    /**
     * Reset the form on sealife state changes
     */
    reset(sealife);
  }, [sealife, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Sealife on component unload
       */
      dispatch(resetSealife());
      setNoSealife(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested sealives is not exists
   */
  if (noSealife) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such sealife!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/sealives"
          color="inherit"
        >
          Go to Sealives Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while sealife data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (sealife && routeParams.sealifeId !== sealife.id?.toString() && routeParams.sealifeId !== 'new')
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<SealifeHeader />}
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: 'w-full h-64 border-b-1' }}
            >
              <Tab className="h-64" label="Basic Info" />
              <Tab className="h-64" label="Sealife Images" disabled/>
              <Tab className="h-64" label="Sea life" disabled/>
              <Tab className="h-64" label="Reviews" disabled/>
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <BasicInfoTab />
              </div>

              <div className={tabValue !== 1 ? 'hidden' : ''}>
                <SealifeImagesTab />
              </div>

              <div className={tabValue !== 2 ? 'hidden' : ''}>
                <SealifeTab />
              </div>

              <div className={tabValue !== 3 ? 'hidden' : ''}>
                <ReviewsTab />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? 'page' : 'content'}
      />
    </FormProvider>
  );
}

export default withReducer('SL', reducer)(Sealife);
