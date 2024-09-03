import React from 'react';
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';
import { IAdsPointItem } from '../../../interfaces';
import { selectAdsPoint } from '../../../store/redux/AdsPoint/actions';

const AdsPointItemDetail: React.FC<IAdsPointItem> = (adsPointItem: IAdsPointItem) => {

    const dispatch = useDispatch();

    return (
        <div>
            <div className="ads-point-item-detail">
                <div className="detail-section" style={{ width: '330px', height: '300px' }}>
                    <h4>Detail Information</h4>
                    <p>Address: {adsPointItem.address}</p>
                    <p>Ward: {adsPointItem.ward.name}</p>
                    <p>District: {adsPointItem.district.name}</p>
                    <p>Type of Ads: {adsPointItem.adsType}</p>
                    <p>Location Type: {adsPointItem.locationType}</p>
                    <p>Number of Boards: {adsPointItem.numberOfBoards}</p>
                    <p>Planned Status: {adsPointItem.isPlanned ? "Planned" : "Wait for Approval"}</p>
                </div>
                {/* <div className="boards-section">
                    <h4>Advertisement Boards</h4>
                    {adsPointItem.adsBoards?.map((board, index) => (
                        <div key={index} className="board-item">
                            <p>Company Name: {board.companyContacts.companyName}</p>
                            <p>Board Type: {board.adBoardType}</p>
                            <p>Size: {board.size}</p>
                        </div>
                    ))}
                </div> */}
                {/* <div className="ads-point-detail-image">
                    <img src="https://th.bing.com/th/id/OIP.v8hT9gXo1QmVeH-9LA6fHgHaIB?rs=1&pid=ImgDetMain" alt="Location Image" />
                </div> */}
                <button onClick={() => dispatch(selectAdsPoint(null))}>Close</button>
            </div>
        </div>
    );
};

export default AdsPointItemDetail;