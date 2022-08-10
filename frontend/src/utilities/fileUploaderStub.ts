export default function graphqlFetchOptions(operation: string, files: Blob[]) {
    const fetchOptions = {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: null as unknown as FormData,
        // processData: false,
        // contentType: false,
    };

    // const operationJSON = JSON.stringify(operation);

    if (files.length) {
        // See the GraphQL multipart request spec:
        // https://github.com/jaydenseric/graphql-multipart-request-spec

        const form = new FormData();

        form.append('operations', operation);

        const map = {} as { [key: number]: {} };
        let i = -1;
        files.forEach((paths) => {
            map[(i += 1)] = [
                `variables.file${files.length > 1 ? `.${i}` : ''}`,
            ];
        });
        form.append('map', JSON.stringify(map));

        i = -1;
        files.forEach((data, file) => {
            form.append(`${(i += 1)}`, data, `${file}`);
        });

        fetchOptions.body = form;
    } else {
        // fetchOptions.headers['Content-Type'] = 'application/json';
        // fetchOptions.body = operationJSON;
    }

    return fetchOptions;
}
