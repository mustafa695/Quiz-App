let count = 0;
let getData = [];
let ansArr = [];
let score = 0;

function startQuiz() {
  var inputQues = prompt('Enter Numebr of Questions:');

  var checkValid = Number(inputQues);
  console.log(checkValid);
  if (checkValid.toString() === 'NaN') {
    alert('Sorry.. Please Use Number');
  } else {
    let api = `https://opentdb.com/api.php?amount=${inputQues}&category=15&difficulty=easy&type=multiple`;

    getapi(api);

    document.querySelector('#startQuiz').style.display = 'none';

    document.querySelector('.container').style.display = 'block';
  }
}

async function getapi(url) {
  const response = await fetch(url);

  let data = await response.json();
  console.log(data);
  getData = data;

  fetching();
}
// Calling that async function

function randomQues() {
  var radiores = document.getElementsByName('optradio');
  
  let cond = false;
  for (let i = 0; i < radiores.length; i++) {
    if (radiores[i].checked) {
      cond = true;
    }
  }

  if (cond) {
    fetching();

    //   reset radio buttons
    for (var r1 = 0; r1 < radiores.length; r1++) {
      radiores[r1].checked = false;
    }
  } else {
    alert('Please select option');
  }
} //random ques

function fetching() {
  var radio = document.getElementsByName('optradio');

  for (r = 0; r < radio.length; r++) {
    if (radio[r].checked) {
      var radioValue = radio[r].value;

      if (radioValue == getData.results[count - 1].correct_answer) {
        score = score + 5; //correct ans
      } else {
        if (score > 0) {
          score = score + 0; //incorrect Answer
        } else {
          score;
        }
      }
    }
  }

  //printing score
  document.getElementById('score').innerHTML = 'Score: ' + ' ' + score;

  setTimeout(() => {
    if (count < getData.results.length) {
      count++;
    } else {
      count = 0;
    }

    if (count == getData.results.length) {
      var container = document.querySelector('.container');

      var submitBtn = document.createElement('button');
      submitBtn.setAttribute('id', 'submitBtn');
      submitBtn.innerHTML = 'Submit';

      container.appendChild(submitBtn);
      //hide nex button
      document.getElementById('nextBtn').style.display = 'none';

      //after submit button
      submitBtn.addEventListener('click', function () {
        document.querySelector('#ques').style.display = 'none';
        var container = document.querySelector('.container');
        var div = document.createElement('div');
        div.setAttribute('class', 'card');

        var mainHead = document.createElement('h2');
        container.appendChild(div);
        div.appendChild(mainHead);

        var subHead = document.createElement('h5');
        div.appendChild(subHead);

        mainHead.innerHTML = 'Quiz Ended' + ' ' + 'With Result';
        subHead.innerHTML = 'Your Total Score: ' + ' ' + score;

        var subHead2 = document.createElement('h5');
        div.appendChild(subHead2);
        var correctAns = (score / 5) * 1;
        subHead2.innerHTML = 'Correct Answers is: ' + ' ' + correctAns;
        document.querySelector('#submitBtn').style.display = 'none';
      }); //end submit btn
    }
    console.log(count);
    // console.log(getData.results.length,'array lenght')
  }, 400);

  var getQno = count + 1;
  document.querySelector('#qNO').innerHTML = 'Question No' + ' ' + getQno;

  document.querySelector('#par').innerHTML = getData.results[count].question;
  document.getElementById('choice1').value =
    getData.results[count].incorrect_answers[2];
  document.getElementById('choice2').value =
    getData.results[count].incorrect_answers[0];
  document.getElementById('choice3').value =
    getData.results[count].incorrect_answers[1];
  document.getElementById('choice4').value =
    getData.results[count].correct_answer;

  document.getElementById('radioVal').innerHTML =
    getData.results[count].incorrect_answers[2];
  document.getElementById('radioVal2').innerHTML =
    getData.results[count].incorrect_answers[0];
  document.getElementById('radioVal3').innerHTML =
    getData.results[count].incorrect_answers[1];
  document.getElementById('radioVal4').innerHTML =
    getData.results[count].correct_answer;
}
