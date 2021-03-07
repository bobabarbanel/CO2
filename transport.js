$(function(){
    ready();
})
let school, transport;
function ready(){
    school = JSON.parse(sessionStorage.getItem("target"));
    transport = school.transport;
    $("#schoolinfo").html(`${school.name}&nbsp;&nbsp;&nbsp;&nbsp;${school.address}, ${school.city} ${school.zip}`);
    for(let fuel of ["g", "d", "e"]){
        for(let name of ["buses", "milesdriven"]){
            $("#"+fuel+name).val(transport[fuel + name]);
        }
    }

    $("#gbuses, #ebuses, #dbuses").on("change",CO2calc1);
    $("#gmilesdriven, #emilesdriven, #dmilesdriven").on("change",CO2calc2);
    if(school.initialized === false){
        $("#gbuses, #ebuses, #dbuses").trigger("change");
    }
    $(".report").on("click", () =>{
        window.open("details.html", "_blank")
    })
    $(".home").on("click", goHome);   
    $("#startover").on("click", startOver);
    $("#cancel").on("click", cancelStartOver);
}

function CO2calc1(event){
    const fuel = event.target.id[0];
    const numbuses = $(this).val();
    transport[fuel+"buses"] = +numbuses;
    const milesdriven = transport[fuel+"milesdriven"];
    doCO2calc(fuel, numbuses, milesdriven);
}    
function CO2calc2(event){
    const fuel = event.target.id[0];
    const milesdriven = $(this).val();
    transport[fuel+"milesdriven"] = +milesdriven;
    const numbuses = transport[fuel+"buses"];
    doCO2calc(fuel, numbuses, milesdriven);
}   
function doCO2calc(fuel, numbuses, milesdriven){
    // debugger;
    const result = $("#t_"+fuel+"CO2calc");
    const numerator = numbuses * milesdriven;
    if(fuel === "e"){
        result.text(0);
    }
    else if(fuel === "g"){
        let co2 = Math.round(numerator * 19.3565636/6, 2);
        
        result.text(numberWithCommas(co2));
    }
    else{
        let co2 = Math.round(numerator * 22.5091702/7, 2);
        result.text(numberWithCommas(co2))
    }
    const gCO2 = +$("#t_gCO2calc").text().split(",").join("");
    const dCO2 = +$("#t_dCO2calc").text().split(",").join("");
    const eCO2 = 0;
    // if(gCO2.isNaN() || dCO2.isNaN()){
    //     $("#annual").text("");
    // }
    // else{
    $("#annual").text(numberWithCommas(gCO2 + dCO2));
    school.transport.gCO2 = gCO2;
    school.transport.dCO2 = dCO2;
    school.transport.eCO2 = eCO2;
    school.transport.annual = gCO2 + dCO2;
    $("#current").text(numberWithCommas(school.transport.annual + school.energy.annual + school.waste.annual));
    school.initialized = false;
    sessionStorage.setItem("target", JSON.stringify(school));
// } 
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


