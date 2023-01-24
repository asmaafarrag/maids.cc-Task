export class Purchasing {
    PurchasingID: number;
    PurchasingName: string;
    PurchasingVal: number;
    PurchasingDate: string;
    PurchasingNotes: string;
    SupplierId: number;
    SupplierName: string;
    PurchasingType: string;
    InP: string;
    PurchasingNo: string;
    SaleTax: number;
    PurchasingNet: number;
    PurchasingDisc: number;
    TaxGainCom: number;
    PurchasingDiscRatio: number;
    PurchasingTot: number;
    StoreId: number;
    StoreName: string;
    TreasuryId: number;
    TreasuryName: string;
    DeliverOrderNo: string;
    BranchId: number;
    EntryUserId: number;
    EntryUserDate:string;
    CustomerID:number;
    ExchangeRate:number;
    purchasingDets: PurchasingDet[];
}



export class PurchasingDet {
    SerNo: number;
    PurchasingID: number;
    ItemId: number;
    ItemName: string;
    Qty: number;
    Price: number;
    DISC: number;
    UnitID: number;
    UnitName: string;
    Tot: number;
    ItmDiscVal: number;
    ActPrice: number;
    DollarPrice: number;
    SellingPrice: number;
}
