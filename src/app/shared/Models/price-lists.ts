export class PriceLists {

  PriceListID:number;
  PriceListName  :string;
  PriceListNotes  :string;
  PriceListVal :number; 
  PriceListDate :string;
  CustomerId :string;
  custnam  :string;
  RespName  :string;
  StoreId :number;
  ListTimeFrom  :string;
  ListTimeTo :string;
  ListTime :string;
  ListDisc :number;
  PayCond :string;
  TaxComm :number;
  SaleTax :number;
  ListCond :string;
  NetAfterDisc :number;
  NetAfterTaxComm :number;
  Net :number;
  RecPlace:string;
  ListData :string;
  TelNo :string;
  EMail:string;
  FaxNo:string;
  EmpResp:string;
  PriceListDets:PriceListDet[];
}


export class PriceListDet{

  PriceListID :number;
  PRICE  :number;
  ItemID :number;
  ItemName :string;
  UNITID :number;
  UnitName :string;
  // ItemNO:number;
  tot   :number;
  ExpDate  :string;
  Qty  :number;
  ColorId  :string;
  FarzId  :string;
  CostPrice  :number;
}