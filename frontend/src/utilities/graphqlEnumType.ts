interface EnumTypeStringInterface {
    // new (value: string): EnumTypeStringInterface;
    value: string;
}

export class EnumTypeString implements EnumTypeStringInterface {
    value: string;
    constructor(value: string) {
        const snakeToCamel = (s: string) =>
            s.replace(/(\-\w)/g, (m) => m[1].toUpperCase());
        this.value = snakeToCamel(value);
    }

    get() {
        return this.value;
    }
}
