$(function() {

    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyCYkK09jL1mtsfaVCCM-p1QI9CVHx89tNo",
    authDomain: "fridgeforager-40b0c.firebaseapp.com",
    databaseURL: "https://fridgeforager-40b0c.firebaseio.com",
    projectId: "fridgeforager-40b0c",
    storageBucket: "fridgeforager-40b0c.appspot.com",
    messagingSenderId: "709178750655"
    };
    firebase.initializeApp(config);
    
    var database = firebase.database();

    // var ref = firebase.database().ref();
    // ref.once('recipe')
    //  .then(function (snap) {
    //  console.log(snap)
    //  });

    var id = "";

    database.ref('recipe').once("value", function(snapshot) {
        recipeId = snapshot.val();
        console.log(recipeId)
        displayRecipe(recipeId);
    });

    function displayRecipe(x) {

        var queryURL = "http://api.yummly.com/v1/api/recipe/" + x + "?_app_id=32912019&_app_key=210449776997cc0adaf6fb150addc070";

        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            console.log(response)
            
            var imageDiv = $("<div>");
            var nameDiv = $("<div>");
            var ingredientsDiv = $("<div>");
            var recipeDiv = $("<div>");
            var name = $("<h2>").text(response.name);
            var image = $("<img>").attr("src", response.images["0"].hostedLargeUrl);
//New Changes
            var ingredients = $("<h4>").text(response.ingredientLines);
            var recipe = $("<a>").text("go to recipe").addClass("link").attr("link", response.attribution.url);

            nameDiv.append(name);
            $(".name").append(nameDiv);
            imageDiv.append(image);
            $(".image").append(imageDiv);
            ingredientsDiv.append(ingredients);
            $(".ingredients").append(ingredientsDiv);
            recipeDiv.append(recipe);
            $(".recipe").append(recipeDiv);


//Old changes
            var ingredients = $("<div>");//.text(response.ingredientLines);
            var recipe = $("<button>").text("go to recipe").addClass("link").attr("link", response.attribution.url);
            id = response.id;
            var ingredientString = response.ingredientLines;
            console.log(ingredientString);
        
          // }
           // 
           // console.log(wordSplit);

           for(var i = 0; i < response.ingredientLines.length; i++) {
           var ingredient = $("<h5>").text("- " + response.ingredientLines[i]);
               ingredients.append(ingredient); }

               
        
          
            detailsDiv.append(name, image, ingredients, recipe);
            $(".details").append(detailsDiv);


        
        
        });
    }

    $(document.body).on("click", ".link", function() {

        var link = $(this).attr("link");
        console.log(link)
    
    
        // var state = $(this).attr("state");
        // console.log(state);
    
        // if (state === "still") {
        //     var animateUrl = $(this).attr("animate");
        //     $(this).attr("src", animateUrl);
        //     $(this).attr("state", "animate");
        // } else if (state === "animate") {
        //     var stillUrl = $(this).attr("still");
        //     $(this).attr("src", stillUrl);
        //     $(this).attr("state", "still");
        // }
        window.location = link;
    
    
    });

        // var winner = snapshot.child("winner").val();
        // if (winner === 0) {
        //     //update html for tie
        //     console.log("tie")
        // } else {
        //     console.log(winner)
        //     var loser = (winner === 1) ? 2 : 1;
        //     console.log(loser)
        // }
    console.log(id)
});