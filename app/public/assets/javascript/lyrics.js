// Create EventSource for the SSE from the Backend
const evtSource = new EventSource('/lowerthirdsserver');

let lyricsText = "";

// Main function that repeats ever 500ms
theWhole = () => {
    // setInterval(() => {
    //     runIt();
    // }, 500);
};

// // Open the EventListener for the SSE stream
// evtSource.addEventListener('open', (e) => {
//     console.log("Stream is Live");
// }, false);

// // How we are going to handle SSE messages from the backend
// evtSource.addEventListener('message', (e) => {
//     console.log('Received a message:', e.data);
//     const messageData = e.data;

//     console.log(messageData);
//         // Checking if our latest data is the same as what we already have
//         if (lyricsText === messageData) {
//             console.log("No change is good change");
//         }
//         // Proceed if data is different than what is currently set
//         else {
//             // FadeOut if the newest data is empty
//             if (messageData === "") {
//                 $("#liveLyrics").fadeOut(300, () => {
//                     $(this).empty().show();
//                 });
//                 lyricsText = messageData;
//             }
//             // Proceed if newest data isn't empty
//             else {
//                 // Update and FadeIn if #liveLyrics div is empty
//                 if (lyricsText === "") {
//                     lyricsText = messageData;
//                     $("#liveLyrics").hide();
//                     $("#liveLyrics").html(lyricsText);
//                     $("#liveLyrics").fadeIn(300, () => {
//                         console.log(this);
//                     });
//                 }
//                 // Update #liveLyrics div with newest data
//                 else {
//                     lyricsText = messageData;
//                     console.log("Here are the lyrics:" + lyricsText);
//                     $("#liveLyrics").html(lyricsText);
//                 }
//             }
//         }

// }, false);

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
                $("#liveLyrics").fadeOut(300, () => {
                    $(this).empty().show();
                });
                lyricsText = messageData;
            }
            // Proceed if newest data isn't empty
            else {
                // Update and FadeIn if #liveLyrics div is empty
                if (lyricsText === "") {
                    lyricsText = messageData;
                    $("#liveLyrics").hide();
                    $("#liveLyrics").html(lyricsText);
                    $("#liveLyrics").fadeIn(300, () => {
                        console.log(this);
                    });
                }
                // Update #liveLyrics div with newest data
                else {
                    lyricsText = messageData;
                    console.log("Here are the lyrics:" + lyricsText);
                    $("#liveLyrics").html(lyricsText);
                }
            }
        }

};

// // Function to connect to Quelea Lyrics API
// runIt = () => {
//     const queryURL = "lyricsApi/lyrics";

//     // Calling Ajax
//     $.ajax({
//         url: queryURL, 
//         method: "GET",

//     }).done((data) => {
//         console.log(data);

//         // Checking if our latest data is the same as what we already have
//         if (lyricsText === data) {
//             console.log("No change is good change");
//         }
//         // Proceed if data is different than what is currently set
//         else {
//             // FadeOut if the newest data is empty
//             if (data === "") {
//                 $("#liveLyrics").fadeOut(300, () => {
//                     $(this).empty().show();
//                 });
//                 lyricsText = data;
//             }
//             // Proceed if newest data isn't empty
//             else {
//                 // Update and FadeIn if #liveLyrics div is empty
//                 if (lyricsText === "") {
//                     lyricsText = data;
//                     $("#liveLyrics").hide();
//                     $("#liveLyrics").html(lyricsText);
//                     $("#liveLyrics").fadeIn(300, () => {
//                         console.log(this);
//                     });
//                 }
//                 // Update #liveLyrics div with newest data
//                 else {
//                     lyricsText = data;
//                     console.log("Here are the lyrics:" + lyricsText);
//                     $("#liveLyrics").html(lyricsText);
//                 }
//             }
//         }

//     // Catch any errors that occur
//     }).catch((error) => {
//         console.log(error);
//     });
// };

// Run the whole process
theWhole();