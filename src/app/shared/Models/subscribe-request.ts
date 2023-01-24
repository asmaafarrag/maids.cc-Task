export class SubscribeRequest {

    SubscribeRequestID :number;
    SubscribeRequestCode : string;
    SubscribeRequestDate :string;
    UserID :string;
    UserName :string;
    SubscribeServiceID  :number;
    SubscribeServiceName :string;
    SubscribeFromDate :string;
    SubscribePeriodID :number;
    SubscribePeriodName :string;
    MonthsCount :number;
    SubscribeToDate :string;
    MonthPrice :number;
    SubscribeTotalPrice  :number;
    DiscountPercent :number;
    DiscountValue :number;
    SubscribeNetPrice :number;
    IsPaid :boolean;
    PaymentDate :string;
    IsCanceled :boolean;
    CancelDate :string;
    CancelReason :string;
    AlarmDays :number;
}
