export const regex = {
	case: {
		camel: /^[a-z]+(?:[A-Z][a-z0-9]*)*$/,
		kebab: /^[a-z]+(-[a-z]+)*$/,
		pascal: /^[A-Z][a-z0-9]*(?:[A-Z][a-z0-9]*)*$/,
		snake: /^[a-z]+(_[a-z]+)*$/,
	},
	password: {
		digit: /^(?=.*\d).+$/,
		lowercase: /.*[a-z].*/,
		minLength: /^.{8,}$/,
		specialSymbol: /^(?=.*[!@#$%^&*()<>?/\\\[\]\{\}]).*$/,
		uppercase: /^(?=.*[A-Z]).*$/,
	},
}
