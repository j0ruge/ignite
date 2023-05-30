// ?search=Onírico
// search=Onírico?page=2
// ['search=Onírico', 'page=2' ]

// ['serach', 'Onírico']
// [ 'page', '2']

export function extractQueryParams(query) {
    return query.substr(1).split('&').reduce((queryParams, param) => {
        const [key, value] = param.split('=');
        queryParams[key] = value;
        return queryParams;
    }, {});
}