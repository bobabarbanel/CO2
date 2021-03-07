  $("#dialog > pre").html(` Objective: 
  Provide a web based tool for MCPS schools to calcuate their current carbon footprint based on individual school inputs. 
  This will allow the school administrators to create a baseline and track progress to mitigate their carbon footprint. 
  
  What does this site do?
  This website is a Carbon Footprint Calculator for MCPS modeled along the lines of the EPA Carbon footprint calculator. 
  This calculator estimates the carbon footprint attributable to each school’s activities such as transportation services, 
  energy consumption, and net waste generated. 
  
  Inputs Required
  Carbon footprint from Transportation 
  1) Miles driven per year by each school bus 
  2) Number of school buses
  3) Mileage of each school bus (diesel or gasoline)
  Carbon emission = (Miles driven each year x # of school buses )/Average mileage x emission rate
  
  Carbon footprint from  Energy Consumption  
  1) Monthly consumption for heating (Natural Gas or Fuel Oil or Electricity)
  2) Monthly consumption for electricity (electricity or other)
  Annual  fuel consumption x emission rate 
  
  Carbon footprint from  Waste:  
  1) Annual waste generated for these categories - Recycle, Landfill, Combust, Compost, and Anaerobically Digested     
  
  
  How can the schools reduce its carbon footprint?
  1) Convert school buses to electric. 
  2) Install roof-top solar panels.
  3) Replace incandescent lightbulbs with LED or other ENERGY STAR  lights.
  4) Turn up/down the AC/heating thermostat in summer/winter months.
  
  Resources:
  MCPS
  <u>https://www.montgomerycountymd.gov/sws/footprint/</u>
  <u>https://www.montgomeryschoolsmd.org/boe/meetings/AUdocs/2012-13/2012-0910/091012%20Plan%20for%20Reducing%20and%20Reporting%20Carbon%20Footprint.pdf</u>
  EPA 
  <u>https://www3.epa.gov/carbon-footprint-calculator/</u>
  <u>https://fueleconomy.gov/</u>`);
  
$(".about").on("click", ()=>{
    $( "#dialog" ).show();
})
$(".aboutX").on("click", ()=>{
    $( "#dialog" ).hide();
})