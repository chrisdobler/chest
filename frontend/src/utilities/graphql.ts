import FetchQL, { FetchQLOptions } from 'fetchql';

interface TypeOptions {
    name: string;
    args?: {};
    variables: Array<string> | string;
}

export interface GraphQLClassInterface {
    // new (options: object): GraphQLClassInterface;
    useAuth(): boolean;
    addType(name: string, args: object, variables: string | string[]): boolean;
    types: Array<TypeOptions>;
    options: FetchQLOptions;
}
class GraphQLClass implements GraphQLClassInterface {
    types: Array<TypeOptions>;

    options: FetchQLOptions;

    mutations: TypeOptions[];

    constructor(options: { apiUrl?: string; urlTag?: string } = {}) {
        this.types = [];
        this.mutations = [];

        this.options = {
            ...options,
            // url: 'http://localhost:8080/graphql/query',
            url: `${options.apiUrl}`, // GraphQL server address
            interceptors: [],
            omitEmptyVariables: false, // remove null props(null or '') from the variables
        };
        if (options.urlTag)
            this.options.url = `${this.options.url}?${options.urlTag}`;
        this.execute = this.execute.bind(this);
        this.export = this.export.bind(this);
        this.getExecutionQuery = this.getExecutionQuery.bind(this);
    }

    useAuth() {
        // const auth = await this.options.firebase.auth();
        // const token = await auth.currentUser.getIdToken(true);
        this.options = {
            ...this.options,
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
            // TODO: handling fetchQL error below
            interceptors: [
                {
                    response: (response) => response,
                    responseError: (error) => error,
                },
            ],
        };
        return true;
    }

    addMutation(options: TypeOptions) {
        if (!(options.name && options.variables)) return false;
        this.mutations = this.mutations.filter(
            (type) => type.name !== options.name
        );
        this.mutations = [...this.mutations, options];
        return this.mutations;
    }

    addType(
        name: string,
        args: TypeOptions['args'],
        variables?: string | string[]
    ) {
        if (!name || !variables) return false;
        this.types = this.types.filter((type) => type.name !== name);
        this.types = [
            ...this.types,
            {
                name,
                args,
                variables,
            },
        ];
        return true;
    }

    typesParse(value: String | {} | null) {
        if (Array.isArray(value)) {
            let arrayStr = '[';
            value.forEach((item, index) => {
                arrayStr = `${arrayStr}${this.typesParse(item)}`;
                if (index < value.length - 1) arrayStr = `${arrayStr}, `;
            });
            arrayStr = `${arrayStr}]`;
            return arrayStr;
        }
        if (typeof value === 'string') return `"${value}"`;
        if (value === null) return `null`;
        if (typeof value === 'object') {
            // if (typeof value.get === 'function') return value.get();
            return JSON.stringify(value).replace(/"([^(")"]+)":/g, '$1:');
        }

        return value;
    }

    export(options: { url: String }) {
        try {
            const query = this.getExecutionQuery();
            const uri = `${options.url}?query=${query}`;
            const a = document.createElement('a');
            a.href = uri;
            a.setAttribute('target', '_blank');
            a.click();
            return true;
        } catch (e) {
            return {
                message: 'Unable to trigger export',
                error: e,
            };
        }
    }

    getExecutionQuery(typeOptions = this.types) {
        const query = `{${typeOptions.map(({ name, args, variables = '' }) => {
            if (!name) return '';
            let argString = '';
            if (args) {
                const argKeys = Object.keys(args);
                if (argKeys.length > 0) {
                    argKeys.forEach((key) => {
                        const value = this.typesParse(
                            args[key as keyof TypeOptions['args']]
                        );
                        argString = `${argString}${
                            argString.length > 0 ? ', ' : ''
                        }${key}: ${value}`;
                    });
                    argString = `(${argString})`;
                }
            }
            return `${name}${argString} {${variables}}`;
        })}}`;
        return query;
    }

    async mutate(name: string) {
        try {
            let args = '';
            this.mutations.forEach((mutation) => {
                if (mutation.variables.length > 0) {
                    args = `${args}${args.length > 0 ? ',' : ''}${
                        mutation.name
                    }:"${mutation.variables}"`;
                }
            });
            const mutation = `mutation{${name}(${args}) ${this.getExecutionQuery()}
            }`;
            const fetch = new FetchQL(this.options);
            const response = await fetch.query({
                operationName: '',
                query: mutation,
                variables: {},
                opts: {
                    omitEmptyVariables: true,
                },
            });
            return response;
        } catch (e) {
            if (e === undefined) {
                console.error(
                    'fetchQL error: if data in response is "null" or if all properties of data is "null"'
                );
            } else {
                console.error('graphql error: ', e);
            }
            return { errors: e || [] };
        }
    }

    async execute() {
        let response = null;
        try {
            const query = this.getExecutionQuery();
            const fetch = new FetchQL(this.options);
            response = await fetch.query({
                operationName: '',
                query,
                variables: {},
                opts: {
                    omitEmptyVariables: true,
                },
            });
            return response;
        } catch (e: any) {
            if (e === undefined) {
                console.error(
                    'fetchQL error: if data in response is "null" or if all properties of data is "null"'
                );
            }
            // fetching library fails on 400 range errors.
            else if (e[0] && e[0].stack && e[0].stack.status === 403) {
                return e[0].stack;
            } else {
                console.error('graphql error: ', e);
            }
            return e;
        }
    }
}

export { GraphQLClass };
