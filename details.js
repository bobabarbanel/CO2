$(function(){
    ready();
})
let school, transport, energy, waste;
function ready(){
    school = JSON.parse(sessionStorage.getItem("target"));
    transport = school.transport;
    energy = school.energy;
    waste = school.waste;
    $("#schoolinfo").html(`${school.name}&nbsp;&nbsp;&nbsp;&nbsp;${school.address}, ${school.city} ${school.zip}`);
    for(let key in transport){
        if(key !== "annual")
        $("#" + key).html("&nbsp;&nbsp;" + transport[key]);
    }
    // <label for="n_therms"><input  class="forcalc" type="radio" id="n_therms" name="nunit" value="n_therms">Therms</label> 
    // <label for="n_tcf"><input  class="forcalc" type="radio" id="n_tcf" name="nunit" value="n_tcf">Thousand<br/>&nbsp;&nbsp;&nbsp;&nbsp;Cubic Feet </label> 
    // <label for="n_dollars"><input  class="forcalc" type="radio" id="n_dollars" name="nunit" value="n_dollars">Dollars</label>

    // "e_kwh"><input  class="forcalc" type="radio" id="e_kwh" name="eunit" value="e_kwh">Kilowatt Hours</label> 
    // "e_dollars"><input  class="forcalc" type="radio" id="e_dollars" name="eunit" value="e_dollars">Dollars</label> 

    const translate = {
    n_therms: "Therms",
    n_tcf: "Thousand Cubic Feet",
    n_dollars: "Dollars",
    e_kwh: "Kilowatt Hours",
    e_dollars: "Dollars",
    f_gallons: "Gallons",
    f_dollars: "Dollars",
    p_gallons: "Gallons",
    p_dollars: "Dollars",
    
}
    for(let key in energy){
        if(key !== "annual"){
        let value = energy[key];
        if(value === "init"){
            $("#" + key).html("&nbsp;&nbsp;" + "unknown");
        }
        else{
            if(translate[value]){
            $("#" + key).html("&nbsp;&nbsp;" + translate[value]);
            }
            else{
                $("#" + key).html("&nbsp;&nbsp;" + value);
            }
        }
    }
    }
    // $("#wdata div.report").text(" ");
    for(let key in waste){
        if(key !== "annual")
        $("#" + key).html("&nbsp;&nbsp;" + waste[key]);
    }
    $("#t_annual").text(numberWithCommas(transport.annual));
    $("#e_annual").text(numberWithCommas(energy.annual));
    $("#w_annual").text(numberWithCommas(waste.annual));
    $("#current").text(numberWithCommas(transport.annual + energy.annual + waste.annual));
}
function numberWithCommas(x) {
    x = Math.round(x * 100)/100;
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}