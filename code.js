array_1 = ["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe",
"backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake",
"calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello",
"cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch",
"cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon",
"dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye","eyeglasses","face","fan","feather","fence","finger",
"fire hydrant","fireplace","firetruck","fish","flamingo","flashlight","flip flops","floor lamp","flower","flying saucer","foot","fork","frog",
"frying pan","garden","garden hose","giraffe","goatee","golf club","grapes","grass","guitar","hamburger","hammer",
"hand","harp","hat","headphones","hedgehog","helicopter","helmet","hexagon","hockey puck","hockey stick","horse","hospital","hot air balloon",
"hot dog","hot tub","hourglass","house","house plant","hurricane","ice cream","jacket","jail","kangaroo","key","keyboard","knee",
"knife","ladder","lantern","laptop","leaf","leg","light bulb","lighter","lighthouse","lightning",
"line","lion","lipstick","lobster","lollipop","mailbox","map","marker","matches","megaphone","mermaid","microphone",
"microwave","monkey","moon","mosquito","motorbike","mountain","mouse","moustache","mouth","mug","mushroom","nail","necklace",
"nose","ocean","octagon","octopus","onion","oven","owl","paintbrush","paint can","palm tree","panda","pants","paper clip",
"parachute","parrot","passport","peanut","pear","peas","pencil","penguin","piano","pickup truck","picture frame","pig","pillow","pineapple",
"pizza","pliers","police car","pond","pool","popsicle","postcard","potato","power outlet","purse","rabbit","raccoon","radio","rain","rainbow",
"rake","remote control","rhinoceros","rifle","river","roller coaster","rollerskates","sailboat","sandwich","saw","saxophone","school bus",
"scissors","scorpion","screwdriver","sea turtle","see saw","shark","sheep","shoe","shorts","shovel","sink","skateboard","skull","skyscraper","sleeping bag","smiley face",
"snail","snake","snorkel","snowflake","snowman","soccer ball","sock","speedboat","spider","spoon","spreadsheet","square","squiggle",
"squirrel","stairs","star","steak","stereo","stethoscope","stitches","stop sign","stove","strawberry","streetlight","string bean","submarine",
"suitcase","sun","swan","sweater","swingset","sword","syringe","table","teapot","teddy-bear","telephone","television","tennis racquet",
"tent","The Eiffel Tower","The Great Wall of China","The Mona Lisa","tiger","toaster","toe","toilet","tooth","toothbrush","toothpaste","tornado",
"tractor","traffic light","train","tree","triangle","trombone","truck","trumpet","tshirt","umbrella","underwear","van","vase",
"violin","washing machine","watermelon","waterslide","whale","wheel","windmill","wine bottle","wine glass","wristwatch","yoga","zebra","zigzag"];

random_number = Math.floor((Math.random()*array_1.length)+1);

quick_draw_data_set_array = array_1[random_number];

console.log(quick_draw_data_set_array);

time_counter = 0;

timer_check = '';

drawn_sketch = '';

answer_holder = '';

score = '';

document.getElementById("sketch_required").innerHTML = 'Sketch to be drawn : ' + quick_draw_data_set_array;

function preload()
{
    classifier = ml5.imageClassifier('DoodleNet');
}

function update_Canvas()
{
    background("white");
    random_number = Math.floor((Math.random()*quick_draw_data_set_array.length)+1);
    console.log(quick_draw_data_set_array[random_number]);
    sketch = quick_draw_data_set_array[random_number];
    document.getElementById("sketch_required").innerHTML = 'Sketch to be drawn : ' + quick_draw_data_set_array;
}

function setup()
{
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

sketch = quick_draw_data_set_array[random_number];

function draw()
{
    check_sketch();
    if(drawn_sketch == sketch)
    {
        answer_holder = "set";
        score = score+1;
        document.getElementById("score").innerHTML = "Score = " + score;
    }
    strokeWeight(8);
    stroke(63);
    if(mouseIsPressed)
    {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas()
{
    classifier.classify(canvas, gotResults);
}

function check_sketch()
{
    time_counter++;
    document.getElementById("timer").innerHTML = "timer = " + time_counter;
    console.log(time_counter);
        if(time_counter > 500)
        {
            time_counter = 0;
            timer_check = "completed";
        }
        if(time_counter == "completed" / answer_holder == "set")
        {
            timer_check = "";
            answer_holder = "";
            update_Canvas();
        }
}

function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }else
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById('sketch_identified').innerHTML = "Your Sketch : " + drawn_sketch;

    document.getElementById('sketch_confidence').innerHTML = 'Confidence : ' + Math.round(results[0].confidence * 100) + '%';
}

function clear_Canvas()
{
    background("white");
}