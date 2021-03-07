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
    $("#details").append(JSON.stringify(school, null, 4))
}