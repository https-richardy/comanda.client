import { HttpInterceptor } from "@angular/common/http";
import { InjectionToken } from "@angular/core";

export const API_BASE_URL = new InjectionToken<string>("API_BASE_URL");
export const HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor>("HTTP_INTERCEPTORS")