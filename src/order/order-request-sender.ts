import { RequestSender, Response } from '@bigcommerce/request-sender';

import { RequestOptions } from '../common/http-request';

import InternalOrderRequestBody from './internal-order-request-body';
import { InternalOrderResponseBody } from './internal-order-responses';

export default class OrderRequestSender {
    constructor(
        private _requestSender: RequestSender
    ) {}

    loadOrder(orderId: number, { timeout }: RequestOptions = {}): Promise<Response<InternalOrderResponseBody>> {
        const url = `/internalapi/v1/checkout/order/${orderId}`;

        return this._requestSender.get(url, { timeout });
    }

    submitOrder(body: InternalOrderRequestBody, { timeout }: RequestOptions = {}): Promise<Response<InternalOrderResponseBody>> {
        const url = '/internalapi/v1/checkout/order';

        return this._requestSender.post(url, { body, timeout });
    }

    finalizeOrder(orderId: number, { timeout }: RequestOptions = {}): Promise<Response<InternalOrderResponseBody>> {
        const url = `/internalapi/v1/checkout/order/${orderId}`;

        return this._requestSender.post(url, { timeout });
    }
}