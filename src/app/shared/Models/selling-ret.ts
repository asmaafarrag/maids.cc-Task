export class SellingRet {
    SellingRetId: number;
    SellingRetName: string;
    SellingRetVal: number;
    SellingRetDate: string;
    SellingRetNotes: string;
    SellingRetType: string;
    CustomerID: number;
    TreasuryId:number;
    
    CustomerName: string;
    SellingRetDisc: number;
    SellingRetTot: number;
    StoreId: number;
    StoreName: string;
    SellingRetDiscRatio: number;
    isSelected:boolean;
    SellingRetNo: string;
    AgentId: number;
    EntryUserId: number;
           uuid:string;
    longId:string;
    EnterpriseId:number;
    BranchId:number;
    sellingRetDets: SellingRetDets[];
    TaxGainComRatio :number;
    TaxGainCom :number;
    SaleTaxRatio :number;
    SaleTax  :number;   
    DiscRatioExt:number;
    DiscValueExt:number;    
    CurrId :string;
    CurrName :string;
    CurrVal :number;
    CurrRate :number;     
    FreeOfSalesTax:boolean;  
    HasTaxGainCom:boolean;  
    RefSellingId :number;   
}

export class SellingRetDets {
    SerNo: number;
    SellingRetID: number;
    ItemId: number;
    ItemNO: string;
    ItemName: string;
    Price: number;
    Qty: number;
    UnitId: number;
    UnitName: string;
    tot: number;
    CompanyName: string;
    DISC:number;
    DiscV:number;
    DiscRatio:number;


    ItemSaleTaxRatio:number;
    ItmSaleTax:number;
    QtySaleTax:number;
    TotWithTax :number;
    PricWithTax :number;
    DetTaxSal :number;
    DetTaxGainCom:number;
    TaxGainComRatio:number;
    DetItemDescription:string;

    SellingRetDetTaxTypes:SellingRetDetTaxTypes[]

}


export class SellingRetDetTaxTypes{
    SellingRetDetTaxTypeId:number;
    SerNo:number;
    TaxTypeID:number;
    TaxTypeRate:number;
    TaxTypeAmount:number;
    TaxTypeCalcWayId :number;  

}

