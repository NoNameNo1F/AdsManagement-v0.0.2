import "./AdsPoint.css";
// import AdsPointsList from './AdsPointsList';
import AdsPointItemDetail from './AdsPointItemDetail';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';
import { IAdsPointItem } from '../../../interfaces';
import React, { Suspense } from "react";

const AdsPointsList = React.lazy(() => import('./AdsPointsList'));
const AdsPointContainer: React.FC = () => {
    const selectedAdsPointItem: IAdsPointItem = useSelector((state: RootState) => state.advertisement.selectedAdsPointItem);

    return (
        <div className="ads-point-container">
            {selectedAdsPointItem ? (
                <AdsPointItemDetail {...selectedAdsPointItem} />) : (
                <Suspense fallback={<div>Loading Ads Points...</div>}>
                    <AdsPointsList />
                </Suspense>
            )}
        </div>
    );
};

export default AdsPointContainer;