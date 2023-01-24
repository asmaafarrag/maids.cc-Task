import { Company } from "./company";
import { Delivery } from "./delivery";
import { InvoiceLine } from "./invoice-line";
import { Payment } from "./payment";
import { TaxTypeAmount } from "./tax-type-amount";

export class DocumentInvoice {
    issuer: Company;
    receiver: Company;

    documentType: string; // "I",
    documentTypeVersion: string; // "0.9",
    dateTimeIssued: Date; // "2020-10-27T23:59:59Z",
    taxpayerActivityCode: string;  //"4620",
    internalID: string; // "IID1",
    purchaseOrderReference: string; //"P-233-A6375",
    purchaseOrderDescription: string; // "purchase Order description",
    salesOrderReference: string; // "1231",
    salesOrderDescription: string; // "Sales Order description",
    proformaInvoiceNumber: string; // "SomeValue",

    payment: Payment;
    delivery: Delivery;

    invoiceLines: InvoiceLine[];

    totalDiscountAmount: number; // 76.29,
    totalSalesAmount: number; // 1609.90,
    netAmount: number; // 1533.61,

    taxTotals: TaxTypeAmount;
    totalAmount: number; // 5191.50,
    extraDiscountAmount: number; // 5.00,
    totalItemsDiscountAmount: number;
}
