import { ObjectId } from "mongodb";
import { Role } from "../../models";

export const Roles: Role[] = [
	{
		_id: new ObjectId(),
		name: "Super Admin", 
		permissions: {
			dashboard: {
				view: true
			}
		}
	},
	{
		_id: new ObjectId(),
		name: "Admin",
		permissions: {
			dashboard: {
				view: true
			}
		}
	},
	{
		_id: new ObjectId(),
		name: "User",
		permissions: {
			dashboard: {
				view: true
			},
			campaign: {
				view: true,
				create: true,
			}
		}
	},
	{
		_id: new ObjectId(),
		name: "Paid User",
		permissions: {
			dashboard: {
				view: true
			}
		}
	},
]