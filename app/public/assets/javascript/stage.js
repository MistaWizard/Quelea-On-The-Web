// Create EventSource for the SSE from the Backend
const evtSource = new EventSource('/stagesserver');

let lyricsText = "";

// Main function that repeats ever 500ms
theWhole = () => {
    // setInterval(() => {
    //     runIt();
    // }, 500);
};

// Listen for SSE messages and format them
evtSource.onmessage = (e) => {
    const messageData = e.data;

    console.log(messageData);
        // Checking if our latest data is the same as what we already have
        if (lyricsText === messageData) {
            console.log("No change is good change");
        }
        // Proceed if data is different than what is currently set
        else {
            // FadeOut if the newest data is empty
            if (messageData === "") {
                $("#stageLyrics").fadeOut(300, () => {
                    $(this).empty().show();
                });
                lyricsText = messageData;
            }
            // Proceed if newest data isn't empty
            else {
                // Update and FadeIn if #stageLyrics div is empty
                if (lyricsText === "") {
                    lyricsText = messageData;
                    $("#stageLyrics").hide();
                    $("#stageLyrics").html(lyricsText);
                    $("#stageLyrics").fadeIn(300, () => {
                        console.log(this);
                    });
                }
                // Update #stageLyrics div with newest data
                else {
                    lyricsText = messageData;
                    console.log("Here are the lyrics:" + lyricsText);
                    $("#stageLyrics").html(lyricsText);
                }
            }
        }

};

// // Function to connect to Quelea Lyrics API
// runIt = () => {

//     // login();

//     const queryURL = "rcApi/lyrics";

//     // Calling Ajax
//     $.ajax({
//         url: queryURL, 
//         method: "GET",

//     }).done((data) => {
//         console.log(data);

//         if (lyricsText === data) {
//             console.log("No change is good change");
//         }
//         else {
//             lyricsText = data;
//             console.log("Here are the lyrics:" + lyricsText);
//             $("#stageLyrics").html(lyricsText);
//         }

//     }).catch((error) => {
//         console.log(error);
//     });
// };

// Run the whole process
theWhole();