export interface route {
	path: string;
	method: string;
	function: Function;
	uploader?: Function;
	private: Boolean;
	permission?: string;
	perm_component?: string;
	filter?: boolean;
	search?: string[];
}