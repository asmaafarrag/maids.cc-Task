export class CreateEGSCodeUsageDTO {
  
    codeType:string;  //Code Type
    parentCode :string; 
    itemCode :string; 
    codeName :string; //Code Name
    codeNameAr:string;  //Code Name (AR)
    activeFrom:string;  //Active from
    activeTo:string;  //Active to
    description :string; //Description
    descriptionAr:string;  //Description (AR)
    requestReason:string;  
    linkedCode:string;  //GPC Item linked
    
}
