import { characters } from "./characters";

export const storyP1= [
    {
        type: "narration",
        text: "The prison walls quivered as the new prisoner approached",
        bkgdImage: require("../BackgroundImages/prison.png")

    },
    {
        type: "narration",
        text: "They sensed something in the air...",
        bkgdImage: require("../BackgroundImages/prison.png")

    },
    {
        type: "narration",
        text: "A dangerous foe would soon call the prison home. But not for long",
        bkgdImage: require("../BackgroundImages/background.jpeg")

    },
    {
        type: "narration",
        text: "This is the legend of SPOONFINGERS",
        bkgdImage: require("../BackgroundImages/background.jpeg")

    },
    {
        type: "dialogue",
        text: "Maybe I shouldn't have done that",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")

    },
    {
        type: "dialogue",
        text: "I can't believe I got caught...",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")

    },
    {
        type: "dialogue",
        text: "I mean it wasn't even my gun!",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")

    },
    // {
    //     type: "dialogue",
    //     text: "...or my children",
    //     character: characters.get("Sah"),
    //     bkgdImage: require("../BackgroundImages/background.jpeg")

    // },
    {
        type: "dialogue",
        text: "There is no way we can stay in here with these losers.",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")

    },
    {
        type: "dialogue",
        text: "Come on boys, let’s get outta here.",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")

    },
    {
        type: "dialogue",
        text: "yeah yeah",
        character: characters.get("prisoner1"),
        bkgdImage: require("../BackgroundImages/background.jpeg")

    },
    {
        type: "dialogue",
        text: "I bet I can pick this lock. This looks just like a game I know!",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")

    },
];



export const storyP2 = [
    {  
        type: "narration",
        text: "Sah and his prison inmates successfully picked the lock and escaped into the cafeteria.",
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "I’m so glad they decided to model the lock after a popular word-puzzle game from late 2021.",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "But we’re not out of the woods yet boys! We need something to defend ourselves.",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "Start looking for weapons!",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "narration",
        text: "They rummage around the kitchen looking for useful items.",
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "Knife? useless",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "Scissors? Ugh this won’t do.",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "Cheese grater? I aint no rat.",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "*GASP* I have an idea!",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "They’ll never see us coming with these SPOONS.",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "Hey put those spoons away or we’re gonna have to FORK you.",
        character: characters.get("guard"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "Don’t you mean fight?",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "Did I stutter?",
        character: characters.get("guard"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
]

export const storyP3 = [
    {
        type: "narration",
        text: "Sah and his friends somehow defeat the prison guards and bolt for the exit carrying nothing but their spoons and a hope for freedom.",
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "We’ve gotta get out of here before they catch up to us.",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "narration",
        text: "They run to the exit, but realize the prison is surrounded by a big wall.",
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "What is this doing here?!?! I thought we were home free.",
        character: characters.get("prisoner1"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "Don’t worry. I already thought of this.",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "We’ll just have to dig our way out.",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "narration",
        text: "Sah tapes a spoon to each of his 10 fingers and starts to dig.",
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "narration",
        text: "Each prisoner follows suit. The guards were hot on their tails.",
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
]


export const storyP4 = [
    {
        type: "dialogue",
        text: "We’ve done it boys! We’re out!",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "YUH",
        character: characters.get("prisoner1"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "I can’t wait to see my dog.",
        character: characters.get("prisoner1"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "dialogue",
        text: "yeah...about that…",
        character: characters.get("Sah"),
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "narration",
        text: " After the infamous escape of SPOONFINGERS, the prison never used spoons again…",
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    {
        type: "narration",
        text: "THE END",
        bkgdImage: require("../BackgroundImages/background.jpeg")
    },
    
]