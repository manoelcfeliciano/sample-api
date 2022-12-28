import { User } from '~/domain/entities/users/user';

export type PaymentConfirmPurchase = {
	confirm(params: PaymentConfirmPurchase.Params): Promise<void>;
};

export namespace PaymentConfirmPurchase {
	export interface Params {
		payment: Payment;
		user: User;
	}

	export interface Payment {
		readonly price: number;
		readonly currency: string;
	}

	export interface Coupon {
		name: string;
		discount: number;
	}

	export interface Campaign {
		id: string;
		name: string;
	}
}
