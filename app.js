
$(document).ready(function() {
    //Array to add searches to
    var topics = [];
    
        //Funnction that will call for Ajax, sets parameters, and establishes the search result limit as well
         function displayComedian() {
    
        var comedian = $(this).data("search");
        console.log(comedian);

    // URL variable that has API link and will change relative to the comedian being searched
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comedian + "&api_key=PXoDg8kPrHDsjoU1UNvfGgJ9e4lRwedr&limit=10";
        console.log(queryURL);
    
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          
  
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                
                var comicsDiv = $("<div class='col-md-4'>");
    
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var comicsImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                comicsImage.attr("src", staticSrc);
                comicsImage.addClass("Giphy");
                comicsImage.attr("data-state", "still");
                comicsImage.attr("data-still", staticSrc);
                comicsImage.attr("data-animate", defaultAnimatedSrc);
                comicsDiv.append(p);
                comicsDiv.append(comicsImage);
                $("#gifArea").prepend(comicsDiv);
    
            }
          });
        
    }
    
      //Creating a click event that takes search term being input, pushes it to the array, and then displays button
        $("#addComic").on("click", function(event) {
          console.log(this);
            event.preventDefault();
            var newcomic = $("#comedianInput").val().trim();
            topics.push(newcomic);
            console.log(topics);
            $("#comedianInput").val('');
            displayButtons();
          });
    
      //Function that goes through array and displays searched term in  "presetButtons" section 
        function displayButtons() {
        $("#presetButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "comic");
          a.attr("data-search", topics[i]);
          a.text(topics[i]);
          $("#presetButtons").append(a);
        }
      }
    
      
      displayButtons();
      
    
      //Click event that executes displayComedian function
      $(document).on("click", "#comic", displayComedian);

      
    
      //Click event that executes pausePlayGifs function
      $(document).on("click", ".Giphy", pausePlayGifs);
    
      //Function we used in class. Uses the "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
   
      
    }
});  

// would ideally add a function to clear out the content each time one of the display buttons is clicked
// would be something like $(#gifArea).empty() but couldn't get the logic to work without clearing out the area permanently