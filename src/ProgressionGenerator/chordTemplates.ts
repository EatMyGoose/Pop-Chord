import { IChordDefinition, make_chord } from "./types";

export const chordTemplates: [string, IChordDefinition[]][] = [
    ["I-IV-V", 
        [make_chord("I"), make_chord("IV"), make_chord("V")]
    ],

    ["I-V-vi-IV", 
        [make_chord("I"), make_chord("V"), make_chord("VI", "m"), make_chord("IV")]
    ],

    ["vi-IV-I-V", 
        [make_chord("VI", "m"), make_chord("IV"), make_chord("I"), make_chord("V")]
    ],

    ["ii-V-I", 
        [make_chord("II", "m"), make_chord("V"), make_chord("I")]
    ],

    ["vi-ii-V-I", 
        [make_chord("VI", "m"), make_chord("II", "m"), make_chord("V"), make_chord("I")]
    ],

    ["Pachebel's Progression", 
        [make_chord("I"), make_chord("V"), make_chord("VI", "m"), make_chord("III", "m"), make_chord("IV"), make_chord("I"), make_chord("IV"), make_chord("V")]
    ],

    ["Doo-Wop (I-vi-IV-V)", 
        [make_chord("I"), make_chord("VI", "m"), make_chord("IV"), make_chord("V")]
    ],

    ["Doo-Wop 2 (I-vi-ii-V)", 
        [make_chord("I"), make_chord("VI", "m"), make_chord("II", "m"), make_chord("V")]
    ],

    ["I III IV iv", 
        [make_chord("I"), make_chord("III"), make_chord("IV"), make_chord("IV", "m")]
    ],

    ["Andalusian Cadence", 
        [make_chord("IV", "m"), make_chord("III"), make_chord("II","",true), make_chord("I")]
    ],

    ["Eight Bar Blues", 
        [make_chord("I"), make_chord("V"), make_chord("IV"), make_chord("IV"), make_chord("I"), make_chord("V"), make_chord("I"), make_chord("V")]
    ],

    ["Passamezzo Moderno", 
        [make_chord("I"), make_chord("IV"), make_chord("I"), make_chord("V"), make_chord("I"), make_chord("IV"), make_chord("I"), make_chord("V"), make_chord("I")]
    ],

    ["I IV ♭VII IV",
        [make_chord("I"), make_chord("IV"), make_chord("VII", "", true), make_chord("IV")]
    ],

    ["ii ♭II7 I",
        [make_chord("II", "m"), make_chord("II", "7", true), make_chord("I")]
    ],

    ["Backdoor Progression",
        [make_chord("II","m"), make_chord("VII", "7", true), make_chord("I")]
    ],

    ["Chromatic Descending 5-6",
        [make_chord("I"), make_chord("V"), make_chord("VII", "", true), make_chord("IV")]
    ],

    ["Ragtime Progression",
        [make_chord("III", "7"), make_chord("VI", "7"), make_chord("II", "7"), make_chord("V", "7")]
    ],

    ["Royal Road Progression",
        [make_chord("IV", "maj7"), make_chord("V", "7"), make_chord("III", "m7"), make_chord("VI", "m")]
    ],

    ["Rhythm Changes",
        [
            make_chord("I", "maj7"), 
            make_chord("VI", "m7"), 
            make_chord("II", "m7"), 
            make_chord("V", "7"),
            make_chord("III", "m7"),
            make_chord("VI", "7"),
            make_chord("II", "m7"),
            make_chord("V", "7")
        ]

    ],

];

export const allChordTemplateNames: string[] = chordTemplates.map(nameAndProgression => nameAndProgression[0]);
