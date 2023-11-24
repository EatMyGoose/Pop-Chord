
//Which finger should be used on which string
export type TFinger = 1 | 2 | 3 | 4;
export type TString = number; //+ve string index (0 = leftmost string)

//-1 = unfretted
export type TFret = number; 

export type TStringFingering = [TString, TFret, TFinger];


export interface ChordFingering
{
    //left to right on a right-handed instrument
    //i.e. index 0 = Low E on a Guitar or G on a concert Ukulele
    fingering:TStringFingering[] 
}