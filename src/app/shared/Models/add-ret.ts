export class AddRet {
    AddRetID: number;
    AddRetName: string;
    AddRetVal: number;
    AddRetDate: string;
    AddRetNotes: string;
    ExpFromStock: string;
    CCId: number;
    CCName: string;
    AddRetType: string;
    AddRetNo: string;
    StoreId: number;
    StoreName: string;
    EntryUserId: number;
    EntryUserDate:string;
    addRetDets : AddRetDet[];
}

export class AddRetDet {
    SerNo: number;
    AddRetID: number;
    ItemId: number;
    ItemName: string;
    AvailableQty:number;
    Qty: number;
    Price: number;
    DISC: number;
    UnitId: number;
    UnitName: string;
    Tot: number;
    CostPrice: number;
}
