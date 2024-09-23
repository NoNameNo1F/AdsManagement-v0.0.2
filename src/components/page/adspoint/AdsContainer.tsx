import "./AdsPoint.css";
import AdsPointContainer from './AdsPointContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';
import { handleAdsContainer, } from '../../../store/redux/AdsPoint/actions';


const AdsContainer: React.FC = () => {
    const dispatch = useDispatch();
    const showAds = useSelector((state: RootState) => state.adsPoint.showAds);
    const isVisible: boolean = useSelector((state: RootState) => state.adsPoint.showAds);
    const title: string = useSelector((state: RootState) => state.adsPoint.adsTitle);


    return (
        <div className={`ads-container ${isVisible ? 'ads-container--show' : 'ads-container--hide'}`}>
            <div className="ads-header">
                <button className={`ads-icon-button${isVisible ? "--expanded" : ""}`} onClick={() => dispatch(handleAdsContainer(!showAds))}>
                    <i className={`bi ${isVisible ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
                </button>
                <span className={`ads-title ${isVisible ? 'ads-title--show' : 'ads-title--hide'}`}>
                    {title}
                </span>
            </div>
            {isVisible && (
                <AdsPointContainer />
            )}
        </div>
    );
};

export default AdsContainer;