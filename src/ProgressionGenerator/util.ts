
export function PickRandom<T>(arr:T[]): T
{
    const index: number = Math.floor(arr.length * Math.random());
    return arr[index];
}