declare type SelectionType = "selection" | "clipboard";
export declare function getString(type?: SelectionType): Promise<string | undefined>;
export declare function setString(text: string, type?: SelectionType): void;
export {};
