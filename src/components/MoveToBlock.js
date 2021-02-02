/**
 * Магия перемещающая блок по клику
 *
 */
export function observe(receive){
    const randPos = () => Math.floor(Math.random() * 8)
    setInterval(() => receive([randPos(), randPos()]), 200)
}
