export class SalesSaleInv {
    SellingId : number;
    SellingName : string;
             SellingVal : number;
    SellingDate : string;
    SellingNotes : string;
    SellingType : string;
    CustomerID : number;
    CustomerName : string;
    PaidVal: number;
    RemainVal: number;

              SellingDiscRatio: number;
              SellingDisc: number;
                     SellingTot: number;
                     TaxGainCom:number;
                     TaxGainComRatio:number;
      
    SellType: string;
    StoreId : number;
    StoreName: string;
    SellingNo : string;
    TreasuryId: number;
    AgentId : number;
    EntryUserId : number;
    EntryUserDate:string;
    saleInvItems : SalesSaleInvDet[];
    // isSelected : boolean;
         uuid : string;
    longId : string;
    BranchId : number;
    BranchName : string;
    DiscValueExt:number;
    DiscRatioExt:number;
    SaleTaxRatio:number;
                      SaleTax:number;


    TotWithoutTax:number;
}

export class SalesSaleInvDet {
    SerNo:number;
    SellingId : number;
    ItemId: number;
    ItemNO: string;
    ItemName: string;
    Price: number;
    AvailableQty: number;
    Qty: number;
    UnitId : number;
    UnitName: string;
    Tot: number;
    DISC:number;
    DiscV:number;
    CompanyName: string;

                 ItemSaleTaxRatio:number;
    ItmSaleTax:number;
    QtySaleTax:number;

    TotWithTax :number;
    PricWithTax :number;
                DetTaxSal :number;
    DiscRatio :number;
    DetTaxGainCom:number;
    TaxGainComRatio:number;

    SellingDetTaxTypes:SellingDetTaxTypes[]
 
}


export class SellingDetTaxTypes{
    SellingDetTaxTypeId:number;
    SerNo:number;
    TaxTypeID:number;
    TaxTypeRate:number;
    TaxTypeAmount:number;
    TaxTypeCalcWayId :number;  
}


