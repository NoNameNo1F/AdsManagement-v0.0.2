import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import "./AdsPoint.css";
import AdsPointItem from './AdsPointItem';
import { IAdsPointItem } from '../../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';
import { AdsType, LocationType } from '../../../enums';

const adsPointsList: IAdsPointItem[] = [
    {
        id: 1,
        address: "123 Main St, District 1",
        locationType: LocationType.BUS_STOP,
        adsType: AdsType.POLITICAL_PROMOTION,
        adsPointImage: "image1.jpg",
        district: { id: 1, name: "District 1" },
        ward: { id: 101, name: "Ward 101" },
        lon: 106.6958,
        lat: 10.7626,
        isPlanned: true,
        numberOfBoards: 3,
    },
    {
        id: 2,
        address: "456 Oak Ave, District 2",
        locationType: LocationType.COMMERCIAL_CENTER,
        adsType: AdsType.SOCIALIZATION,
        adsPointImage: "image2.jpg",
        district: { id: 2, name: "District 2" },
        ward: { id: 102, name: "Ward 102" },
        lon: 106.6825,
        lat: 10.7639,
        isPlanned: false,
        numberOfBoards: 2,
    },
    {
        id: 3,
        address: "789 Pine St, District 3",
        locationType: LocationType.INDIVIDUAL_HOUSE,
        adsType: AdsType.COMMERCIAL_ADVERTISING,
        adsPointImage: "image3.jpg",
        district: { id: 3, name: "District 3" },
        ward: { id: 103, name: "Ward 103" },
        lon: 106.7000,
        lat: 10.7752,
        isPlanned: true,
        numberOfBoards: 4,
    },
    {
        id: 4,
        address: "101 Elm St, District 4",
        locationType: LocationType.PARK,
        adsType: AdsType.SOCIALIZATION,
        adsPointImage: "image4.jpg",
        district: { id: 4, name: "District 4" },
        ward: { id: 104, name: "Ward 104" },
        lon: 106.7123,
        lat: 10.7901,
        isPlanned: false,
        numberOfBoards: 1,
    },
    {
        id: 5,
        address: "202 Maple St, District 5",
        locationType: LocationType.COMMERCIAL_CENTER,
        adsType: AdsType.POLITICAL_PROMOTION,
        adsPointImage: "image5.jpg",
        district: { id: 5, name: "District 5" },
        ward: { id: 105, name: "Ward 105" },
        lon: 106.7154,
        lat: 10.7804,
        isPlanned: true,
        numberOfBoards: 3,
    },
    {
        id: 6,
        address: "303 Birch St, District 6",
        locationType: LocationType.COMMERCIAL_CENTER,
        adsType: AdsType.COMMERCIAL_ADVERTISING,
        adsPointImage: "image6.jpg",
        district: { id: 6, name: "District 6" },
        ward: { id: 106, name: "Ward 106" },
        lon: 106.7187,
        lat: 10.7732,
        isPlanned: false,
        numberOfBoards: 5,
    },
    {
        id: 7,
        address: "404 Cedar St, District 7",
        locationType: LocationType.TRAFFIC_SAFETY_CORRIDOR,
        adsType: AdsType.SOCIALIZATION,
        adsPointImage: "image7.jpg",
        district: { id: 7, name: "District 7" },
        ward: { id: 107, name: "Ward 107" },
        lon: 106.7289,
        lat: 10.7701,
        isPlanned: true,
        numberOfBoards: 2,
    },
    {
        id: 8,
        address: "505 Spruce St, District 8",
        locationType: LocationType.PUBLIC_LAND,
        adsType: AdsType.POLITICAL_PROMOTION,
        adsPointImage: "image8.jpg",
        district: { id: 8, name: "District 8" },
        ward: { id: 108, name: "Ward 108" },
        lon: 106.7352,
        lat: 10.7654,
        isPlanned: false,
        numberOfBoards: 3,
    },
    {
        id: 9,
        address: "606 Fir St, District 9",
        locationType: LocationType.INDIVIDUAL_HOUSE,
        adsType: AdsType.COMMERCIAL_ADVERTISING,
        adsPointImage: "image9.jpg",
        district: { id: 9, name: "District 9" },
        ward: { id: 109, name: "Ward 109" },
        lon: 106.7410,
        lat: 10.7589,
        isPlanned: true,
        numberOfBoards: 4,
    },
    {
        id: 10,
        address: "707 Aspen St, District 10",
        locationType: LocationType.PUBLIC_LAND,
        adsType: AdsType.POLITICAL_PROMOTION,
        adsPointImage: "image10.jpg",
        district: { id: 10, name: "District 10" },
        ward: { id: 110, name: "Ward 110" },
        lon: 106.7521,
        lat: 10.7543,
        isPlanned: false,
        numberOfBoards: 1,
    },
    {
        id: 11,
        address: "808 Willow St, District 11",
        locationType: LocationType.MARKET,
        adsType: AdsType.SOCIALIZATION,
        adsPointImage: "image11.jpg",
        district: { id: 11, name: "District 11" },
        ward: { id: 111, name: "Ward 111" },
        lon: 106.7604,
        lat: 10.7487,
        isPlanned: true,
        numberOfBoards: 3,
    },
    {
        id: 12,
        address: "909 Poplar St, District 12",
        locationType: LocationType.COMMERCIAL_CENTER,
        adsType: AdsType.COMMERCIAL_ADVERTISING,
        adsPointImage: "image12.jpg",
        district: { id: 12, name: "District 12" },
        ward: { id: 112, name: "Ward 112" },
        lon: 106.7698,
        lat: 10.7420,
        isPlanned: false,
        numberOfBoards: 2,
    },
    {
        id: 13,
        address: "1010 Cypress St, District 13",
        locationType: LocationType.INDIVIDUAL_HOUSE,
        adsType: AdsType.SOCIALIZATION,
        adsPointImage: "image13.jpg",
        district: { id: 13, name: "District 13" },
        ward: { id: 113, name: "Ward 113" },
        lon: 106.7791,
        lat: 10.7352,
        isPlanned: true,
        numberOfBoards: 4,
    },
    {
        id: 14,
        address: "1111 Redwood St, District 14",
        locationType: LocationType.MARKET,
        adsType: AdsType.POLITICAL_PROMOTION,
        adsPointImage: "image14.jpg",
        district: { id: 14, name: "District 14" },
        ward: { id: 114, name: "Ward 114" },
        lon: 106.7856,
        lat: 10.7284,
        isPlanned: false,
        numberOfBoards: 1,
    },
    {
        id: 15,
        address: "1212 Mahogany St, District 15",
        locationType: LocationType.PARK,
        adsType: AdsType.SOCIALIZATION,
        adsPointImage: "image15.jpg",
        district: { id: 15, name: "District 15" },
        ward: { id: 115, name: "Ward 115" },
        lon: 106.7910,
        lat: 10.7215,
        isPlanned: true,
        numberOfBoards: 5,
    },
    {
        id: 16,
        address: "1313 Magnolia St, District 16",
        locationType: LocationType.PRIVATE_LAND,
        adsType: AdsType.COMMERCIAL_ADVERTISING,
        adsPointImage: "image16.jpg",
        district: { id: 16, name: "District 16" },
        ward: { id: 116, name: "Ward 116" },
        lon: 106.8002,
        lat: 10.7140,
        isPlanned: false,
        numberOfBoards: 2,
    },
    {
        id: 17,
        address: "1414 Beech St, District 17",
        locationType: LocationType.TRAFFIC_SAFETY_CORRIDOR,
        adsType: AdsType.POLITICAL_PROMOTION,
        adsPointImage: "image17.jpg",
        district: { id: 17, name: "District 17" },
        ward: { id: 117, name: "Ward 117" },
        lon: 106.8095,
        lat: 10.7063,
        isPlanned: true,
        numberOfBoards: 3,
    },
    {
        id: 18,
        address: "1515 Chestnut St, District 18",
        locationType: LocationType.COMMERCIAL_CENTER,
        adsType: AdsType.SOCIALIZATION,
        adsPointImage: "image18.jpg",
        district: { id: 18, name: "District 18" },
        ward: { id: 118, name: "Ward 118" },
        lon: 106.8173,
        lat: 10.6985,
        isPlanned: false,
        numberOfBoards: 4,
    },
    {
        id: 19,
        address: "1616 Alder St, District 19",
        locationType: LocationType.PUBLIC_LAND,
        adsType: AdsType.POLITICAL_PROMOTION,
        adsPointImage: "image19.jpg",
        district: { id: 19, name: "District 19" },
        ward: { id: 119, name: "Ward 119" },
        lon: 106.8234,
        lat: 10.6909,
        isPlanned: true,
        numberOfBoards: 1,
    },
    {
        id: 20,
        address: "1717 Sequoia St, District 20",
        locationType: LocationType.GAS_STATION,
        adsType: AdsType.COMMERCIAL_ADVERTISING,
        adsPointImage: "image20.jpg",
        district: { id: 20, name: "District 20" },
        ward: { id: 120, name: "Ward 120" },
        lon: 106.8312,
        lat: 10.6831,
        isPlanned: false,
        numberOfBoards: 5,
    },
];

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
        return adsPointsList.filter((adsPoint) => adsPoint.address.toLowerCase().includes(searchInput));
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