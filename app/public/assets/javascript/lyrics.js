let xmlhttp;
let currentText = "";
let lyricsText = "";

function theWhole() {
    setInterval(function () {
        runIt();
    }, 500);
};

function runIt() {
    const queryURL = "lyricsApi/lyrics";

    $.get(queryURL, function (data) {
        // console.log(data);
        if (lyricsText === data) {
            console.log("No change is good change");
        }
        else {
            lyricsText = data;
            console.log("Here are the lyrics:" + lyricsText);
            $("#liveLyrics").html(lyricsText);
        }
    });
    // Calling Ajax
    // $.ajax({
    //     url: queryURL, 
    //     method: "GET",
    //     dataType: "xml",

    //     error: function (e) {
    //     //     alert("An error occurred while processing XML file");
    //         console.log("XML reading Failed: ", e);
    //     },
    // }).done(function(response) {
    //     console.log(response);
    // });
};

theWhole();