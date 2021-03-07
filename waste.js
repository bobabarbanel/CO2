$(function () {
    ready();
  
  });
  let school, energy;
  let wasteForm;
  let compType = "metric tons";
  function ready() {
    school = JSON.parse(sessionStorage.getItem("target"));
    waste = school.waste;
    wasteForm = $("#dataentry > form");
    wasteForm.show();
    for(let method in wasteNums){
        for(let material in wasteNums[method]){
            if(wasteNums[method][material] !== "NA" && material !== "Default"){
                let target = $("#" + material).parent().find(`input[col=${method}]`);
                target.val(school.waste[method + "_" + material]);
                target.on("change", calculateWaste);
            }
        }
    }
    if(school.initialized === false){
    calculateWaste();
    }
    $("#schoolinfo").html(
      `${school.name}&nbsp;&nbsp;&nbsp;&nbsp;${school.address}, ${school.city} ${school.zip}`
    );
    $(".report").on("click", () =>{
        window.open("details.html", "_blank")
    })
    $(".home").on("click", goHome);  
    $("#startover").on("click", startOver);
    $("#cancel").on("click", cancelStartOver);
}

  function calculateWaste() {
      if(compType === "metric tons"){
        waste.annual = 0;
    for(let method in wasteNums){
        for(let material in wasteNums[method]){
            if(wasteNums[method][material] !== "NA" && material !== "Default"){
                let value = +$("#" + material).parent().find(`input[col=${method}]`).val();
                school.waste[method + "_" + material] = value;
                waste.annual += value * wasteNums[method][material];
                console.log(waste.annual, value, wasteNums[method][material], method, material);
            }
        }
    }
    }
    else{
        //depending on school.type, calculate waste.annual from numberofstudents
        school.numberofstudents = +$("#studentcount").val();
        switch(school.type){
            case "Elementary": 
            waste.annual = school.numberofstudents * 12;
            break;
            case "Middle": 
            waste.annual = school.numberofstudents * 13;
            break;
            case "High": 
            waste.annual = school.numberofstudents * 14;
            break;
        }
    }
    $("#annual").text(numberWithCommas(waste.annual));
    
    $("#current").text(numberWithCommas(school.transport.annual + school.energy.annual + waste.annual));
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
  