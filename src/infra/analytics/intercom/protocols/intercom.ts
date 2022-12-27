import { Metadata } from 'intercom-client';
import { User } from '~/domain/entities/users/user';

export interface IntercomAnalytics {
	report(name: string, params: IntercomAnalytics.Params): Promise<void>;
}

export namespace IntercomAnalytics {
	export interface Params {
		user: User;
		metadata: Metadata;
	}
}
