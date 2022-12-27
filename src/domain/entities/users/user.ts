export interface User {
	/**
	 * The user's ID
	 *
	 * [unique]
	 */
	readonly id: number;

	/**
	 * User's name
	 */
	readonly name: string;

	/**
	 * User's email
	 *
	 * [unique]
	 */
	readonly email: string;
}
