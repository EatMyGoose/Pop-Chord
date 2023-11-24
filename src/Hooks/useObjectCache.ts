import React from "react";

type TObject = {[key:string]:any};

function ShallowEquals(obj1: TObject, obj2: TObject)
{
    if(Object.keys(obj1).length != Object.keys(obj2).length) return false;

    return Object.entries(obj1).every(([k1, value1]) => obj2[k1] === value1);
}

//To avoid unnecessary re-renders from context updates 
//that do not change the values of the context but 
//cause a new object to be allocated for the context
export function useObjectCache<T extends TObject>(next: T)
{
    const previous = React.useRef<T | undefined>(undefined);

    if(previous.current === undefined)
    {
        previous.current = next;
        return previous.current;
    }
    else
    {
        //Shallow compare
        //Return old object if possible
        if(!ShallowEquals(previous.current, next)) 
        {
            previous.current = next;
        }
        
        return previous.current;
    }
}