export class Add {
    AddID: number;
    AddName: string;
    AddVal: number;
    AddDate: string;
    AddNotes: string;
    ExpFromStock: string;
    CCID: number;
    CCName: string;
    AddNo: string;
    StoreId: number;
    StoreName: string;
    AddType: string;
    EntryUserId: number;
    EntryUserDate:string;
    addDets : AddDet[];
}

export class AddDet {
    SerNo: number;
    AddID: number;
    ItemId: number;
    ItemName: string;
    Qty: number;
    Price: number;
    DISC: number;
    UnitID: number;
    UnitName: string;
    Tot: number;
    CostPrice: number;
}
