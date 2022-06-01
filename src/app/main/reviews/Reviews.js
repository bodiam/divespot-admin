import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from './store';
import DivespotsHeader from './ReviewsHeader';
import DivespotsTable from './ReviewsTable';

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

export default withReducer('DV', reducer)(Divespots);
