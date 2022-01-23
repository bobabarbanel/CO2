$(function () {
    ready();
})
function resizeChosen() {
    $(".chosen-container").each(function () {
        $(this).attr('style', 'width: 100%');
    });
}
function ready() {
    $('body').flowtype({
        minimum: 500,
        maximum: 1200,
        minFont: 12,
        maxFont: 20,
        fontRatio: 20
    });
    const selector = $("#selector");
    const chosen = $(".chosen")
    selector.css("opacity", 0);
    const submit = $("#submits");
    submit.css("opacity", 0);
    const schools = processCSV();
    // console.log(schools);

    $('input[type=radio][name=school-type]').on("change", handleTypeChange);
    chosen.on("change", handleSelection);
    submit.on("click", handleSubmit);
    function handleTypeChange() {
        submit.css("opacity", 0);
        // console.log($(this).val());
        const type = $(this).val();
        let prompt;
        if (type === "All") {
            prompt = "a";
        }
        else {
            if (type === "Elementary") {
                prompt = "an " + type;
            }
            else {
                prompt = "a " + type;
            }
        }

        let shortList;
        if (type === "All") {
            shortList = schools;
        }
        else {
            shortList = schools.filter(
                (school) => school.type === type
            );
        }
        selector.children("h2").text(`(${shortList.length}) Choose ${prompt} school:`);
        chosen.chosen({
            placeholder_text_single: "Choose a School",
            no_results_text: "No matching school(s)",
            width: "800px",
            search_contains: true,
        });
        chosen.empty().append("<option/>");
        shortList.forEach(
            (school) => {
                // console.log(school.name);
                chosen.append(`<option value="${school.id}"><b>${school.name}</b>&nbsp;&nbsp;&nbsp;&nbsp;${school.address}, ${school.city} ${school.zip} </option>`)
            }
        );
        resizeChosen();
        chosen.trigger("chosen:updated");

        selector.css("opacity", 1);
    }
    function handleSelection() {
        const id = +$(this).val();
        // console.log(id);
        const school = schools.find(s => s.id === id);
        // add fields for TRANSPORT
        school.transport = { annual: 0 }
        for (let fuel of ["g", "d", "e"]) {
            for (let name of ["buses", "milesdriven"]) {
                school.transport[fuel + name] = 0;
            }
            school.transport["t_" + fuel + "CO2"] = 0;
        }

        school.energy = { annual: 0 }
        for (let energy of "nefp") {
            school.energy["e_" + energy + "CO2"] = 0;
            school.energy[energy + "unit"] = "init"; //radio button values
            school.energy[energy + "bill"] = 0;
        }

        school.waste = { annual: 0 }
        for (let method in wasteNums) {
            for (let material in wasteNums[method]) {
                if (wasteNums[method][material] !== "NA" && material !== "Default") {
                    school.waste[method + "_" + material] = 0;
                }
            }
        }
        school.initialized = true;
        sessionStorage.setItem("target", JSON.stringify(school));
        // window.location.assign("transport.html");
        submit.css("opacity", 1);

        console.log(school);
    }
    function handleSubmit() {
        window.location.assign($(this).attr('target') + ".html");
    }
}
function processCSV() {
    const rows = csvdata.split(/\n/);
    const fields = rows.shift().split(/,/);

    const schools = [];
    for (let row of rows) {
        let values = row.split(/, */);
        let school = {
            [fields[0]]: +values[0],
            [fields[1]]: values[1],
            [fields[2]]: values[2],
            [fields[3]]: values[3],
            [fields[4]]: values[4],
            [fields[5]]: values[5],
            [fields[6]]: +values[6]
        }
        schools.push(school);
    }
    return schools;
}
