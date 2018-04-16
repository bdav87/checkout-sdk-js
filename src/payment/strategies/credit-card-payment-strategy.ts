import { CheckoutSelectors, CheckoutStore } from '../../checkout';
import { InvalidArgumentError } from '../../common/error/errors';
import { OrderActionCreator, OrderRequestBody, PlaceOrderService } from '../../order';
import PaymentActionCreator from '../payment-action-creator';

import PaymentStrategy from './payment-strategy';

export default class CreditCardPaymentStrategy extends PaymentStrategy {
    constructor(
        store: CheckoutStore,
        placeOrderService: PlaceOrderService,
        private _orderActionCreator: OrderActionCreator,
        private _paymentActionCreator: PaymentActionCreator
    ) {
        super(store, placeOrderService);
    }

    execute(payload: OrderRequestBody, options?: any): Promise<CheckoutSelectors> {
        const { payment, ...order } = payload;

        if (!payment) {
            throw new InvalidArgumentError();
        }

        return this._store.dispatch(this._orderActionCreator.submitOrder(order, true, options))
            .then(() =>
                this._store.dispatch(this._paymentActionCreator.submitPayment(payment))
            );
    }
}
