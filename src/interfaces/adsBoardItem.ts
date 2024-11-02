import { EAdsBoardType } from "../enums";
import IAdsPointItem from "./adsPointItem";
import ICompanyContact from "./companyContact";

export default interface IAdsBoardItem {
    boardId: string;
    adsPoint: IAdsPointItem;
    adsBoardType: EAdsBoardType;
    size: string;
    quantity: number;
    image: string;
    expiredDate: string;
    companyContact: ICompanyContact;
}