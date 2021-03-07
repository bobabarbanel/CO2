/* cSpell:disable */
/**
 * * Waste Emmisions Per Metric Ton
 * 
 * */
const wasteNums = {
    Recycle: { /* method */
        Paper: -3.13, /* material */
        Food: 'NA',
        Yard: 'NA',
        Plastics: -1.01,
        Electronics: -0.84,
        Metals: -5.41,
        Glass: -0.28,
        Construction: -1.04,
        Tires: -0.38,
        Mixed: -2.85,
        Default: -1.87
    },
    Landfill: {
        Paper: 0.13,
        Food: 0.54,
        Yard: -0.27,
        Plastics: -0.16,
        Electronics: 0.02,
        Metals: 0.02,
        Glass: 0.02,
        Construction: -0.22,
        Tires: 0.02,
        Mixed: 0.22,
        Default: 0.03
    },
    Combust: {
        Paper: -0.46,
        Food: -0.13,
        Yard: -0.16,
        Plastics: 1.08,
        Electronics: 0.59,
        Metals: -0.5,
        Glass: 0.03,
        Construction: -0.23,
        Tires: 0.5,
        Mixed: -0.18,
        Default: 0.05
    },
    Composted: {
        Paper: 'NA',
        Food: -0.18,
        Yard: -0.15,
        Plastics: -0.15,
        Electronics: 'NA',
        Metals: 'NA',
        Glass: 'NA',
        Construction: 'NA',
        Tires: 'NA',
        Mixed: -0.16,
        Default: -0.16
    },
    Anaerob: {
        Paper: 'NA',
        Food: -0.04,
        Yard: -0.11,
        Plastics: 'NA',
        Electronics: 'NA',
        Metals: 'NA',
        Glass: 'NA',
        Construction: 'NA',
        Tires: 'NA',
        Mixed: -0.06,
        Default: -0.07
    }
};
// const result = {};


// for (let line of [
//     "Paper,-3.13,0.13,-0.46,NA,NA",
//     "Food,NA,0.54,-0.13,-0.18,-0.04",
//     "Yard,NA,-0.27,-0.16,-0.15,-0.11",
//     "Plastics,-1.01,-0.16,1.08,-0.15,NA",
//     "Electronics,-0.84,0.02,0.59,NA,NA",
//     "Metals,-5.41,0.02,-0.50,NA,NA",
//     "Glass,-0.28,0.02,0.03,NA,NA",
//     "Construction,-1.04,-0.22,-0.23,NA,NA",
//     "Tires,-0.38,0.02,0.50,NA,NA",
//     "Mixed,-2.85,0.22,-0.18,-0.16,-0.06",
//     "Default,-1.87,0.03,0.05,-0.16,-0.07"]) {
//     let f = line.split(/,/);
//     let type = f.shift();

//     for (let key of ["Recycle", "Landfill", "Combust", "Composted", "Anaerobe"]) {
//         if (result[key] === undefined) result[key] = {};
//         let v = f.shift();
//         // console.log(key, type, v);
//         result[key][type] = (v === "NA") ? v : (+v);
//     }


// }
// console.log(result);
