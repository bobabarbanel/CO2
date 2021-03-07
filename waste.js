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
    waste.annual *= 2204.62;
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
  