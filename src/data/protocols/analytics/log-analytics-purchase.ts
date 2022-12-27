import { LogAnalytics } from '~/domain/use-cases/analytics/log-analytics';

export type LogAnalyticsPurchase = LogAnalytics<LogAnalyticsPurchase.Body>;

export namespace LogAnalyticsPurchase {
	export interface Body {
		readonly payment: Payment;
		readonly campaign: Campaign | null;
	}

	export interface Payment {
		readonly price: number;
		readonly coupon: Coupon | null;
		readonly currency: string;
		readonly tax: number;
	}

	export interface Coupon {
		readonly name: string;
		readonly discount: number;
	}

	export interface Campaign {
		readonly id: string;
		readonly name: string;
	}

	export type Params = LogAnalytics.Params<Body>;
}
