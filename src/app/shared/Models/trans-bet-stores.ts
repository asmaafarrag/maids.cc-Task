export class TransBetStores {
    TBSID: number;
    TBSName: string;
    Val: number;
    TBSDate: string;
    TBSNotes: string;
    FStoreId: number;
    FStoreName: string;
    ToStoreId: number;
    ToStoreName: string;
    EmpId: number;
    TbsNo: string;
    ExpFromStock: string;
    IsLockGard: string;
    EntryUserId: number;
    EntryUserDate:string;
    transBetStoreDet : TransBetStoreDet[];
}

export class TransBetStoreDet {
    SerNo: number;
    TBSID: number;
    ItemId: number;
    ItemName: string;
    Price: number;
    Qty: number;
    AvailableQty: number;
    UnitId: number;
    UnitName: string;
    Tot: number;
}