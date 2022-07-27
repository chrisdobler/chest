import FetchQL, { FetchQLOptions } from 'fetchql';

interface TypeOptions {
    name: string;
    args: {
        key: string;
    };
    variables: Array<string>;
}

export interface GraphQLClassInterface {
    new (options: object): GraphQLClassInterface;
    useAuth(): null;
    addType(name: string, typeArgs: object, variables: string | string[]): null;
    types: Array<TypeOptions>;
    options: FetchQLOptions;
}

interface EnumTypeStringInterface {
    new (value: string): EnumTypeStringInterface;
    value: string;
}

export class EnumTypeString<EnumTypeStringInterface> {
    value: string;
    constructor(value: String) {
        const snakeToCamel = (s: String) =>
            s.replace(/(\-\w)/g, (m) => m[1].toUpperCase());
        this.value = snakeToCamel(value);
    }

    get() {
        return this.value;
    }
}

class GraphQLClass<GraphQLClassInterface> {
    types: Array<TypeOptions>;
    options: FetchQLOptions;
    mutations: TypeOptions[];

    constructor(options: { apiUrl?: String; urlTag?: String } = {}) {
        this.types = [];
        this.mutations = [];

        this.options = {
            ...options,
            // url: 'http://localhost:8080/graphql/query',
            url: `${options.apiUrl}`, // GraphQL server address
            interceptors: [],
            onStart(requestQueueLength) {}, // callback of a new request queue
            onEnd(requestQueueLength) {}, // callback of a request queue finished
            omitEmptyVariables: false, // remove null props(null or '') from the variables
        };
        if (options.urlTag)
            this.options.url = `${this.options.url}?${options.urlTag}`;
        this.execute = this.execute.bind(this);
        this.export = this.export.bind(this);
        this.getExecutionQuery = this.getExecutionQuery.bind(this);
    }

    async useAuth() {
        // const auth = await this.options.firebase.auth();
        // const token = await auth.currentUser.getIdToken(true);
        this.options = {
            ...this.options,
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
            //TODO: handling fetchQL error below
            interceptors: [
                {
                    response: function (response) {
                        return response;
                    },
                    responseError: function (error) {
                        console.log('response error:', error);
                        // return Promise.reject(error);
                    },
                },
            ],
        };
    }

    addMutation(options: TypeOptions) {
        if (!(options.name && options.variables)) return false;
        this.mutations = this.mutations.filter(
            (type) => type.name !== options.name
        );
        this.mutations = [...this.mutations, options];
    }

    addType(name: string, args: TypeOptions['args'], variables: Array<string>) {
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
            return JSON.stringify(value).replace(/\"([^(\")"]+)\":/g, '$1:');
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
        } catch (e) {
            return {
                message: 'Unable to trigger export',
                error: e,
            };
        }
    }

    getExecutionQuery(typeOptions: TypeOptions[] = this.types) {
        const query = `{${typeOptions.map(({ name, args, variables = '' }) => {
            if (!name) return '';
            let argString = '';
            const argKeys = Object.keys(args);
            if (argKeys.length > 0) {
                argKeys.forEach((key) => {
                    const value = this.typesParse(args[key]);
                    argString = `${argString}${
                        argString.length > 0 ? ', ' : ''
                    }${key}: ${value}`;
                });
                argString = `(${argString})`;
            }
            return `${name}${argString} {${variables}}`;
        })}}`;
        return query;
    }

    async mutate() {
        try {
            const mutation = `mutation${this.getExecutionQuery(
                this.mutations
            )}`;
            const fetch = new FetchQL(this.options);
            const response = await fetch.query({
                operationName: 'name',
                query: mutation,
                variables: {},
                opts: {
                    omitEmptyVariables: true,
                },
            });
            return response;
        } catch (e) {
            if (e == undefined) {
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
                operationName: 'name',
                query,
                variables: {},
                opts: {
                    omitEmptyVariables: true,
                },
            });
            return response;
        } catch (e: any) {
            if (e == undefined) {
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
        }
    }
}

export { GraphQLClass };
