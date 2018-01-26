'use strict';

window.onload = function () {
    setValues();
    updateScreen();
    createListeners();
};

var x = "one";

function setValues() {
    clearValues();
    HintergrundAuswahl[Hintergrund].setVars();
    KlasseAuswahl[Klasse].setVars();
    Vorteile.setVars();
    Nachteile.setVars();
    calculateAbilityScoreMods();
    calculateSkills();
}

function updateScreen() {

  var dropdownsToUpdateFromArrayOfStrings = [
    "Klassen", "Hintergruende", "Raenge", "HierarchischAlignments",
    "SozialAlignments", "MoralAlignments", "Haende"
  ];

  var screenValuesToUpdate = [
    "Speed", "Vorteil", "Advantage", "Nachteil", "Disadvantage", "Moral", "MaximaleMoral",
    "Gesundheit", "MaximaleGesundheit", "PhysicalResistance", "MentalResistance",
    "Hunger", "MaximalerHunger", "Durst", "MaximalerDurst", "ProficiencyBonus",
    "PassiveWisdom", "Sprache"
  ];

  var screenValuesToUpdateFromArrayOfStrings = [
    "Waffe", "Item", "Zusatzfaehigkeiten"
  ];

  for (var dropdownNo in dropdownsToUpdateFromArrayOfStrings) {
    updateDropdownFromArrayOfStrings(dropdownsToUpdateFromArrayOfStrings[dropdownNo]);
  }

  for (var valueNo in screenValuesToUpdate) {
    updateScreenValue(screenValuesToUpdate[valueNo]);
  }

  for (var valueFromArrayNo in screenValuesToUpdateFromArrayOfStrings) {
    updateScreenValueFromArrayOfStrings(screenValuesToUpdateFromArrayOfStrings[valueFromArrayNo]);
  }

    updateAbilityScores();
    updateSkills();

}

function createListeners() {
    var fields = document.getElementsByTagName("select");
    var choice;
    for (var fieldNo = 0; fieldNo < fields.length; fieldNo++) {
        console.log("THE CHOICE" + fields[fieldNo]);
        fields[fieldNo].addEventListener("change", function(e) {
            console.log(e.currentTarget.value);
            console.log(HintergrundAuswahl.Army);
        }, false);
    }
}

function updateAll(e) {
    setValues();
    updateScreen();
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
    var elem = document.getElementById(val);
    for (var i = 0; i < src.length; i++) {
        elem[i] = new Option(src[i]);
        if (src[i] === window[val][1]) elem[i].selected = true;
    }
   elem.value = window[val][1];
}

function updateAbilityScores() {
    for(var key in AbilityScores) {
        document.getElementById(key).value = AbilityScores[key][0];
        document.getElementById(key + "Mod").value = AbilityScores[key][1];
    }
}

function calculateAbilityScoreMods() {
    for(var key in AbilityScores) {
        var score = AbilityScores[key][0];
        AbilityScores[key][1] = Math.floor((score - 10) / 2);
    }
    PassiveWisdom = AbilityScores.wisdom[0] + ProficiencyBonus;
}

function updateSkills() {
    for(var key in Skill) {
        document.getElementById(key).value = Skill[key];
    }
}

function calculateSkills() {
    for(var ability in Skills) {
        for(var skill in Skills[ability]) {
            Skill[Skills[ability][skill]] += AbilityScores[ability][1];
        }
    }
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

function hi() {
    var r = roll(Hintergruende[0].length-1);
    return Hintergruende[0][r];
}

function kl() {
    var r = roll(Klassen[0].length-1);
    return Klassen[0][r];
}

var r = null, //random factor
    Name = "",
    Alter = "",
    Hand = "rechtshaendig",
    Speed = 30,

    Rang = "Keine Spezialisierung",

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
        dexterity: ["acrobatics", "sleightOfHand", "stealth"],
        intelligence: ["investigation", "nature", "religion"],
        strength: ["athletics"],
        wisdom: ["insight", "medicine", "perception", "survival"]
    },

    Hintergruende = [["Army", "Einwanderer", "Geistlicher", "Gesetzeshueter", "Hillbilly", "Intellektueller", "vermoegend"],""],

    Klassen = [["Fuehrungspersoenlichkeit", "Heiler", "Kaempfer", "Prediger", "Schuetze", "Techniker"],
    ""],

    Hintergrund = hi(),
    Klasse = kl();

    Klassen[1] = Klasse;
    Hintergruende[1] = Hintergrund;

    var Raenge = [[],
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
                else Item[Item.length] = "Schusssichere Weste";
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
        setFaehigkeiten: function(dieseKlasse) {
            for (var faehigkeit in dieseKlasse) {
                    Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = dieseKlasse[faehigkeit];
            }
        },
        
        Heiler: {
            setVars: function () {
                KlasseAuswahl.setFaehigkeiten(this);
                PhysicalResistance += 4;
                MentalResistance += 4;
                Skill.medicine += 2;
            },
            Faehigkeiten: ["Wundversorgung: +1d10 % Lebensenergie, max 3x/Tag", "Notoperation: Erg(1d20)>17: tödliche Verletzung wird zu schwerer Verletzung"]
        },

        Prediger: {
            setVars: function () {
                KlasseAuswahl.setFaehigkeiten(this);
                PhysicalResistance += 3;
                MentalResistance += 6;
                Skill.persuasion += 2;
            },
            Faehigkeiten: ["Motivation: +1d4 Moral aller, max 1x/Tag"]
        },

        Fuehrungspersoenlichkeit: {
            setVars: function () {
                KlasseAuswahl.setFaehigkeiten(this);
                PhysicalResistance += 4;
                MentalResistance += 6;
            },
            Faehigkeiten: ["Doppelte Stimme bei Abstimmung", "Entscheidungen verändern Mental Resistance nicht"]
        },

        Kaempfer: {
            setVars: function () {
                KlasseAuswahl.setFaehigkeiten(this);
                PhysicalResistance += 4;
                MentalResistance += 6;
                if (this.Skill === "acrobatics") Skill.acrobatics += 2;
                else Skill.athletics += 2;
            },
            Skill: "acrobatics",
            Skills: ["acrobatics, athletics"],
            Faehigkeiten: ["Melee Attack +2", "Range Attack -2"]
        },

        Schuetze: {
            setVars: function () {
                KlasseAuswahl.setFaehigkeiten(this);
                PhysicalResistance += 6;
                MentalResistance += 3;
            },
            Faehigkeiten: ["Melee Attack -2", "Range Attack +2", "Nat. Hit auch bei Erg(1d20)=19"]
        },

        Techniker: {
            setVars: function () {
                if (Rang !== "") {
                    Rang += ", ";
                }
                Rang = this.Rang;
                Raenge[0] = this.Raenge;
                Raenge[1] = Rang;
                KlasseAuswahl.setFaehigkeiten(this);
                
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
            Raenge: ["Schwermechaniker", "Feinmechaniker"],
            Faehigkeiten: ["Technisches Wissen: +2 intelligence bei technischen Fragen", "Reparatur: (Erg(1d6) > (7 - Tag)) = repariert, (Erg(1d4) = 1) = irreparabel, beides 1x/Tag"]
        }
    },

    Vorteile = {
        setVars: function () {
            r = roll(this.Eigenschaften.length - 1);
            var e = this.Eigenschaften[r];
            Vorteil = e;
            switch(e) {
                case "Spurenleser":
                    Advantage = "Perception";
                    break;
                case "Koch":
                    Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Nahrungsverbrauch/Tag aller: 400g Essen, 0.75l Wasser";
                    break;
                case "Jaeger":
                    Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Essensplus/Tag: Erg(1d4) (>2: Erg(1d4) - 2)kg, =2: 0.5g";
                    break;
                case "Einbrecher":
                    Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Schloesser knacken";
                    break;
                case "Ausdauernd":
                    Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Lange Rast = 6h";
                    break;
                case "Aufmerksam":
                    PassiveWisdom += 2;
                    break;
                case "Menschenkenner":
                    Advantage = "Insight";
                    break;
                case "Sportler":
                    Advantage = "Athletics";
                    break;
                case "Optimist":
                    Moral += 1;
                    break;
                case "Unerschrocken":
                    Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Keine Panik wegen Walkern";
                    break;
                case "Wandeln unter Walkern":
                    Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Wandeln unter Walkern";
                    break;
                default:
                    Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Heilung/Tag: Erg(1d6)";
                    break;
            }
        },
        Eigenschaften: ["Spurenleser", "Koch", "Jaeger", "Einbrecher", "Ausdauernd", "Aufmerksam", "Menschenkenner", "Sportler", "Optimist", "Unerschrocken", "Wandeln unter Walkern", "Schnelle Selbstheilung"]
    },

    Nachteile = {
        setVars: function () {
            r = roll(this.Eigenschaften.length - 1);
            var e = this.Eigenschaften[r];
            Nachteil = e;
            switch(e) {
                case "Alt":
                    Disadvantage = "Strength";
                    break;
                case "Kind":
                    Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Keine Mitbestimmung";
                    break;
                case "Nichtschwimmer":
                    Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Kann nicht schwimmen";
                    break;
                case "Waffenphob":
                    r = roll(2);
                    if (r < 2) Waffe[0] = "Schraubenzieher";
                    else Waffe[0] = "Messer";
                    break;
                case "Langsam":
                    Speed -= 10;
                    break;
                case "Mangelerscheinungen":
                    MaximalerHunger -= 2;
                    break;
                case "Analphabet":
                    Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Kann nicht lesen";
                    break;
                case "Pessimist":
                    MaximaleMoral -= 1;
                    break;
                case "Junkie":
                    MaximaleGesundheit = 80;
                    break;
                case "Rassist":
                    Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Keine Kooperation mit Personen, die anders sind als man selbst";
                    break;
                default:
                    Zusatzfaehigkeiten[Zusatzfaehigkeiten.length] = "Ist kleptomanisch";
                    break;
            }
        },
        Eigenschaften: ["Kind", "Alt", "Waffenphob", "Nichtschwimmer", "Langsam", "Kann nicht autofahren", "Analphabet", "Mangelerscheinungen", "Junkie", "Rassist", "Kleptomane", "Pessimist"]
    };
