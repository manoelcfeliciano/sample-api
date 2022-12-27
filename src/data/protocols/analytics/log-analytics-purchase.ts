import { LogAnalytics } from '~/domain/use-cases/analytics/log-analytics';

export type LogAnalyticsPurchase = LogAnalytics<LogAnalyticsPurchase.Body>;

export namespace LogAnalyticsPurchase {
	export interface Body {
		readonly payment: Payment;
	}

	export interface Payment {
		readonly price: number;
		readonly currency: string;
		readonly tax: number;
	}

	export type Params = LogAnalytics.Params<Body>;
}
