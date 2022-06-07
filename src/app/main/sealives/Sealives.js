import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from './store';
import DivespotsHeader from './SealivesHeader';
import DivespotsTable from './SealivesTable';

function Divespots() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<DivespotsHeader />}
      content={<DivespotsTable />}
      scroll={isMobile ? 'page' : 'content'}
    />
  );
}

export default withReducer('SL', reducer)(Divespots);
