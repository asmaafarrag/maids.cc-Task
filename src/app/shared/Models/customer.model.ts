export class Customer {
    // CustomerID: number;
    // CustomerName: string;
    // AccountID: string;
    // Tele:string;
    // tele2: string;
    // mob1:string;
    // mob2:string;
    // fax: string;
    // Email: string;
    // address: string;
    // CustAccount: string;
    // MaxLimit: string;
    // OpenBalDebit: number;
    // OpenBalCredit: number;
    // StoreId:number;
    // StoreName:string;
    // BranchId:number;
    // RegistrationNumber : string;
    // CompanyTypeID :number
    //    CompanyTypeName :string;
    // CompanyTypeNameE :string;
    // EnterpriseId:number;
    // RegionCityTxt:string;

    // CountryID :number;
    // CountryName :string;
    // CountryNameE :string;
    // GovernateId :number; //المحافظة
    // GovernateName:string;
    // GovernateNameE:string;
    // GovernateTxt:string;
    // RegionCityId :number; //المدينة
    // RegionCityName:string;
    // RegionCityNameE:string;
    // street :string; // الشارع
    // buildingNumber:string; //رقم العمارة
    // postalCode: string; // المود البريدي
    // floor :string; //الطابق
    // room: string; // رقم الشقة
    // landmark : string; //معلم معروف
    // additionalInformation: string;
    // HasTaxGainCom:boolean;



    customer_ID:number;
    customer_Name:string;
    customer_Enabled:boolean;
    commercial_Record:string;
    contracting_Representative:string;
    customer_Phone :string;
    entryUser:string;
    entrydate:string;
}


export class CustomerExcelModel
{
    CustomerID:number;
    CustomerName :string;
    AccountID :string;
    Tele :string;
    tele2 :string;
    mob1 :string;
    mob2 :string;
    CustAccount :string;
    RegistrationNumber :string;
    CompanyTypeCode :string;
    CountryID :number;
    CountryCode :string;
    GovernateId :number;
    GovernateName :string;
    RegionCityId :number;
    RegionCityName :string;
    street :string;
    buildingNumber :string;
    postalCode :string;
    floor :string;
    room :string;
    landmark :string;
    additionalInformation :string;
}
