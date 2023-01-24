export class SellingCreditNotes {
    SellingCreditNoteId:number;
    SellingCreditNoteDate:string;

    CustomerID:number;
    CustomerName:string;
    SellingId:number;
    SellingNo:string;
    SellingCreditNoteTotalItemsAmount:number;
    SellingCreditNoteTotalItemsDiscount:number;
    SellingCreditNoteTotalAmount:number;
    SellingCreditNoteNetAmount:number;
    SellingCreditNoteTotalTax:number;
    SellingCreditNoteNotes:string;
    BranchId:number;
    EnterpriseId:number;
    SellingCreditNoteDets:SellingCreditNoteDet[];
}


export class SellingCreditNoteDet {

    SellingCreditNoteID:number;
    SerNo:number;
    ItemId:number;
    ItemNO:string;
    ItemName:string;
    Qty:number;
    Price : number;
    DISC: number;  
    DiscRatio: number;  
    UnitId: number;
    UnitName:string;
    Tot: number;
    TotWithTax: number;
    PricWithTax: number;
            DetTaxSal: number;   
            ItemSaleTaxRatio:number;
    ItmSaleTax:number;
}