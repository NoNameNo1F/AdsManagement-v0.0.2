import React, { useState } from 'react';
import HeaderSortButton from './HeaderSortButton';
import HeaderFilterButton from './HeaderFilterButton';
import "../Dashboard.css";
import { IAdsPointItem } from '../../../../interfaces';
import { LocationType } from '../../../../enums';
const sampleData: IAdsPointItem[] = [
    {
        PointId: "19",
        Address: "1616 Alder St, District 19",
        LocationType: "PUBLIC_LAND",
        AdvertisingForm: "POLITICAL_PROMOTION",
        Images: ["image19.jpg"],
        District: { id: 19, name: "District 19" },
        Ward: { id: 119, name: "Ward 119" },
        Coordinates: {
            Longtitude: "106.8234",
            Latitude: "10.6909"
        },
        IsPlanned: true,
        NumberOfBoards: 1,
    },
    {
        PointId: "19",
        Address: "1616 Alder St, District 19",
        LocationType: "PUBLIC_LAND",
        AdvertisingForm: "POLITICAL_PROMOTION",
        Images: ["image19.jpg"],
        District: { id: 19, name: "District 19" },
        Ward: { id: 119, name: "Ward 119" },
        Coordinates: {
            Longtitude: "106.8234",
            Latitude: "10.6909"
        },
        IsPlanned: true,
        NumberOfBoards: 1,
    }, {
        PointId: "19",
        Address: "1616 Alder St, District 19",
        LocationType: "PUBLIC_LAND",
        AdvertisingForm: "POLITICAL_PROMOTION",
        Images: ["image19.jpg"],
        District: { id: 19, name: "District 19" },
        Ward: { id: 119, name: "Ward 119" },
        Coordinates: {
            Longtitude: "106.8234",
            Latitude: "10.6909"
        },
        IsPlanned: true,
        NumberOfBoards: 1,
    }, {
        PointId: "19",
        Address: "1616 Alder St, District 19",
        LocationType: "PUBLIC_LAND",
        AdvertisingForm: "POLITICAL_PROMOTION",
        Images: ["image19.jpg"],
        District: { id: 19, name: "District 19" },
        Ward: { id: 119, name: "Ward 119" },
        Coordinates: {
            Longtitude: "106.8234",
            Latitude: "10.6909"
        },
        IsPlanned: true,
        NumberOfBoards: 1,
    }, {
        PointId: "19",
        Address: "1616 Alder St, District 19",
        LocationType: "PUBLIC_LAND",
        AdvertisingForm: "POLITICAL_PROMOTION",
        Images: ["image19.jpg"],
        District: { id: 19, name: "District 19" },
        Ward: { id: 119, name: "Ward 119" },
        Coordinates: {
            Longtitude: "106.8234",
            Latitude: "10.6909"
        },
        IsPlanned: true,
        NumberOfBoards: 1,
    }, {
        PointId: "19",
        Address: "1616 Alder St, District 19",
        LocationType: "PUBLIC_LAND",
        AdvertisingForm: "POLITICAL_PROMOTION",
        Images: ["image19.jpg"],
        District: { id: 19, name: "District 19" },
        Ward: { id: 119, name: "Ward 119" },
        Coordinates: {
            Longtitude: "106.8234",
            Latitude: "10.6909"
        },
        IsPlanned: true,
        NumberOfBoards: 1,
    },
];
// const locationTypes = ["Traffic safety corridor", "Residential Area", "Commercial Area"];
// const advertisementTypes = ["Commercial Advertising", "Public Service"];
// const wards = ["Ward 5", "Ward 6", "Ward 7"];
// const districts = ["District 6", "District 7", "District 8"];
// const statuses = ["Planned", "Active", "Inactive"];
const Table: React.FC<any> = (table: IAdsPointItem[]) => {
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const [data, setData] = useState(table || sampleData);
    const [filteredData, setFilteredData] = useState(table || sampleData);
    // sort tren data table,
    // filter

    const handleSort = (column: string) => {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));

        const sortedData = [...filteredData].sort((a: any, b: any) => {
            const aValue = a[column].toString().toLowerCase();
            const bValue = b[column].toString().toLowerCase();

            return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });

        setFilteredData(sortedData);
    };

    const handleFilter = ((column: string, filter: string) => {
        if (!filter) {
            setFilteredData(data);
        }
        else {
            const filteredRows = data.filter((row: any) => {
                return row[column].toLowerCase() === filter.toLowerCase();
            });
            setFilteredData(filteredRows);
        }
    });

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <HeaderSortButton
                                label="Point ID"
                                onClick={() => handleSort('id')}
                                isSorted={true}
                                sortDirection={sortDirection}
                            />
                        </th>
                        <th>
                            <HeaderSortButton
                                label="Address"
                                onClick={() => handleSort('address')}
                                isSorted={true}
                                sortDirection={sortDirection}
                            />
                        </th>
                        <th>
                            <HeaderFilterButton
                                label="LocationType"
                                options={Object.values(LocationType)}
                                onFilter={(filter) => handleFilter('locationType', filter)}
                            />
                        </th>
                        <th>
                            <HeaderFilterButton
                                label="AdvertisementType"
                                options={Object.values(LocationType)}
                                onFilter={(filter) => handleFilter('adsType', filter)}
                            />
                        </th>
                        <th>
                            <HeaderSortButton
                                label="Ward"
                                onClick={() => handleSort('ward.name')}
                                isSorted={true}
                                sortDirection={sortDirection}
                            />
                        </th>
                        <th>
                            <HeaderSortButton
                                label="District"
                                onClick={() => handleSort('District')}
                                isSorted={true}
                                sortDirection={sortDirection}
                            />
                        </th>
                        {/* <th
                            onClick={() => toggleDropdown('LocationType')}
                            data-bs-toggle="dropdown"
                            data-bs-target="LocationType"
                            aria-expanded="false"
                        >
                            Location Type <i className="bi bi-arrow-down-up" title="Filter by Location Type">
                                <ul className="dropdown-menu">
                                    {locationTypes.map(type => (<li className="dropdown-item-style" key={type}>{type}</li>))}
                                </ul>
                            </i>
                        </th> */}
                        {/* <th
                            onClick={() => toggleDropdown('AdvertisementType')}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Advertisement Type <i className="bi bi-arrow-down-up" title="Filter by Advertisement Type">
                                <ul className="dropdown-menu">
                                    {advertisementTypes.map(type => (<li
                                        className="dropdown-item-style" key={type}>{type}</li>))}
                                </ul>
                            </i>
                        </th> */}
                        {/* <th
                            onClick={() => toggleDropdown('Ward')}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Ward <i className="bi bi-arrow-down-up" title="Filter by Ward">
                                <ul className="dropdown-menu">
                                    {wards.map(ward => (<li
                                        className="dropdown-item-style"
                                        key={ward}>{ward}</li>))}
                                </ul>
                            </i>
                        </th>
                        <th
                            onClick={() => toggleDropdown('District')}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            District <i className="bi bi-arrow-down-up" title="Filter by Ward">
                                <ul className="dropdown-menu">
                                    {wards.map(ward => (<li className="dropdown-item-style"
                                        key={ward}>{ward}</li>))}
                                </ul>
                            </i>
                        </th> */}
                        <th>
                            LonLat
                        </th>
                        <th>
                            Number of Boards
                        </th>
                        <th>
                            <HeaderFilterButton
                                label="Status"
                                options={["Planned", "Not Planned"]}
                                onFilter={(filter) => handleFilter('isPlanned', filter)}
                            />
                        </th>
                        {/* <th
                            onClick={() => toggleDropdown('Status')}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Status <i className="bi bi-arrow-down-up" title="Filter by Status">
                                <ul className="dropdown-menu">
                                    {statuses.map(status => (<li className="dropdown-item-style" key={status}>{status}</li>))}
                                </ul>
                            </i>
                        </th> */}
                        <th>Reports <i className="bi bi-arrow-down-up"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {/* load from mongoDb */}
                    {sampleData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.PointId}</td>
                            <td>{item.Address}</td>
                            <td>{item.LocationType}</td>
                            <td>{item.AdvertisingForm}</td>
                            <td>{item.Ward.name}</td>
                            <td>{item.District.name}</td>
                            <td>{item.Coordinates.Longtitude}, {item.Coordinates.Latitude}</td>
                            <td>{item.NumberOfBoards} / 6</td>
                            <td>{item.IsPlanned ? 'Planned' : 'Wait for Approval'}</td>
                            {/* <td>{item.reports}</td> */}
                            <td> 0</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default Table;