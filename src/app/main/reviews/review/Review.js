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
import { getDivespot, newDivespot, resetDivespot, selectDivespot } from '../store/reviewSlice';
import reducer from '../store';
import DivespotHeader from './ReviewHeader';
import BasicInfoTab from './tabs/BasicInfoTab';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required('You must enter a divespot name')
});

function Divespot(props) {
  const dispatch = useDispatch();
  const divespot = useSelector(selectDivespot);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noDivespot, setNoDivespot] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateDivespotState() {
      const { divespotId } = routeParams;

      if (divespotId === 'new') {
        /**
         * Create New Divespot data
         */
        dispatch(newDivespot());
      } else {
        /**
         * Get Divespot data
         */
        dispatch(getDivespot(divespotId)).then((action) => {
          /**
           * If the requested divespot is not exist show message
           */
          if (!action.payload) {
            setNoDivespot(true);
          }
        });
      }
    }

    updateDivespotState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!divespot) {
      return;
    }
    /**
     * Reset the form on divespot state changes
     */
    reset(divespot);
  }, [divespot, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Divespot on component unload
       */
      dispatch(resetDivespot());
      setNoDivespot(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested divespots is not exists
   */
  if (noDivespot) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such divespot!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/e-commerce/divespots"
          color="inherit"
        >
          Go to Divespots Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while divespot data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (divespot && routeParams.divespotId !== divespot.id?.toString() && routeParams.divespotId !== 'new')
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<DivespotHeader />}
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
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <BasicInfoTab />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? 'page' : 'content'}
      />
    </FormProvider>
  );
}

export default withReducer('DV', reducer)(Divespot);
