import { EAdsBoardType } from "../enums";
import IAdsPointItem from "./adsPointItem";
import ICompanyContact from "./companyContact";

export default interface IAdsBoardItem {
    Id: string;
    AdsPoint: IAdsPointItem;//IAdsPointItem;
    AdsBoardType: EAdsBoardType;
    Size: string;
    Quantity: number;
    Image: string;
    ExpiredDate: string;
    CompanyContact: ICompanyContact;
}