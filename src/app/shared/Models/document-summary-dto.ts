export class DocumentSummaryDTO {

    publicUrl:string;
        uuid : string; //all
        submissionUUID : string; //all
    longId : string;
    internalId : string;
        typeName : string;//all
        typeVersionName : string;//all
    issuerId : string;
        issuerName : string; //all
    receiverId : string;
         receiverName : string;//all
    dateTimeIssued :string;
    dateTimeReceived :string;
    totalSales :number;
    totalDiscount :number;
    netAmount :number;
       total :number;//all
        status :string;//all
    cancelRequestDate :string;
    rejectRequestDate :string;
    cancelRequestDelayedDate :string;
    rejectRequestDelayedDate :string;
    declineCancelRequestDate :string;
    declineRejectRequestDate :string;
}
