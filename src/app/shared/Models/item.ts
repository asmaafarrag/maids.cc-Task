import { ItemTaxTypes } from "./item-tax-types";

export class Item {
    ItemID: number;

    ItemNO: number;

    ItemName: string;

    ItemSalePrice: number;

    UnitId : number;
    DollarPrice:number;
    
    UnitName: string;

    ItemNote1: string;
    ItemNote2: string;
    CompanyName: string;
    AvailableQty: number;
    GroupID:number;
    ItmTaxRatio:number;
    TaxTypeID:number;
    GS1Code :string ; //1
    EGSCode :string ; //2
    RequestId :string  
    codeType:string;
    parentCode:string;
    activeFrom:string;
    activeTo:string;
    // isSelected : boolean;
    itemupdateprice:number;
    itemupdateRatioprice:number;
    UpdatePriceDate:string;
    ItemTaxTypes:ItemTaxTypes[];

}
