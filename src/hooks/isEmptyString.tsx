//проверка строки на пустоту, null или undefined
export const isBlank = (str: string) => {
    return (!str || /^\s*$/.test(str));
}