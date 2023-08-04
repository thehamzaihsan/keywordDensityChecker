const conjunctions = [
  " and ",
  " but ",
  " or ",
  " yet ",
  " so ",
  " for ",
  " nor ",
  " after ",
  " although ",
  " as ",
  " because ",
  " before ",
  " if ",
  " since ",
  " though ",
  " unless ",
  " until ",
  " when ",
  " whereas ",
  " while ",
  " to ",
  " will ",
  " be ",
  " the ",
  " you ",
  " he ",
  " some ",
  " other ",
  " she ",
  " it ",
  " they ",
  " we ",
  " I ",
  " me ",
  " him ",
  " her ",
  " them ",
  " us ",
  " his ",
  " her ",
  " their ",
  " our ",
  " my ",
  " your ",
  " a ",
  " an ",
  " this ",
  " that ",
  " these ",
  " those ",
  " there ",
  " is ",
  " are ",
  " was ",
  " were ",
  " have ",
  " has ",
  " had ",
  " in ",
  " you ",
  " can ",
  " might ",
  " could ",
  " also ",
  " i ",
  " do ",
  " & ",
  "i ",
  " from ",
  " of ",
];

function check() {
  var totalElem;

  table = document.getElementById("freq_table");
  var sentence = document.getElementById("input-area").value;
  totalElem = sentence.trim().split(/\W+/).length;

  sentence = sentence.toLowerCase();

  for (let index = 0; index < conjunctions.length; index++) {
    sentence = sentence.replace(new RegExp(conjunctions[index], "g"), " ");
    sentence = sentence.replace("  ", " ");
    sentence = sentence.replace(".", "");
    sentence = sentence.replace("\n", " ");
    sentence = sentence.replace("\n\n", " ");
    sentence = sentence.replace("?", " ");
  }

  sortedFrequency = frequency(sentence);

  var percent = calcPercent(sortedFrequency, totalElem);

  drawTable(percent, sortedFrequency);
}

function calcPercent(sortedFrequency, totalElem) {
  var percent = {};
  for (let index = 0; index < sortedFrequency.length; index++) {
    percent[index] = ((sortedFrequency[index][1] / totalElem) * 100).toFixed(2);
  }

  console.log(percent, sortedFrequency);
  return percent;
}

function drawTable(percent, sortedFrequency) {
  table.innerHTML = " ";

  row = document.createElement("tr");
  table.appendChild(row);

  column1 = document.createElement("th");
  var KeywordText = document.createTextNode("Keyword");
  column1.appendChild(KeywordText);
  row.appendChild(column1);

  column2 = document.createElement("th");
  var CountText = document.createTextNode("Count");
  column2.appendChild(CountText);
  row.appendChild(column2);

  column3 = document.createElement("th");
  var PercText = document.createTextNode("Percentage");
  column3.appendChild(PercText);
  row.appendChild(column3);

  min = 20;
  if (sortedFrequency.length < min) {
    min = sortedFrequency.length;
  }
  console.log(min);
  for (let index = 0; index < min; index++) {
    row = document.createElement("tr");
    table.appendChild(row);

    column1 = document.createElement("td");
    var KeywordText = document.createTextNode(sortedFrequency[index][0]);
    column1.appendChild(KeywordText);
    row.appendChild(column1);

    column2 = document.createElement("td");
    var CountText = document.createTextNode(sortedFrequency[index][1]);
    column2.appendChild(CountText);
    row.appendChild(column2);

    column3 = document.createElement("td");
    var PercText = document.createTextNode(percent[index] + "%");
    column3.appendChild(PercText);
    row.appendChild(column3);
  }
}

function frequency(sentence) {
  const words = sentence.split(" ");
  const frequency = {};
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (frequency[word]) {
      frequency[word]++;
    } else {
      frequency[word] = 1;
    }
  }

  const sortedFrequency = Object.entries(frequency).sort((a, b) => b[1] - a[1]);

  return sortedFrequency;
}
