import { Item } from 'src/app/shared/Models/item';
import { TaxType } from "./tax-type";

export class ItemTaxTypes {
    ItemsTaxTypeId:number;
    ItemID:number;
    TaxTypeID:number;
    TaxTypeName:string;
    TaxTypeRate:number;
    TaxTypeAmount:number;   
    TaxTypeCalcWayId :number;   
}
