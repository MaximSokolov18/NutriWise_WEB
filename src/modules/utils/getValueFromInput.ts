export function getValueFromInput<T>(value: FormDataEntryValue | null): T | undefined {
    if (!value) {
        return;
    }

    const numberValue = Number(value);
    if (isNaN(numberValue)) {
        return value as T;
    }
    return numberValue as T;
}
