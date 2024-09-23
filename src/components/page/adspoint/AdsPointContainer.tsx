import "./AdsPoint.css";
import AdsPointsList from './AdsPointsList';
import AdsPointItemDetail from './AdsPointItemDetail';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';
import { IAdsPointItem } from '../../../interfaces';

const AdsPointContainer: React.FC = () => {

    const selectedAdsPointItem: IAdsPointItem = useSelector((state: RootState) => state.adsPoint.selectedAdsPointItem);

    return (
        <div className="ads-point-container">
            {selectedAdsPointItem ? (<AdsPointItemDetail {...selectedAdsPointItem} />) : (<AdsPointsList />)}
        </div>
    );
};

export default AdsPointContainer;