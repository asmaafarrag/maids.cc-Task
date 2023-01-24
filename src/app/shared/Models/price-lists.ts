export class PriceLists {

  priceList_ID:number;
  priceList_Customer:string;
  priceList_Representative:string;
  priceList_Validity:string;
  priceList_Date:string;
  supplying_Duration:number;
  priceList_Total:number;
  payment_First_Percent:number;
  payment_First_Value:number;
  payment_Second_Percent:number;
  payment_Second_Value:number;
  payment_Third_Percent:number;
  payment_Third_Value:number;
  attachment_1_URL:string;
  attachment_1_File:string;
  attachment_2_File:string;
  attachment_2_URL:string;
  exchangeRate:number;
  entryUser  :string;
  entrydate  :string;
  has_Contract:boolean;
  priceListAddOns:GetPriceListAddOnsViewModel[];
  priceListItems:GetPriceListItemsViewModel[];
  priceListOtherItems:GetPriceListOtherItemsViewModel[];
}


export class GetPriceListItemsViewModel{

  item_Price_ID :number;
  item_Price_Col  :number;
  item_ID :number;
  priceListItem_Name :string;
  item_Price_Value_Curr :number;
  item_Price_Value   :number;
  item_Total_Area  :number;
  item_Price_Value_PerMeter:number;
  item_Total_Price  :number;
  item_Total_Tax  :number;
  item_SubTotal  :number;
}


export class GetPriceListOtherItemsViewModel {
  item_ID:number;
  otherItem_Name:string;
  otherItem_Price:number;
  otherItem_QTY:number;
  otherItem_Total_Price:number;
  otherItem_Total_Tax:number;
  otherItem_SubTotal:number;

}


export class GetPriceListAddOnsViewModel {
  item_ID:number;
  addOn_Name:string;
  addOn_SubTotal:number;

}
