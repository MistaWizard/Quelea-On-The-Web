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

    }).done((data) => {
        console.log(data);

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