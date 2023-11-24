export function linspace_interval(
    start:number, 
    end:number, 
    nInnerSegments:number): number
{
    const interval: number = (end - start) / (nInnerSegments + 1);
    return interval;
}

export function linspace(
    start:number, 
    end:number, 
    nInnerSegments:number) : number[]
{

    const interval: number = linspace_interval(start, end , nInnerSegments);

    const splits: number[] = [];

    for(let i = 0; i < (nInnerSegments + 2); i++)
    {
        splits.push(start + (interval * i));
    }

    return splits;
}