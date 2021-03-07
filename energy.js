$(function () {
  ready();

});
let school, energy;
function ready() {
  school = JSON.parse(sessionStorage.getItem("target"));
  energy = school.energy;
  $("#schoolinfo").html(
    `${school.name}&nbsp;&nbsp;&nbsp;&nbsp;${school.address}, ${school.city} ${school.zip}`
  );
  for (let etype of "nefp") {
    let radiovalue = energy[etype + "unit"];
    if (radiovalue !== "init") {
      $("#" + radiovalue).prop("checked", true);
    } else {
      $(`input[name=${etype + "unit"}]`).prop("checked", false);
    }
    $("#" + etype + "bill").val(+energy[etype + "bill"]);
    }
//   calculateEnergy();
  $(".forcalc").on("change", calculateEnergy);
  if(school.initialized === false){
  $("#nbill").trigger("change");
  }
  $(".report").on("click", () =>{
    window.open("details.html", "_blank")
})
$(".home").on("click", goHome);    
$("#startover").on("click", startOver);
$("#cancel").on("click", cancelStartOver);
}

function calculateEnergy() {
  let n_value = 0, e_value = 0, f_value = 0, p_value = 0, bill; 
    
  //natural gas 
  bill = +$("#nbill").val();
  if (bill !== 0) {
    let checked = $("input[name=nunit]:checked").val();
    // console.log(checked);
    switch (checked) {
      case "n_therms":
        //Emission per year = Input * 11.6889 (pounds of co2 per therm of natural gas) * 12
        n_value = bill * 11.6889 * 12;
        energy.nunit = checked;
        break;
      case "n_tcf":
        //Emission per year = Input * 119.577 (pounds of co2 per thousand cubic feet of natural gas) * 12
        n_value = bill * 119.577 * 12;
        energy.nunit = checked;
        break;
      case "n_dollars":
        //Emission per year = (Input / 10.14 it is $ per thousand cubic feet of natural gas for Maryland customers in 2019) * 119.58 * 12
        n_value = (bill / 10.14) * 119.577 * 12;
        energy.nunit = checked;
        break;
      default:
        //no radio button chosen
        break;
    }
  }
  $("#e_nCO2calc").text(numberWithCommas(n_value));
energy.nbill = bill;

  //electricity
    bill = +$("#ebill").val();
  if (bill !== 0) {
    let checked = $("input[name=eunit]:checked").val();
    // console.log(checked);
    switch (checked) {
      case "e_kwh":
        // Emission per year = Input * pounds per kWh emission factor by zipcode * 12
        e_value = bill * school.CO2 *12;
        energy.eunit = checked;
        break;
      case "e_dollars":
        //Emission per year = (Input * 100) / 9.97 (cents per kWh for commercial business in Maryland in 2019) * pounds per kWh emission factor by zipcode * 12
        e_value = ((bill * 100) / 9.97) * school.CO2 * 12;
        energy.eunit = checked;
        break;
      default:
        //no radio button chosen
        break;
    }
  }
  $("#e_eCO2calc").text(numberWithCommas(e_value));
  energy.ebill = bill;

  //fuel oil
  bill = +$("#fbill").val();
  if (bill !== 0) {
    let checked = $("input[name=funit]:checked").val();
    // console.log(checked);
    switch (checked) {
      case "f_gallons":
        //Emission per year = Input * 22.51 (pounds of co2 per gallon) * 12
        f_value = bill * 22.51 * 12;
        energy.funit = checked;
        break;
      case "f_dollars":
        //Emission per year = Input / 3.33 (heating oil price per gallon in Maryland in 2018) * 22.51 * 12
        f_value = (bill/3.33) * 22.51 * 12;
        energy.funit = checked;
        break;
      default:
        //no radio button chosen
        break;
    }
  }
  $("#e_fCO2calc").text(numberWithCommas(f_value));
  energy.fbill = bill;

  //propane
  bill = +$("#pbill").val();
  if (bill !== 0) {
    let checked = $("input[name=punit]:checked").val();
    // console.log(checked);
    switch (checked) {
      case "p_gallons":
        //Emission per year = Input * 12.61 (pounds co2 per gallon) * 12
        p_value = bill * 12.61 * 12;
        energy.punit = checked;
        break;
      case "p_dollars":
        //Emission per year = Input / 2.90696 (propane price per gallon in Maryland in 2019) * 12.61 * 12
      p_value = (bill/2.90696) * 12.61 * 12;
      energy.punit = checked;  
      break;
      default:
        //no radio button chosen
        break;
    }
  }

  $("#e_pCO2calc").text(numberWithCommas(p_value));
  energy.pbill = bill;

  let annual = n_value + e_value + f_value + p_value;
  energy.annual = annual;
  $("#annual").text(numberWithCommas(annual));
  energy.e_nCO2 = +$("#e_nCO2calc").text().split(",").join("");
  energy.e_eCO2 = +$("#e_eCO2calc").text().split(",").join("");
  energy.e_fCO2 = +$("#e_fCO2calc").text().split(",").join("");
  energy.e_pCO2 = +$("#e_pCO2calc").text().split(",").join("");
  $("#current").text(numberWithCommas(school.transport.annual + energy.annual + school.waste.annual));
  school.initialized = false;
  sessionStorage.setItem("target", JSON.stringify(school));

}
function goHome(){
  if(school.initialized){
      startOver();
  }
  else{
      $("#homedialog").show();
  }
}
function startOver(){
window.location.assign("index.html");
}
function cancelStartOver(){
$("#homedialog").hide();
}
function numberWithCommas(x) {
    x = Math.round(x * 100)/100;
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
