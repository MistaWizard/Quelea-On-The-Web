// let currentText = "";
// let lyricsText = "";

function theWhole() {
    setInterval(function () {
        runIt();
    }, 500);
};

function runIt() {
    const queryURL = "lyricsApi/lyrics";

    // $.get(queryURL, function (data) {
    //     // console.log(data);
    //     if (lyricsText === data) {
    //         console.log("No change is good change");
    //     }
    //     else {
    //         lyricsText = data;
    //         console.log("Here are the lyrics:" + lyricsText);
    //         $("#liveLyrics").html(lyricsText);
    //     }
    // });

    // Calling Ajax
    $.ajax({
        url: queryURL, 
        method: "GET",

    }).done(function(data) {
        console.log(data);

        let lyricsText = document.getElementById("liveLyrics");

        if (data !== null) {
            if (data === "") {
                lyricsText.style.opacity = "0";
            }
            else {
                if (lyricsText.innerHTML === "") {
                    lyricsText.style.opacity = "0";
                    setTimeout(() => {
                        lyricsText.innerHTML = data;
                        lyricsText.style.opacity = "1";
                    }, 200);
                }
                else if (lyricsText.innerHTML = data) {
                    console.log("No change is good change");
                    lyricsText.style.opacity = "1";
                }
                else {
                    lyricsText.innerHTML = data;
                    lyricsText.style.opacity = "1";
                }
            }
        }
        // if (lyricsText === data) {
        //     console.log("No change is good change");
        // }
        // else {
        //     lyricsText = data;
        //     console.log("Here are the lyrics:" + lyricsText);
        //     $("#liveLyrics").html(lyricsText);
        // }

    }).catch(function(error) {
        console.log(error);
    });
};

theWhole();