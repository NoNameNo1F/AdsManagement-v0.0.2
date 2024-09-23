import "./AdsPoint.css";
import AdsPointsList from './AdsPointsList';
import AdsPointItemDetail from './AdsPointItemDetail';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';
import { IAdsPointItem } from '../../../interfaces';

const AdsPointContainer: React.FC = () => {

    const selectedAdsPointItem: IAdsPointItem = useSelector((state: RootState) => state.adsPoint.selectedAdsPointItem);
    {/* {
        showOptions === "newest" ? <AdsPointList option="newest" /> :
            showOptions === "hot" ? <AdsPointList option="hot" /> :
                showOptions === "nearby" ? <AdsPointList option="nearby" /> :
                    <AdsPointList option="newest" />
    } */}

    return (
        <div className="ads-point-container">
            {selectedAdsPointItem ? (<AdsPointItemDetail {...selectedAdsPointItem} />) : (<AdsPointsList />)}
        </div>
    );
};

export default AdsPointContainer;