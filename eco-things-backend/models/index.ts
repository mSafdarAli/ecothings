import { ObjectId } from "mongodb";

export interface User {
	_id: ObjectId;
	name: string;
	email: string;
	password?: string;
	salt?: string;
	terms: boolean;
	roleId: ObjectId
	role?: Role
}
export interface Role {
	_id: ObjectId,
	name: string,
	permissions: { [key: string]: { [key: string]: boolean } }
}

export interface Country {
	_id?: ObjectId,
	name: string,
	iso3: string,
	iso2: string,
	phone_code: string,
	capital: string,
	currency: string,
	currency_symbol: string,
	tld: string,
	native: string,
	region: string,
	subregion: string,
	timezones: {
		zoneName: string,
		gmtOffset: number,
		gmtOffsetName: string,
		abbreviation: string,
		tzName: string
	}[],
	latitude: number,
	longitude: number,
	emoji: string,
	emojiU: string
}

// export interface Campaign {
// 	name: string,
// 	brandname: string,
// 	website: string,
// 	spotSkip: number, // Percentage
// 	emailTemplate: string
// 	cover_image?: string,
// 	description?: string,
// 	shareplateform: string,
// 	sharemessage: string
// 	welcomMessage: string
// 	selectedEmailId: ObjectId
// }
export interface Campaign {
	name: string,
	brandName: string,
	doubleVerification: boolean,
	leaderBoard: boolean,
	offerDetails: string,
	offerHeading: string,
	shareMessage: string,
	skip: number,
	socialMedia: string[],
	useDomainEmail: string,
	website: string,
	welcomeMessage: string
}


export interface Subscriber {
	_id: ObjectId,
	name: string,
	email: string,
	referredby_id: ObjectId,
	position: number
	campaign_id: ObjectId
	campaign?: Campaign
}