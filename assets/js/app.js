// Starts a query when the "Search" button is clicked
$("#js-btn-search").on("click", function () {
    var keyword = $("#js-input-search").val().trim()
    $("#js-input-search").val("")

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=1CDZF2AkHAO8FPwY0r3kQm6bmxI7Vuk5&keyword=" + keyword + "&locale=*&includeSpellcheck=yes"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
        var searchData = res._embedded
        console.log(res)
        console.log(searchData)

        // Clears old search results
        $("#js-results").empty()

        // Creates cards for each matching result
        for (let i = 0; i < searchData.events.length; i++) {
            var newCard = $("<div class='col-12 col-md-6 col-lg-3'>").append(
                $("<a href='#' class='card-link' data-event-id='" + searchData.events[i].id + "'>").append(
                    $("<div class='card'>").append(
                        $("<img src='" + searchData.events[i].images[0].url + "' alt='" + searchData.events[i].name + "' class='card-img-top'>"),
                        $("<div class='card-body'>").append(
                            $("<h5 class='card-title'>").text(searchData.events[i].name),
                            $("<p class='card-text'>").text(searchData.events[i].dates.start.localDate),
                            $("<p class='card-text'>").text(searchData.events[i]._embedded.venues[0].name)
                        )
                    )
                )
            )

            $("#js-results").append(newCard)
        }
    })
})