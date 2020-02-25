let lyricsText = "";

// Main function that repeats ever 500ms
theWhole = () => {
    setInterval(() => {
        runIt();
    }, 500);
};

// Function to connect to Quelea Lyrics API
runIt = () => {
    const queryURL = "rcApi/lyrics";

    // Calling Ajax
    $.ajax({
        url: queryURL, 
        method: "GET",
        // dataType: "xml",

    }).done((data) => {
        console.log(data);

        // let lyricsDiv = document.getElementById("liveLyrics");

        // if (data !== null) {
        //     if (data === "") {
        //         // lyricsDiv.style.opacity = "0";
        //         $("#liveLyrics").css("opacity", "0");
        //     }
        //     else {
        //         if (lyricsText === data) {
        //         console.log("No change is good change");
        //         // lyricsDiv.style.opacity = "1";
        //         $("#liveLyrics").css("opacity", "1");
        //         }
        //         // else if (lyricsDiv.innerhtml === "") {
        //         else if ($("#liveLyrics").html() === "") {
        //             // lyricsDiv.style.opacity = "0";
        //             $("#liveLyrics").css("opacity", "0");
        //             setTimeout(() => {
        //                 lyricsText = data;
        //                 $("#liveLyrics").html(lyricsText);
        //                 // lyricsDiv.style.opacity = "1";
        //                 $("#liveLyrics").css("opacity", "1");
        //             }, 300);
        //         }
        //         else {
        //             lyricsText = data;
        //             console.log("Here are the lyrics:" + lyricsText);
        //             $("#liveLyrics").html(lyricsText);
        //             // lyricsDiv.style.opacity = "1";
        //             $("#liveLyrics").css("opacity", "1");
        //         }
        //     }
        // }

        if (lyricsText === data) {
            console.log("No change is good change");
        }
        else {
            lyricsText = data;
            console.log("Here are the lyrics:" + lyricsText);
            $("#stageLyrics").html(lyricsText);
        }

    }).catch((error) => {
        console.log(error);
    });
};

// Run the whole process
theWhole();