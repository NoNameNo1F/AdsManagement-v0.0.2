import React, { ChangeEvent, useMemo, useState } from 'react';
import "./AdsPoint.css";
import AdsPointItem from './AdsPointItem';
import { IAdsPointItem } from '../../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';

const AdsPointsList: React.FC = () => {
    const dispatch = useDispatch();

    const adsPointsList: IAdsPointItem[] = useSelector((state: RootState) => state.adsPoint.adsPointsList);
    const [searchInput, setSearchInput] = useState<string>("");

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value.toLocaleLowerCase());
    };
    const filteredAdsPoints = useMemo(() => {
        if (!searchInput) {
            return adsPointsList;
        }
        return adsPointsList.filter((adsPoint) => adsPoint.Address.toLowerCase().includes(searchInput));
    }, [searchInput, adsPointsList]);
    return (
        <div className="col-12">
            <div className="ads-points-search">
                <i className="bi bi-search"></i>
                <input
                    className="search-input"
                    placeholder="Tìm kiếm theo địa chỉ"
                    id="search-input"
                    value={searchInput}
                    onChange={(event) => handleSearchChange(event)} />
            </div>
            <div className="ads-points-list">
                {filteredAdsPoints.map((ads, index) => (
                    <AdsPointItem
                        key={index}
                        {...ads}
                    />
                ))}

            </div>
        </div>
    );
};

export default AdsPointsList;