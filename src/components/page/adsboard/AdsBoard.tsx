import React from 'react';
import './AdsBoard.css';
import { IAdsBoardItem } from '../../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/store';
import { selectAdsBoard } from '../../../store/redux/Advertisement/actions';

const AdsBoardItem: React.FC<IAdsBoardItem> = (adsBoardItem: IAdsBoardItem) => {
    const displayAdsBoardModal: IAdsBoardItem = useSelector((state: RootState) => state.advertisement.selectedAdsBoardItem);
    const dispatch = useDispatch();

    return (
        <div className="ads-board-item" onClick={() => dispatch(selectAdsBoard(adsBoardItem))}>
            <div className="row">
                <div className="d-inline-block col-8 ads-board-title">
                    <span>{adsBoardItem.companyContact.name}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <div className="ads-board-item__summary">
                        <span className="fw-medium">
                            Type of Board:
                        </span>
                        &nbsp;{adsBoardItem.adsBoardType}
                    </div>
                    <div className="ads-board-item__summary">
                        <span className="fw-medium">
                            Size:
                        </span>
                        &nbsp;{adsBoardItem.size}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdsBoardItem;