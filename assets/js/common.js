// common.js
function goHome() {
    if (school.initialized) {
        startOver();
    }
    else {
        $("#homedialog").show();
    }
}
function startOver() {
    window.location.assign("index.html");
}
function cancelStartOver() {
    $("#homedialog").hide();
}
function numberWithCommas(x) {
    x = Math.round(x * 100) / 100;
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function setEvents() {
    $(".report").on("click", () => {
        window.open("details.html", "_blank")
    })
    $(".home").on("click", goHome);
    $("#startover").on("click", startOver);
    $("#cancel").on("click", cancelStartOver);
}
