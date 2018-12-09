var topics = ["The Big Bang Theory", "The King of Queens", "Impractical Jokers", "Wheel of Fortune", "Jeopardy", "Arrow", "The Batchelor", "The Flash", "Supergirl", "The Vampire Diaries", "Lost", "Gossip Girl", "Grimm", "Criminal Minds", "Family Feud", "The Office", "Stranger Things"]

function alertshowName() {

var showName = $(this).attr("data-name");

alert(showName)


};

function displayButtons(){

    $("#buttons-list").empty();

    for(var i = 0; i < topics.length; i++){

        var button = $("<button>");

        button.addClass("tvShow");

        button.attr("data-name", topics[i]);

        button.text(topics[i]);

        $("#buttons-list").append(button);
    }

};


// click function to add button to list
$("#add-tvShow").click(function(){
    event.preventDefault();

var tvShow = $("#tv-shows-input").val().trim();

topics.push(tvShow);

displayButtons();
});

// click function to add images to page

$(document).on("click", "button", function(){
    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=mZnqZ28lJztirSTZdUO73kfTc6kZ9uQ1&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

     console.log(queryURL);
     console.log(response);

     var results = response.data;

     for(var i = 0; i < results.length; i++){
         var showDiv = $("<div>");

         var p = $("<p>").text("Rating: " + results[i].rating);
         var p1 = $("<p>").text("Title: " + results[i].title);

         var showImage = $("<img>");

         showImage.attr("src", results[i].images.fixed_height_still.url);
         showImage.attr('data-animate', results[i].images.fixed_height.url);
         showImage.attr('data-state', "still");
         showImage.attr('data-still', results[i].images.fixed_height_still.url);
         showImage.addClass("showImage");

         showDiv.append(p);
         showDiv.append(p1);
         showDiv.append(showImage);

         $("#tvShow-expo").prepend(showDiv);

         console.log(results);
     }
    })
});


// funciton to play and pause gif

$(document).on("click", ".showImage", function(){
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

});

displayButtons();
