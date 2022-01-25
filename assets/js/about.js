  $("#dialog > pre").html(`<b>Objective:
  Provide a web-based tool for MCPS schools to calculate their current carbon footprint based on individual school inputs. 
  This will allow the school administrators to create a baseline and track progress to mitigate their carbon footprint. 
  
  What does this site do?
  This website is a Carbon Footprint Calculator for MCPS modeled along the lines of the EPA Carbon footprint calculator. 
  This calculator estimates the carbon footprint attributable to each school’s activities such as transportation services, energy consumption, and net waste generated. 
  
  Inputs Required
  Carbon footprint from Transportation 
  1) Number of school buses and private cars used. 
  2) Miles driven per year by each school bus and cars for students carpooling. 
  
  Carbon emission for bus = (Miles driven each year x # of school buses) /Average mileage x emission rate
  Carbon emission for car = (Miles driven each year x # of cars * emission rate) / conversion to pounds for CO2
  This computation factors tailpipe emission and not upstream emission.
  
  Carbon footprint from  Energy Consumption  
  1) Monthly consumption for heating (Natural Gas or Fuel Oil or Electricity)
  2) Monthly consumption for electricity (electricity or other)
  Carbon emission = Annual  fuel consumption x emission rate 
  
  Carbon footprint from  Waste:  
  1) Annual waste generated for these categories - Recycle, Landfill, Combust, Compost, and Anaerobically Digested     
  
  How can schools reduce their carbon footprint?
  1) Convert school buses to electric and encourage walkers. 
  2) Install roof-top solar panels.
  3) Replace incandescent light bulbs with LED or other ENERGY STAR  lights.
  4) Turn up/down the AC and heating thermostat in the summer and winter months.
  
  Resources
  MCPS
  https://www.montgomerycountymd.gov/sws/footprint/
  https://www.montgomeryschoolsmd.org/boe/meetings/AUdocs/2012-13/2012-0910/091012%20Plan%20for%20Reducing%20and%20Reporting%20Carbon%20Footprint.pdf
  
  EPA 
  https://www3.epa.gov/carbon-footprint-calculator/
  https://fueleconomy.gov/
  https://www.epa.gov/automotive-trends/highlights-automotive-trends-report
  
  
  About the Creator
  This website was developed by Rishi S. Iyer, a student at Thomas S. Wootton High School ('24) in the Montgomery County Public School (MCPS), Maryland.
  </b>
  `);
  
$(".about").on("click", ()=>{
    $( "#dialog" ).show();
})
$(".aboutX").on("click", ()=>{
    $( "#dialog" ).hide();
})
