export class SellingDebitNotes {

    SellingDebitNoteId:number;
    SellingDebitNoteDate:string;
    CustomerID:number;
    CustomerName : string;
    SellingNo:string;
    SellingId:number;
    SellingDebitNoteTotalItemsAmount:number;
    SellingDebitNoteTotalItemsDiscount:number;
    SellingDebitNoteTotalAmount:number;
    SellingDebitNoteNetAmount:number;
    SellingDebitNoteTotalTax:number;
    SellingDebitNoteNotes:string;
    BranchId:number;
      EnterpriseId:number;
    SellingDebitNoteDets :SellingDebitNoteDet[];
}

export class SellingDebitNoteDet{
    SellingDebitNoteID:number;
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
