// $(document).ready(function() {
let xmlhttp;
let currentText = "";

function theWhole() {
    setInterval(function () {
        runIt();
    }, 500);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function ()
    {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
        {
            if (xmlhttp.responseText !== "")
            {
                if (currentText != xmlhttp.responseText) {
                    document.getElementById("child").innerHTML = xmlhttp.responseText;
                    currentText = xmlhttp.responseText;
                }
            } 
            else
            {
                getLiveText();
            }
            shrink();
        }
    }
};

function shrink()
{
    let textDiv = document.getElementById("dynamicDiv");
    textDiv.style.fontSize = "200px";
    let size = 200;
//                var style = window.getComputedStyle(textDiv, null).getPropertyValue('font-size');
//                var fontSize = parseFloat(style);
    while (document.body.clientHeight > window.innerHeight)
    {
        size = size - 5;
        textDiv.style.fontSize = (size) + "px";
    }
    while (dynamicDiv.scrollWidth > document.body.clientWidth)
    {
        size = size - 5;
        textDiv.style.fontSize = (size) + "px";
    }
};

function getLiveText()
{
    let livetext;
    livetext = new XMLHttpRequest();
    livetext.onreadystatechange = function ()
    {
        if (livetext.readyState === 4 && livetext.status === 200)
        {
            if (livetext.responseText != currentText) {
                document.getElementById("child").innerHTML = livetext.responseText;
            }

        }
    }
    livetext.open("GET", "http://localhost:1111/livetext", true); // livetext
    livetext.timeout = 4000;
    livetext.ontimeout = function () {
        document.getElementById("child").innerHTML = "";
    }
    livetext.send();
};

function runIt() {
    const queryURL = "http://localhost:1111/lyrics";

    // $.get(queryURL, function (data) {
    //     console.log(data);
    // });
    // console.log(queryURL);
    // xmlhttp.open("GET", queryURL, true);
    // console.log(xmlhttp);
    // xmlhttp.timeout = 4000;
    // xmlhttp.ontimeout = function () {
    //     document.getElementById("child").innerHTML = "";
    // }
    // xmlhttp.send();
    // Calling Ajax
    $.ajax({
        url: queryURL, 
        method: "GET",
        dataType: "xml",

        error: function (e) {
        //     alert("An error occurred while processing XML file");
            console.log("XML reading Failed: ", e);
        },
    }).done(function(response) {
        console.log(response);
    });
};

theWhole();
// })