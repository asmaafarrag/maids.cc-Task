export class SellingAdds {
    SellingAddId:number;
    SellingAddName:string;
    SellingAddNo:string;
    SellingAddVal:number;
    SellingAddDate:string;
    // SellingAddPost:string;
    SellingAddNotes:string;
    SellingAddType:string;
    CustomerID:number;
    CustomerName: string;

    SellingAddDisc:number;
    SellingAddDiscRatio:number;
    SellingAddTot:number;
    StoreId:number;
    StoreName: string;

    AgentId: number;
    TaxGainCom:number;
    TaxGainComRatio:number;
    SaleTax:number;
    SaleTaxRatio:number;
    TotWithoutTax:number;

    CurrId:string;
    CurrName :string;
    CurrVal:number;
    CurrRate:number;
    EnterpriseId:number;
    EntryUserId: number;
    uuid:string;
    longId:string;
    BranchId:number;
    BranchName:string;
    TreasuryId:number;

    DiscV:number;
    DiscValueExt:number;
    DiscRatioExt:number;
    FreeOfSalesTax:boolean;
    HasTaxGainCom:boolean;
    RefSellingId :number;   
    SellingAddDets:SellingAddDets[];
   
}


export class SellingAddDets {
    SerNo: number;
    SellingAddID: number;
    ItemId: number;
    ItemNO: string;
    ItemName: string;
    Price: number;
    Qty: number;
    UnitId: number;
    UnitName: string;
    tot: number;
    // CompanyName: string;
    DISC:number;
    DiscV:number;
    DiscRatio:number;


    ItemSaleTaxRatio:number;
    ItmSaleTax:number;
    // QtySaleTax:number;
    TotWithTax :number;
    PricWithTax :number;
    DetTaxSal :number;
    DetTaxGainCom:number;
    TaxGainComRatio:number;
    DetItemDescription:string;

    SellingAddDetTaxTypes:SellingAddDetTaxTypes[]

}


export class SellingAddDetTaxTypes{
    SellingAddDetTaxTypeId:number;
    SerNo:number;
    TaxTypeID:number;
    TaxTypeRate:number;
    TaxTypeAmount:number;
    TaxTypeName:string;
    TaxTypeCalcWayId :number;  

}