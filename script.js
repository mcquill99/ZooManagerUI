$(document).ready(function(){
    var animals =[["elephant-pic", "Assets/pen2-locked.png", "Assets/pen2.png", "Assets/elephant.png", true, 75, false, false, "#elephantSlider", "#elephantFeed", "#elephantSprinkler", 75, 0, '#elephantNum', '#elephantHeart'],
        ["giraffe-pic", "Assets/pen1-locked.png","Assets/pen1.png", "Assets/giraffe.png", true, 100,false, false, "#giraffeeSlider", "#giraffeFeed", "#giraffeSprinkler", 100, 0, '#giraffeNum', '#giraffeHeart'],
        ["turtle-pic", "Assets/pen3-locked.png", "Assets/pen3.png", "Assets/turtle.png", true, 170, false, false, "#turtleSlider", "#turtleFeed", "#turtleSprinkler", 170,0, '#turtleNum', '#turtleNum']];
    //name, pens locked and unlocked, animal, if locked, health,if dead,if sprinkler is on, row tags,original food value, and sprinkler run time
    var pen= "Assets/pen2-locked.png";
    var currentAnimal = animals[0];
    var sprinkler =["Assets/sprinkler4.png", "Assets/sprinkler3.png", "Assets/sprinkler2.png", "Assets/sprinkler.png"];
    var index = -1;
    var width = 120;
    var hungerBarID =["#elephantFoodBar", "#giraffeFoodBar", "#turtleFoodBar"];
    var pressed = false;

    function flipAnimals(){
        $('#animal1').css("transform", "scaleY(-1)");
        $('#animal2').css("transform", "scaleY(-1)");
        $('#animal3').css("transform", "scaleY(-1)");

        $('#animal1').css("animation-play-state", "paused");
        $('#animal2').css("animation-play-state", "paused");
        $('#animal3').css("animation-play-state", "paused");
    }

    function unflipAnimals(){
        $('#animal1').css("transform", "scaleY(1)");
        $('#animal2').css("transform", "scaleY(1)");
        $('#animal3').css("transform", "scaleY(1)");

        $('#animal1').css("animation-play-state", "running");
        $('#animal2').css("animation-play-state", "running");
        $('#animal3').css("animation-play-state", "running");
    }

    setInterval(function() {
        if(currentAnimal[12] > 0){
            index++;
            $(".sprinkler").attr("src", sprinkler[index]);
            $(".puddle").css("visibility","visible");

            if(index === 3){
                index = -1;
            }
        }
        else{
            index = -1;
            $(".sprinkler").attr("src", sprinkler[0]);
            $(".puddle").css("visibility","hidden");
        }


        for(let i = 0; i < 3; i++){
            $(hungerBarID[i]).css("width", (width * (animals[i][5] / animals[i][11])).toString() + "px");
            if(animals[i][5] < animals[i][11] - 20 && !pressed){
                $(animals[i][9]).removeClass("feed-button-depressed");
                $(animals[i][9]).addClass("feed-button");

            }
        }
        if(currentAnimal[6]){
            flipAnimals();
        }
        else{
            unflipAnimals();
        }
    }, 400);

    setInterval(function() {
        for(let animal of animals){
            if(animal[5] > 0){
                animal[5] = animal[5] - 1;
                animal[6] = false;

            }
            else{
                animal[6] = true;
            }
            if(animal[12] > 0){
                animal[12] = animal[12] - 1;
            }

            let val = $(animal[13]).val();
        }

    }, 1000);


    $(".animal-pic").mousedown(function(){
        // Change src attribute of image
        for (let animal of animals){
            if($(this).attr('id') === animal[0]){
                currentAnimal = animal;
                if(animal[4]){
                    pen = animal[1];
                }
                else{
                    pen = animal[2];
                }
                var newAnimal = animal[3];

            }
        }
        $(".pen").attr("src", pen);
        $(this).removeClass("animal-pic");
        $(this).addClass("animal-pic-depressed");

        for(let animal of animals){
            $(animal[8]).css("opacity", "0");
            $(animal[9]).css("visibility", "hidden");
            $(animal[10]).css("visibility", "hidden");
        }

        $(currentAnimal[8]).css("opacity", "1");
        $(currentAnimal[9]).css("visibility", "visible");
        $(currentAnimal[10]).css("visibility", "visible");

        if(currentAnimal[6]){
            flipAnimals()
        }

        $('#animal1').attr("src", newAnimal);
        $('#animal2').attr("src", newAnimal);
        $('#animal3').attr("src", newAnimal);

    });
    $(".animal-pic").mouseup(function(){
        $(this).removeClass("animal-pic-depressed");
        $(this).addClass("animal-pic");

    });

    $('.feed-button').mousedown(function(){
        pressed = true;
        $(this).removeClass("feed-button");
        $(this).addClass("feed-button-depressed");
        if(currentAnimal[5] <= currentAnimal[11] - 20){
            currentAnimal[5] = currentAnimal[5] + 20;
            $(currentAnimal[14]).toggle();
            $(currentAnimal[14]).css('animation-play-state', 'running');
            window.setTimeout(function() {
                $(currentAnimal[14]).css('animation-play-state', 'paused');
                $(currentAnimal[14]).toggle();
            }, 1000);
        }
    });

    $('.feed-button').mouseup(function(){
        pressed = false;
        if(currentAnimal[5] <= currentAnimal[11] - 20){
            $(this).removeClass("feed-button-depressed");
            $(this).addClass("feed-button");
        }
    });

    $('.sprinkler-button').mousedown(function(){
        let num = $(this).children().val();
        if(num !== 0){
            $(this).removeClass("sprinkler-button");
            $(this).addClass("sprinkler-button-depressed");
        }
        currentAnimal[7] = !currentAnimal[7];
        currentAnimal[12] = num;
    });

    $('.sprinkler-button').mouseup(function(){
        $(this).removeClass("sprinkler-button-depressed");
        $(this).addClass("sprinkler-button");
    });

    $(document).on("keypress", "input", function(e){
        if(e.which === 13){
            let num = $(this).val();
        if(num !== 0){
            $(this).parent().removeClass("sprinkler-button");
            $(this).parent().addClass("sprinkler-button-depressed");
        }
        currentAnimal[7] = !currentAnimal[7];
        currentAnimal[12] = num;
        }
    });

    $(document).on("keyup", "input", function(e){
        if(e.which === 13){
            $(this).parent().removeClass("sprinkler-button-depressed");
            $(this).parent().addClass("sprinkler-button");
        }
    });


    $('.slider').click(function(){
        currentAnimal[4] = !currentAnimal[4];
        if(currentAnimal[4]){
            $(".pen").attr("src", currentAnimal[1]);
        }
        else{
            $(".pen").attr("src", currentAnimal[2]);
        }
    })
});
