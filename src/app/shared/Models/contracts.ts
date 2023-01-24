export class Contracts {
  contract_ID:number;
  contract_Code:number;
  contract_Date:string;
  contract_Hijri:string;
  priceList_ID:number;
  priceList_Date:string;
  priceList_Customer:string;
  customer_ID:number;
  customer_Name:string;
  ContractJobOrders:GetContractJobOrdersViewModel[];
  ContractPayments: GetContractPaymentsViewModel[];
  entryUser  :string;
  entrydate  :string;
}


export class GetContractJobOrdersViewModel{
  contractJobOrder_ID:number;
  jobOrder_Code:string;
  jobOrder_Date:string;
  jobOrder_Description:string;
  jobOrder_Notes:string;
  contract_ID:number;
  contract_Code:number;
  customer_Name:string;

}


export class GetContractPaymentsViewModel{
  contractPayment_ID:number;
  contractPayment_Date:string;
  contractPayment_Value:number;
  contract_ID:number;
  contract_Code:number;
  customer_Name:string;

}
