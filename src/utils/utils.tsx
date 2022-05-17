
export const sortAscending = (data: []) => data.sort((a:any,b:any) => 0 - (a.name > b.name ? -1 : 1));
export const sortDescending = (data: []) => data.sort((a:any,b:any) => 0 - (a.name > b.name ? 1 : -1));