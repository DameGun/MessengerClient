type HTTPArguments = {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: object,
    headers?: object
}

export type {
    HTTPArguments
}