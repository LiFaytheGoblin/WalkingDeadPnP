'use strict';

window.onload = function () {
    //updateScreen();
    updateValues();
    updateScreen();
};

function updateValues() {
    clearValues();
    window.HintergrundAuswahl[Hintergrund].setVars();
    window.KlasseAuswahl[Klasse].setVars();
    window.Vorteile.setVars();
    window.Nachteile.setVars();
}

function updateScreen() {
    updateScreenValue("Speed");
    updateScreenValue("Vorteil");
    updateScreenValue("Advantage");
    updateScreenValue("Nachteil");
    updateScreenValue("Disadvantage");
    updateScreenValue("Moral");
    updateScreenValue("MaximaleMoral");
    updateScreenValue("Gesundheit");
    updateScreenValue("MaximaleGesundheit");
    updateScreenValue("PhysicalResistance");
    updateScreenValue("MentalResistance");
    updateScreenValue("Hunger");
    updateScreenValue("MaximalerHunger");
    updateScreenValue("Durst");
    updateScreenValue("MaximalerDurst");
    updateScreenValue("ProficiencyBonus");
    updateScreenValue("PassiveWisdom");
    updateScreenValue("Sprache");

    updateScreenValueFromArrayOfStrings("Waffe");
    updateScreenValueFromArrayOfStrings("Item");
    updateScreenValueFromArrayOfStrings("Zusatzfaehigkeiten");

    updateDropdownFromArrayOfStrings("Raenge");
    
    updateDropdownFromArrayOfStrings("Klassen");
    updateDropdownFromArrayOfStrings("Hintergruende");
    updateDropdownFromArrayOfStrings("HierarchischAlignments");
    updateDropdownFromArrayOfStrings("SozialAlignments");
    updateDropdownFromArrayOfStrings("MoralAlignments");
    updateDropdownFromArrayOfStrings("Haende");

    //update ability scores info out of array, 2 elems

    //update skills info out of array
    
}

function clearValues() {
    Zusatzfaehigkeiten = [];
    Sprache = "";
}

function updateScreenValue(val) {
    document.getElementById(val).value = window[val];
}

function updateScreenValueFromArrayOfStrings(val) {
    var src = window[val];
    if (src.length === 0) return;
    var r = "";
    for (var i = 0; i < src.length; i++) {
        if (r.length === 0) {
            r = src[i];
        } else {
            r = r + "; " + src[i];
        }
    }
    document.getElementById(val).value = r;
}

function updateDropdownFromArrayOfStrings(val) {
    var src = window[val][0];
    if (src.length === 0) return;
    var r = [];
    var s = "";
    for (var i = 0; i < src.length; i++) {
        if(src[i] === window[val][1]) s = " selected";
        else s = "";
        if (r.length === 0) {
            r[0] = ["<option value=" +
                 src[i] + s +
                 ">" +
                 src[i] +
                 "</option>"];
        } else {
            r[0] = r +
                "<option value=" +
                src[i] + s +
                ">" +
                src[i] +
                "</option>";
        }
    }
    r = r.join('');
    document.getElementById(val).value = window[val][1];
    document.getElementById(val).innerHTML = r;
}

function roll(range) {
    var r = Math.floor(Math.random() * (range + 1));
    return r;
}

function w() {
    var r = roll(3);
    if (r === 0) return ["Schraubenzieher"];
    else if (r === 1) return ["Messer"];
    else if (r === 2) return ["Pistole"];
    else return ["Schrotflinte"];
}

function s() {
    var r = roll(2);
    if (r === 0) return "kooperativ";
    else if (r === 1) return "opportunistisch";
    else return "einzelgaengerisch";
}

function h() {
    var r = roll(2);
    if (r === 0) return "Anfuehrer";
    else if (r === 1) return "unentschlossen";
    else return "Rebell";
}

function m() {
    var r = roll(2);
    if (r === 0) return "gut";
    else if (r === 1) return "neutral";
    else return "boese";
}

var r = null, //random factor
    Name = "",
    Alter = "",
    Hand = "rechtshaendig",
    Speed = 30,

    MoralAlignment = m(),
    SozialAlignment = s(),
    HierarchischAlignment = h(),

    MaximalerHunger = 10,
    Hunger = "",

    MaximalerDurst = 3,
    Durst = "",

    MaximaleMoral = 10,
    Moral = "",

    MaximaleGesundheit = 100,
    Gesundheit = "",

    PhysicalResistance = 0,
    MentalResistance = 0,

    Item = ["2 Flaschen Wasser", "2 Tagesrationen Essen"],

    Waffe = w(),

    AbilityScores = { //score, modifier
        charisma: [10, 0],
        constitution: [10, 0],
        dexterity: [10, 0],
        intelligence: [10, 0],
        strength: [10, 0],
        wisdom: [10, 0]
    },

    Skill = {
        acrobatics: 0,
        athletics: 0,
        deception: 0,
        insight: 0,
        intimidation: 0,
        investigation: 0,
        medicine: 0,
        nature: 0,
        perception: 0,
        performance: 0,
        persuasion: 0,
        religion: 0,
        sleightOfHand: 0,
        stealth: 0,
        survival: 0
    },

    PassiveWisdom = 0,
    ProficiencyBonus = 2,

    Sprache = "",
    Zusatzfaehigkeiten = [],

    Vorteil = "",
    Nachteil = "",

    Advantage = "-",
    Disadvantage = "-",

    Hintergrund = "Army",
    Klasse = "Heiler",
    Rang = "Kein Rang",

    //AUSWAHL
    Haende = [["linkshaendig", "rechtshaendig"], Hand],

    MoralAlignments = [["gut", "neutral", "boese"],
    MoralAlignment],
    SozialAlignments = [["kooperativ", "opportunistisch", "einzelgaengerisch"],
    SozialAlignment],
    HierarchischAlignments = [["Anfuehrer", "unentschlossen", "Rebell"],
    HierarchischAlignment],

    Waffen = ["Schraubenzieher", "Messer", "Pistole", "Schrotflinte"],

    Skills = {
        charisma: ["deception", "intimidation", "performance", "persuasion"],
        constitution: [],
        dexterity: ["acrobatics", "sleight of hand", "stealth"],
        intelligence: ["history", "investigation", "nature", "religion"],
        strength: ["athletics"],
        wisdom: ["insight", "medicine", "perception", "survival"]
    },

    Hintergruende = [["Army", "Einwanderer", "Geistlicher", "Gesetzeshueter", "Hillbilly", "Intellektueller", "vermoegend"],
    Hintergrund],

    Klassen = [["Fuehrungspersoenlichkeit", "Heiler", "Kaempfer", "Prediger", "Schuetze", "Techniker"],
    Klasse],

    Raenge = [[],
    Rang],

    HintergrundAuswahl = {
        Army: {
            //add dropdown for rank
            setVars: function () {
                if (Rang !== "") Rang += ", ";
                Rang = this.Rang;
                Raenge[0] = this.Raenge;
                Raenge[1] = Rang;
                AbilityScores.charisma[0] -= 3;
                AbilityScores.constitution[0] += 2;
                AbilityScores.strength[0] += 2;
                if (this.Rang === "Offizier") {
                    PhysicalResistance += 3;
                    MentalResistance += 5;
                } else {
                    PhysicalResistance += 6;
                    MentalResistance += 2;
                }
                Skill.athletics += 2;
                Skill.intimidation += 2;
                Skill.survival += 2;
                Sprache = "Englisch";
                if (roll(100) < 20) Sprache = Sprache + ", Spanisch";
            },
            Rang: "Soldat",
            Raenge: ["Offizier", "Soldat"]
        },

        Einwanderer: {
            setVars: function () {
                AbilityScores.charisma[0] -= 1;
                AbilityScores.constitution[0] += 2;
                AbilityScores.strength[0] += 1;
                PhysicalResistance += 5;
                MentalResistance += 3;
                Skill.survival += 2;
                Skill.stealth += 2;
                Sprache = "Spanisch";
            }
        },

        Geistlicher: {
            setVars: function () {
                AbilityScores.charisma[0] += 2;
                AbilityScores.strength[0] -= 2;
                AbilityScores.wisdom[0] += 2;
                PhysicalResistance += 3;
                MentalResistance += 5;
                Skill.insight += 2;
                Skill.persuasion += 2;
                Sprache = "Englisch";
            }
        },

        Gesetzeshueter: {
            setVars: function () {
                AbilityScores.constitution[0] -= 1;
                AbilityScores.strength[0] += 1;
                AbilityScores.wisdom[0] += 2;
                PhysicalResistance += 4;
                MentalResistance += 4;
                Skill.investigation += 2;
                Sprache = "Englisch";
                var r = roll(4);
                if (r < 3) Item[Item.length] = "Zusaetzliche Munition";
                else  Item[Item.length] = "Schusssichere Weste";
                r = roll(2);
                if (r < 2) Waffe[0] = "Pistole";
                else Waffe[0] = "Schrotflinte";
            }
        },

        Hillbilly: {
            setVars: function () {
                AbilityScores.charisma[0] -= 1;
                AbilityScores.dexterity[0] += 3;
                AbilityScores.intelligence[0] -= 2;
                AbilityScores.strength[0] += 2;
                PhysicalResistance += 6;
                MentalResistance += 2;
                Skill.nature += 2;
                Skill.survival += 2;
                Sprache = "Englisch";
                r = roll(2);
                if (r < 2) Waffe[0] = "Pistole";
                else Waffe[0] = "Schrotflinte";
            }
        },

        Intellektueller: {
            setVars: function () {
                AbilityScores.constitution[0] -= 2;
                AbilityScores.intelligence[0] += 4;
                AbilityScores.strength[0] -= 1;
                AbilityScores.wisdom[0] += 1;
                PhysicalResistance += 2;
                MentalResistance += 6;
                Skill.investigation += 2;
                Skill.perception += 2;
                Sprache = "Englisch, Spanisch";
            }
        },

        vermoegend: {
            setVars: function () {
                AbilityScores.charisma[0] += 2;
                AbilityScores.constitution[0] += 2;
                AbilityScores.dexterity[0] -= 1;
                AbilityScores.intelligence[0] -= 2;
                PhysicalResistance += 4;
                MentalResistance += 4;
                Sprache = "Englisch, Spanisch";
                Item[Item.length] = "Auto";
            }
        }
    },

    KlasseAuswahl = {
        Heiler: {
            setVars: function () {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Wundversorgung: +1d10 % Lebensenergie, max 3x/Tag";
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Notoperation: Erg(1d20)>17: tödliche Verletzung wird zu schwerer Verletzung";
                PhysicalResistance += 4;
                MentalResistance += 4;
                Skill.medicine += 2;
            }
        },

        Prediger: {
            setVars: function () {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Motivation: +1d4 Moral aller, max 1x/Tag";
                PhysicalResistance += 3;
                MentalResistance += 6;
                Skill.persuasion += 2;
            }
        },

        Fuehrungspersoenlichkeit: {
            setVars: function () {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Doppelte Stimme bei Abstimmung";
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Entscheidungen verändern Mental Resistance nicht";
                PhysicalResistance += 4;
                MentalResistance += 6;
            }
        },

        Kaempfer: {
            setVars: function () {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Melee Attack +2";
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Range Attack -2";
                PhysicalResistance += 4;
                MentalResistance += 6;
                if (this.Skill === "acrobatics") Skill.acrobatics += 2;
                else Skill.athletics += 2;
            },
            Skill: "acrobatics",
            Skills: ["acrobatics, athletics"]
        },

        Schuetze: {
            setVars: function () {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Melee Attack -2";
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Range Attack +2";
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Nat. Hit auch bei Erg(1d20)=19";
                PhysicalResistance += 6;
                MentalResistance += 3;
            }
        },

        Techniker: {
            setVars: function () {
                if (Rang !== "") {
                    Rang += ", ";
                }
                Rang = this.Rang;
                Raenge[0] = this.Raenge;
                Raenge[1] = Rang;
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Technisches Wissen: +2 intelligence bei technischen Fragen";
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Reparatur: (Erg(1d6) > (7 - Tag)) = repariert, (Erg(1d4) = 1) = irreparabel, beides 1x/Tag";
                if (this.Rang === "Schwermechaniker") {
                    PhysicalResistance += 5;
                    MentalResistance += 4;
                } else {
                    PhysicalResistance += 4;
                    MentalResistance += 5;
                }

                Skill.sleightOfHand += 2;
            },
            Rang: "Feinmechaniker",
            Raenge: ["Schwermechaniker", "Feinmechaniker"]
        }
    },

    Vorteile = {
        setVars: function () {
            r = roll(this.Eigenschaften.length - 1);
            var e = this.Eigenschaften[r];
            Vorteil = e;
            if (e === "Spurenleser") {
                Advantage = "Perception";
            } else if (e === "Koch") {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Nahrungsverbrauch/Tag aller: 400g Essen, 0.75l Wasser";
            } else if (e === "Jaeger") {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Essensplus/Tag: Erg(1d4) (>2: Erg(1d4) - 2)kg, =2: 0.5g";
            } else if (e === "Einbrecher") {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Schloesser knacken";
            } else if (e === "Ausdauernd") {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Lange Rast = 6h";
            } else if (e === "Aufmerksam") {
                PassiveWisdom += 2;
            } else if (e === "Menschenkenner") {
                Advantage = "Insight";
            } else if (e === "Sportler") {
                Advantage = "Athletics";
            } else if (e === "Optimist") {
                Moral += 1;
            } else if (e === "Unerschrocken") {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Keine Panik wegen Walkern";
            } else if (e === "Wandeln unter Walkern") {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Wandeln unter Walkern";
            } else {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Heilung/Tag: Erg(1d6)";
            }
        },
        Eigenschaften: ["Spurenleser", "Koch", "Jaeger", "Einbrecher", "Ausdauernd", "Aufmerksam", "Menschenkenner", "Sportler", "Optimist", "Unerschrocken", "Wandeln unter Walkern", "Schnelle Selbstheilung"]
    },

    Nachteile = {
        setVars: function () {
            r = roll(this.Eigenschaften.length - 1);
            var e = this.Eigenschaften[r];
            Nachteil = e;
            if (e === "Alt") {
                Disadvantage = "Strength";
            } else if (e === "Kind") {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Keine Mitbestimmung";
            } else if (e === "Nichtschwimmer") {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Kann nicht schwimmen";
            } else if (e === "Waffenphob") {
                r = roll(2);
                if (r < 2) {
                    Waffe[0] = "Schraubenzieher";
                } else {
                    Waffe[0] = "Messer";
                }
            } else if (e === "Langsam") {
                Speed -= 10;
            } else if (e === "Kann nicht autofahren") {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Kann nicht autofahren";
            } else if (e === "Mangelerscheinungen") {
                MaximalerHunger -= 2;
            } else if (e === "Analphabet") {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Kann nicht lesen";
            } else if (e === "Pessimist") {
                MaximaleMoral -= 1;
            } else if (e === "Junkie") {
                MaximaleGesundheit = 80;
            } else if (e === "Rassist") {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Keine Kooperation mit Personen, die anders sind als man selbst";
            } else {
                Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Ist kleptomanisch";
            }
        },
        Eigenschaften: ["Kind", "Alt", "Waffenphob", "Nichtschwimmer", "Langsam", "Kann nicht autofahren", "Analphabet", "Mangelerscheinungen", "Junkie", "Rassist", "Kleptomane", "Pessimist"]
    };
