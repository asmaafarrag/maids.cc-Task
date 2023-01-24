import { ItemPriceModel } from './item-price-model';
import { ItemTaxTypes } from "./item-tax-types";

export class Item {
    // ItemID: number;

    // ItemNO: number;

    // ItemName: string;
    // ItemNameE: string;

    // ItemSalePrice: number;

    // UnitId : number;

    // UnitName: string;

    // ItemNote1: string;
    // ItemNote2: string;
    // CompanyName: string;
    // AvailableQty: number;
    // GroupID:number;
    // GroupName:string;
    //        ItmTaxRatio:number;
    // // DiscV:number;
    // TaxTypeID:number;
    // ItemBarCode:string;
    // GS1Code :    string
    // EGSCode :    string
    //       RequestId :  string
    // codeType:string;
    // parentCode:string;
    // activeFrom:string;
    // activeTo:string;
    // isSelected : boolean;
    // ItemTaxTypes:ItemTaxTypes[]



      item_ID :number;
      item_Name :string;
      item_Description  :string;
      item_ImageURL  :string;
      item_ImageFile :string;
      item_Enabled :boolean;
      rows_Count :number;
      columns_Count :number;
      opening_StartValue :number;
      opening_Step :number;

      itemPrices:ItemPriceModel[];
      isSelected:boolean;
      // entryUser  :string;
      // entrydate  :string;

}
