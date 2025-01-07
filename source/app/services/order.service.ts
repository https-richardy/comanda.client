import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_BASE_URL } from "../app.tokens";
import { FetchOrdersRequest } from "../payloads/requests/order-payloads/fetch-orders.payload";
import { map, Observable } from "rxjs";
import { FormattedOrder } from "../payloads/responses/order-payloads/formatted-order.payload";
import { Response } from "../payloads/responses/response";
import { Pagination } from "../payloads/responses/pagination";

@Injectable({ providedIn: "root" })
export class OrderService {
    private readonly httpClient: HttpClient;
    private readonly baseAddress = `${inject(API_BASE_URL)}api/orders`;

    public constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getOrders(parameters: FetchOrdersRequest): Observable<Array<FormattedOrder>>
    {
        var queryParameters = new HttpParams();

        if (parameters.pageNumber) {
            queryParameters = queryParameters.set("pageNumber", parameters.pageNumber.toString());
        }

        if (parameters.pageSize) {
            queryParameters = queryParameters.set("pageSize", parameters.pageSize.toString());
        }

        if (parameters.status) {
            queryParameters = queryParameters.set("status", parameters.status.toString());
        }

        return this.httpClient.get<Response<Pagination<FormattedOrder>>>(this.baseAddress, { params: queryParameters })
            .pipe(
                map((response) => {
                    if (response.data) {
                        return response.data.results;
                    }

                    return [ ]
                })
            )
    }
}