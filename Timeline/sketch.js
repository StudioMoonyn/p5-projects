//GLOBALS
let infoBoxes = [
  {
    title: '8,000 - 7,000 B.C.E (1,000 years)',
    text: 'An energy being descends from the heavens, calling itself Atmu. It begins experimenting with its powers. It starts creating simple beings with simple minds, then moves on to more complex creatures. Eventually, Atmu creates three stable beings: the Theoni, the canidera, and the ayvions.'
  },
  {
    title: '7,000 - 7,500 B.C.E (500 years)',
    text: 'Atmu perfects the ayvions, the final munikin child, and then steps back to observe the various communities from afar.'
  },
    {
    title: '7,500 - 6,900 B.C.E (600 years)',
    text: 'The munikin tribes struggle to survive without their creator. Chandrii, the youngest Ayvion born of Atmu and a human mother, is forced from her home by humans. [Novella: Atmu\'s Children]'
  },
      {
    title: '6,900 - 6,700 B.C.E (200 years)',
    text: 'Atmu roams the world, learning from humans and animals. Realizing its influence has caused irreparable shifts—giving rise to the shée, an unintended being born simply of Atmu’s residual energy—it decides to return to its children to teach them balance.'
  },
        {
    title: '6,700 - 6,750 B.C.E (50 years)',
    text: 'Upon returning, Atmu finds only one united tribe remaining. Humans have nearly destroyed the munikin, though they have also nearly destroyed each other.'
  },
    {
    title: '6,750 - 5,500 B.C.E (1,250 years)',
    text: 'Atmu resumes guiding its children but struggles with the consequences of its interference. Inspired by the invention of human writing, Atmu creates the Muniotus Teachings and entrusts them to various munikin scholars. It also creates Aldeberan, a griffin-like shée, to guide the munikin after its departure. [Short Story: Sunstrider]'
  },
    {
    title: '5,500 - 4,550 B.C.E (950 years)',
    text: 'Atmu completes the Muniotus Teachings and appoints interpreters from the seven tribes. The Presence leaves Earth in 4551 B.C., leaving behind energy for the munikin to live indefinitely.'
  },
    {
    title: '4,552 - 3,950 B.C.E (602 years)',
    text: 'The munikin squabble over the teachings, and corruption spreads within the collective overseeing their compliance. Shée are condemned and controlled during this period. [Short Story: Under Atum\'s Shroud]'
  },
    {
    title: '3,950 - 1,200 B.C.E (2,750 years)',
    text: 'A turbulent era marked by wars over land and the emergence of magic through runewriting. The original Muniotus Teachings are lost, resurfaced, and rewritten multiple times. The seeds of the radical religious group, the Remembrance, are sown. [Novella: The Founder\'s Eyes]'
  },    
  {
    title: '1,000 - 700 B.C.E (500 years)',
    text: 'The war ends with the creation of the Hole to Nothing. Aldebaran is subdued, and the Theoni begin researching ways to separate from Earth, eventually launching the first floating city.'
  },
   {
    title: '650 - 248 B.C.E (3 years)',
    text: 'The ayvions, angered by the Theoni\'s actions, create seven pillars to stabilize the world and flood the Hole to Nothing with an alternate universe, forming a paracosm.'
  },
  {
    title: '249 - 239 B.C.E (10 years)',
    text: 'The Breaking of the Worlds occurs, splitting the ayvions from this universe and diminishing magic in both worlds. A shée named Numa makes a pact with a canidera acolyte to combat monsters born from corrupted magic. [Novella: Everlasting]'
  },
  {
    title: '238 B.C.E - 2012 C.E.',
    text: 'The munikin integrate into human society, with their teachings becoming a minority religion. The canidera thrive due to their ability to blend in, while the Theoni and ayvions face population challenges.'
  },
    {
    title: 'Near-Future Earth',
    text: '[Synchronicity] \nSynchronicity marks a pivotal moment where Hitori learns of Aydryn Holvt\'s manipulations to merge Earth with Xenophon. As magic weakens, Aydryn seeks to destroy the seven pillars separating the worlds. Atmu returns, intending to destroy its children. Hitori, Cor, and Numa confront their creator, leading to the collapse of both worlds into one.'
  },
    {
    title: 'Post-Modern Era',
    text: 'Hitori, Cor, and their allies rebuild the world, spending their extended lifespans mending the fabric of reality torn by the merging of worlds.'
  },
  {
    title: 'Mirage',
    text: 'Set long after Synchronicity, Mirage tells the story of a civil war among the Theoni. Two lovers seek reconciliation and guidance from Hitori and Cor. Hitori mentors Aydin, recognizing his magical potential, and together with Halifax, they embark on a journey to repair the remaining tears in reality.'
  }
];

function preload() {
  // Replace with the path to your image
  bgImage = loadImage('StarrySky.jpg'); 
}

let currentIndex = 0; // sets initial info array to 0
let pointsCount = infoBoxes.length;//sets the points count to full length of the infobox array

//empty arrays for animation and responsiveness of timeline points
let circleSizes = []; 
let tickHeights = [];
let labelOffsets = [];

// timeline sliding animation variables
let offsetX = 0;       // current offset
let targetOffsetX = 0; // slide offset
let spacing;           // distance between points

// Sets arrow baseSize
let prevArrowSize = 55;
let nextArrowSize = 55;

//sets variables for the infobox deminsions to allow for dynamic sizing
let boxX, boxY, boxW, boxH; 

let dynamicBoxBottom = 0; // <-- declare globally at the top of your sketch

let scrollOffset = 0;

//GLOBAL HELPERS

// adjusts spacing for the timeline points based on window width
function calculateSpacing() {
  spacing = width * 0.19; 
}

// sets a base size of 2% of window width for text elements to dynamically grow and shrink
function updateBaseSize() {
  baseSize = min(width, height) * 0.02; 
}

//takes the index of the point array(s)
function centerOn(index) { 
  let centerScreen = width / 2; //centers the screen by dividing the window width by 2
  let pointX = index * spacing; //takes the number of the point in the index and multiplies it by the variable width of the window
  targetOffsetX = centerScreen - pointX; //sets the center of the screen, then subtracts the variable width of the window 
}

// sets a min and max value limit for resizing. Ensures items dont get too tiny or too large.
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

//counts estimated text lines to ensure text fits with infoBox and the text wraps accurately and dynamically
function getWrappedLineCount(text, maxWidth) {

let words = text.split(' '); //splits the text data into a string array
let line = ''; //empty string to be filled
let lineCount = 1; //start with 1 line

for (let w of words) { //loops through the split up word array
  let testLine = line + w + ' '; //assigns values to be placed in the empty string. Temporary computation
  if (textWidth(testLine)> maxWidth) { //measures how many pixels wide the text WOULD be based on the calculated testLine and compares it to the box width + padding
    line = w + ' '; //if the test line width is larger than the boxwidth, start an empty string
    lineCount++; //increase the text line height
  } else {
    line = testLine; //if the text fits on the line, print it
  }
}
   return lineCount;
}

//VERY IMPORTANT FUNCTION FOR DYNAMIC RESIZING

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateBaseSize(); //calculates the base size of all items. If not called twice, affects sizes when window resizes.
  calculateSpacing();//recalculates the point spacing with window size. If not called twice, affects point spacing when window resizes.
  centerOn(currentIndex); //sets the center point as selected. If not called twice, breaks on window resize centering of timeline points.
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);//sets canvas to resize to window size for dynamic responsiveness
  
  updateBaseSize(); // calculate responsive baseSize. Sets the base calc 
  calculateSpacing();//recalculates the point spacing with window size. Sets the base calc
  
  //loop for points on the timeline, calculates their sizes based on window size
  for (let i = 0; i < pointsCount; i++) { 
    circleSizes[i] = baseSize;     
    tickHeights[i] = baseSize * 1.2;
    labelOffsets[i] = 5;
    
    // make currentIndex look selected on page load
    if (i === currentIndex) {
      circleSizes[i] = baseSize * 2;
      tickHeights[i] = baseSize * 2;
    }
  }

  centerOn(currentIndex); //sets the center point as selected. Sets the base calc
  offsetX = targetOffsetX; //offsets the points based on currentIndex
}

function draw() {
  
  tint(255, 150); // opacity
  drawCoverImage(bgImage);
  noTint();
  push();
   translate(0, scrollOffset); // shift everything
  offsetX = lerp(offsetX, targetOffsetX, 0.1); //start, stop, amount. Calculates motion and speed between point sliding animation 
  displayLine(); //horizontal line in timeline. Must be drawn first so that the circles will be drawn on top.
  //timeline points. Add more here to add more points.
displayPoint(0, '8,000 - 7,000\nB.C.E'); 
displayPoint(1, '7,000 - 7,500\nB.C.E');
displayPoint(2, '7,500 - 6,900\nB.C.E');
displayPoint(3, '6,900 - 6,700\nB.C.E');
displayPoint(4, '6,700 - 6,750\nB.C.E');
displayPoint(5, '6,750 - 5,500\nB.C.E');
displayPoint(6, '5,500 - 4,550\nB.C.E');
displayPoint(7, '4,552 - 3,950\nB.C.E');
displayPoint(8, '3,950 - 1,200\nB.C.E');
displayPoint(9, '1,000 - 700\nB.C.E');   
displayPoint(10, '650 - 248\nB.C.E');
displayPoint(11, '249 - 239\nB.C.E');
displayPoint(12, '238 B.C.E -\n2012 C.E');
displayPoint(13, 'Near-Future\nEarth');
displayPoint(14, 'Post-Modern\nEra');
displayPoint(15, 'Mirage');
  startEndPoints("start");//sets start point
  startEndPoints("end");//sets end point
  startEndLabels("startLabel");
  startEndLabels("endLabel");
   
  displayArrow("prev");//sets prev arrow 
  displayArrow("next");//sets next arrow
  displayInfoBox(infoBoxes[currentIndex]); // show current infobox data from the infoboxes array within the box
 displayStaticBox();
    pop();
}

function mouseWheel(event) {
  scrollOffset -= event.delta; // scroll up/down
}

function drawCoverImage(img) {
  let canvasAspect = width / height;
  let imgAspect = img.width / img.height;
  
  let drawWidth, drawHeight;

  if (canvasAspect > imgAspect) {
    // Canvas is wider → match width, crop height
    drawWidth = width;
    drawHeight = width / imgAspect;
  } else {
    // Canvas is taller → match height, crop width
    drawHeight = height;
    drawWidth = height * imgAspect;
  }

  let x = (width - drawWidth) / 2;
  let y = (height - drawHeight) / 2;

  image(img, x, y, drawWidth, drawHeight);
}

function startEndLabels (side) {

let x;
let label;

if (side === "startLabel") {
  x = width * 0.05; //set start as dynamic width 5% of window
  label = 'Long\nAgo'; //sets empty variable as left symbol
} else if (side === "endLabel") {
    x = width * 0.95; //set end as dynamic width 95% of window
  label = 'To the\nPresent';
  }

let y = height * 0.1; // set dynamic height 8% from top
  
  let labelSize = clamp(width * 0.02, 10, 25); // clamps text at a min/max value for dynamic resizing
  textSize(labelSize); //sets the text size as clamped value
  stroke('black');
  strokeWeight(3);
  fill('white');
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
function startEndPoints(side) {
  let x; //set empty variable
  
  if (side === "start") {
    x = width * 0.05; //set start as dynamic width 5% of window 
  } else if (side === "end") {
    x = width * 0.95; //set end as dynamic width 95% of window
  }
  
  let y = height * 0.20; // set dynamic height 15% from top
  let size = min(width, height) * 0.03; //scale point sizes with dynamic width/height
  
  //draw circle
  noStroke();
  fill('white');
  ellipse(x, y, size, size);
  
  //draw verticle line
  stroke('white');
  strokeWeight(5);
  line(x, y * 1.2, x, y * 0.8);
}

function displayLine() {
  
  //draw main timeline
  stroke('white');
  strokeWeight(3);
  //these values adjust location. Starts (x) 5% from left and (y) 15% from top, ends (x) 95% from left and (y) 15% from top
  line(width * 0.05, height * 0.20, width * 0.95, height * 0.20);
}

//TIMELINE POINT FUNCTIONALITY 
//intakes the indexed data and the labels on the displayPoints

function displayPoint(index, label) {
  
  //sets the point x location based on variable animation demensions and the indexed points
  let x = index * spacing + offsetX;
  
  //y location stays the same as there is no y animation
  let y = height * 0.20;

  // --- Fade based on distance from center ---
  let baseSize = width * 0.02; // 2% of canvas width
  let centerScreen = width / 2; //sets the center of the screen at a variable width
  let distFromCenter = abs(x - centerScreen);//makes sure center screen is a positive while calculating the point offset and subtracting it from the center
  let minDist = width * 0.2; //sets the start of the fade at 20% from center
  let maxDist = width * 0.4;//sets the end of the fade at 40% from center
  
  //sets the actual fade by using a map function which remaps the distance between points to the opacity gradient within that distance
  let alphaCenter = map(distFromCenter, minDist, maxDist, 255, 0, true);

  // --- Fade near edges ---
  let fadeMargin = width * 0.05; // creates a dynamic margin based on 5% of dynamic screen width (for both left and right)
  let alphaEdge = 255; //sets the alpha at fully visible
  
  if (x < fadeMargin) { //when x = 0, aplhaEdge = 0 (invisible). When x = fadeMargin, alphaEdge = 255 (fully visible)
    alphaEdge = map(x, 0, fadeMargin, 0, 255, true); //maps the fade margin to the timeline location
  } else if (x > width - fadeMargin) { // base state of none faded areas
    alphaEdge = map(x, width - fadeMargin, width, 255, 0, true); //maps the fade margin to the dynamic width of the timeline
  }
  
  let alphaVal = min(alphaCenter, alphaEdge);//combines the two fade effects. takes the stronger fade value and ensures one overlaps the other. Ensures dynamic fading

  // Sets base sizes so that min and max sizes can be set based on window width and mouse hover
  let targetSize = baseSize;
  let targetTick = baseSize * 1.2;
  let targetLabelOffset = baseSize * 0.5; // base label offset

  // sets a clamp (min/max size) on the selected point so that they cannot grow too big or small based on window size
  if (index === currentIndex) {
    targetSize = clamp(baseSize * 2, baseSize * 1.5, baseSize * 5);
    targetTick = clamp(baseSize * 2.2, baseSize * 1.2, baseSize * 4);
  }

  //Adds a hover effect to non-selected points but uses the clamped base size so they cannot grow too big or small
  let hover = dist(mouseX, mouseY, x, y) < targetSize / 2;
  if (hover && index !== currentIndex) {
    targetSize = baseSize * 1.5;
    targetTick = baseSize * 1.8;
  }

  // uses the global size array to smoothly animate between the clamped target sizes
  circleSizes[index] = lerp(circleSizes[index], targetSize, 0.05);
  tickHeights[index] = lerp(tickHeights[index], targetTick, 0.1);
  labelOffsets[index] = lerp(labelOffsets[index], targetLabelOffset, 0.1);

  // --- Draw tick line ---
  stroke(255, alphaVal); // white but takes the alphaVal to fade
  strokeWeight(3);
  line(x, y - tickHeights[index], x, y); //line is tied to the point location defined by x and y.Uses the global tickheight array to hold the index point animation. the Y value of the end of the tick animates but the rest is mapped to the point

  // --- Draw circle ---
  
  if (index === currentIndex) {//draws the "selected" style circle
    fill(0, alphaVal); //fades
    stroke(255, alphaVal); //fades
    strokeWeight(3);
  } else { //otherwise, draws non-selected style circles
    fill(255, alphaVal); //fades
    noStroke();
  }
  ellipse(x, y, circleSizes[index], circleSizes[index]); //sets the position of the points based on the changing x and y values, then the size changes based on the clamped animation values that correspond to window size

  // --- Draw label ---
  
  let labelY = y - tickHeights[index] - 10;//updates the y position of the labels so it stays a consistent distance from the top of the tick whenever the screen resizes
  
  stroke(0, alphaVal);
  strokeWeight(1);
  fill(255, alphaVal);//fades
   let labelSize = clamp(baseSize, 10, 20); //clamps the label size at a max and min value
  textSize(labelSize);
  textAlign(CENTER, BOTTOM);
  text(label, x, labelY); //intakes the label declared on the displayPoint array in Draw, takes the variable x position based on index, and adjusts the y position based on the tick height

  // additional click check--not needed but seems to improve the user experience? makes points easier to click?
  if (mouseIsPressed && hover) {
    currentIndex = index;
    centerOn(currentIndex);
  }
}

function displayArrow(side) { //creading a parameter called "side" so that I don't have to write a second function for very similar interactions
  
  //sets empty variables to be filled
  let symbol;
  let centerX;
  let sizeRef;
  
  if (side === "prev") { //checks if the side is passed the string "prev" when the function is called
    symbol = '↢'; //sets empty variable as left symbol
    centerX = boxX - 40; // left side of box with a margin of 40px
    sizeRef = prevArrowSize; //sets base arrow size
  } else if (side === "next") { //this function takes only two parameters so else/if can set it. If the string "prev" is not passed, check if the string "next" is passed.
    symbol = '↣'; //sets empty variable as right arrow symbol
    centerX = boxX + boxW + 40; // right side of box with a margin of 40px
    sizeRef = nextArrowSize; //sets base arrow size
  }
  
  let centerY = boxY + boxH / 2; //sets the verticle center of the dynamic box
  
  textSize(sizeRef); //takes parameter sizeRef 
  let w = textWidth(symbol); //sets the width of the symbol as the hitbox size
  let h = sizeRef; //sets the sizeRef to the height of the symbol
  
  let hover;
  if (mouseX > centerX - w / 2 &&
      mouseX < centerX + w / 2 &&
      mouseY > centerY - h / 2 &&
      mouseY < centerY + h / 2) {//checks if mouse in near the center of the symbol/hitbox
    hover = true;
  } else {
    hover = false;
  }
  
  let targetSize; //hover animation range
  if (hover === true) {
    targetSize = 70; //changes to
  } else {
    targetSize = 55; //base 
  }
  
  if (side === "prev") { //sets if the string passed is prev, animate the base size to the target size with a 20% interval/speed
    prevArrowSize = lerp(prevArrowSize, targetSize, 0.2);
    textSize(prevArrowSize);//base size
  } else if (side === "next") { //sets if the string passed is "Next"
    nextArrowSize = lerp(nextArrowSize, targetSize, 0.2);
    textSize(nextArrowSize);
  }
  
  fill('white');
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  text(symbol, centerX, centerY); //text is the symbol with the center tied to the center of the dynamic text box
}

function displayInfoBox(box) {
  boxW = width * 0.6;
  boxX = (width - boxW) / 2;
  boxY = height * 0.25;

  
  // --- Title metrics ---
  let titleSize = clamp(width * 0.02, 18, 32);
  textSize(titleSize);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  let titleLineCount = getWrappedLineCount(box.title, boxW - 25);
  let titleLineHeight = textAscent() + textDescent();
  let titleHeight = titleLineCount * titleLineHeight;
  
  // --- Body metrics ---
  let bodySize = clamp(width * 0.02, 15, 24);
  textSize(bodySize);
  textAlign(LEFT, TOP);
  textStyle(NORMAL);
  let bodyLineCount = getWrappedLineCount(box.text, boxW - 25);
  let lineHeight = textAscent() + textDescent();
  let bodyHeight = bodyLineCount * lineHeight;
  
  // --- Box height ---
  boxH = 30 + titleHeight + bodyHeight + 55;

  // --- Draw box first ---
  noStroke();
  fill(0, 0, 0, 127); // semi-transparent black
  rect(boxX, boxY, boxW, boxH, 20);

  // --- Draw title ---
  textSize(titleSize);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  fill('white');
  text(box.title, boxX + 15, boxY + 20, boxW - 25);

  // --- Draw body text ---
  textSize(bodySize);
  textAlign(LEFT, TOP);
  textStyle(NORMAL);
  text(box.text, boxX + 15, boxY + 20 + titleHeight + 15, boxW - 25);
  
  dynamicBoxBottom = boxY + boxH;
}

function displayStaticBox() {
  let boxW = width * 0.8; 
  let boxX = (width - boxW) / 2;
 let boxY = dynamicBoxBottom + 50; // anchored to dynamic box

  // --- Title ---
  let title = "Munikin History Timeline";
  let titleSize = clamp(width * 0.028, 18, 28);
  textSize(titleSize);
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  let titleLineCount = getWrappedLineCount(title, boxW - 20);
  let titleLineHeight = textAscent() + textDescent();
  let titleHeight = titleLineCount * titleLineHeight;

  // --- Body ---
  let body = "The timeline offers an eagle's-eye view of the Munikiniverse. There are stories set in various eras of munikin history. The timeline helps comprehend the vast history of the people, from the decades they kept themselves hidden from humankind, to the years they integrated amongst humans, and beyond.";
  
  let bodySize = clamp(width * 0.02, 14, 22);
  textSize(bodySize);
  textAlign(LEFT, TOP);
  textStyle(NORMAL);

  let bodyLineCount = getWrappedLineCount(body, boxW - 20);
  let lineHeight = textAscent() + textDescent();
  let bodyHeight = bodyLineCount * lineHeight;

  // --- Box Height ---
  let boxH = 40 + titleHeight + bodyHeight + 20;

  // --- Draw Background ---
  stroke('white');
  strokeWeight(4);
  fill(0, 0, 0, 127); // 50% black
  rect(boxX, boxY, boxW, boxH);

  // --- Draw Title ---
  noStroke();
  textSize(titleSize);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  fill('white');
  text(title, boxX + 20, boxY + 20, boxW - 20);

  // --- Draw Body ---
  textSize(bodySize);
  textAlign(LEFT, TOP);
  textStyle(NORMAL);
  text(body, boxX + 20, boxY + 20 + titleHeight + 15, boxW - 20);
}

function mousePressed() {
  for (let i = 0; i < pointsCount; i++) { //loops through points array and increments up 
    let x = i * spacing + offsetX; //sets the loop i to move with spacing and point offset animation
    let y = height * 0.15; //y does not animate
    if (dist(mouseX, mouseY, x, y) < baseSize * 1.5) { //checks mouse location is near base size 
      currentIndex = i; //sets current index to the loop
      centerOn(currentIndex); //animates the selected point
      return; //returns the data
    }
  }

  // same loop for the points but uses the arrows instead
  let prevX = boxX - 40;
  let prevY = boxY + boxH / 2;
  if (mouseX > prevX - prevArrowSize/2 && mouseX < prevX + prevArrowSize/2 &&
      mouseY > prevY - prevArrowSize/2 && mouseY < prevY + prevArrowSize/2) {
    currentIndex = (currentIndex - 1 + infoBoxes.length) % infoBoxes.length;
    centerOn(currentIndex);
    return;
  }

  // Next arrow
  let nextX = boxX + boxW + 40;
  let nextY = boxY + boxH / 2;
  if (mouseX > nextX - nextArrowSize/2 && mouseX < nextX + nextArrowSize/2 &&
      mouseY > nextY - nextArrowSize/2 && mouseY < nextY + nextArrowSize/2) {
    currentIndex = (currentIndex + 1) % infoBoxes.length;
    centerOn(currentIndex);
    return;
  }

 
}