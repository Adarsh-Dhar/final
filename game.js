const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


let questions = [
    {
        question :"Built by the Border Roads Organization, which is the “highest altitude road” in the world, recognised by the Guinness World Records in 2021?",
    
    
        choice1: " Umling La Pass",
        choice2: " Zoji La Tunnel",
        choice3: " Rohtang Pass",
        choice4:" Lipulekh Pass",
        answer: 1,
    
      },

 
  {
    question :" Where did Perseverance rover successfully land in 2021?",


    choice1: " Mars",
    choice2: " Venus",
    choice3: " Jupiter",
    choice4:"Ganymede",
    answer: 1,

  },
  {
    question :"Abdel Fattah El-Sisi, who was the chief guest at the Republic Day parade in 2023, is the president of which country?",


    choice1: " Saudi Arabia",
    choice2: " Egypt",
    choice3: " Morocco",
    choice4:" Iran",
    answer: 2,

  },

  {
    question:"Dumalla, peta, and japi are traditional items worn on which body part in different regions in India?",
    choice1:"neck",
    choice2:"head",
    choice3:"arm",
    choice4:"legs",
    answer: 2,
  },
  {
    question:"Deposits of which element, an important component of batteries, have been discovered in large quantities in Reasi, Jammu and Kashmir in 2023?",
    choice1:"helium",
    choice2:"manganese",
    choice3:"titanium",
    choice4:"lithium",
    answer: 4,
  },
  {
    question:"Which tabla maestro was awarded the Padma Vibhushan in January 2023?",
    choice1:"Pandit Hariprasad Chaurasia",
    choice2:"Ustad Amjad Ali Khan",
    choice3:"Pandit Vishwa Mohan Bhatt",
    choice4:"Ustad Zakir Hussain",
    answer: 4,
  },
  {
    question:" Which god from Hindu scriptures lends his name to the Union government scheme launched in 2023 to help skilled artisans?",
    choice1:"Lord Vishwakarma",
    choice2:"Lord Dhanvantari",
    choice3:"Lord Kubera",
    choice4:"Karna",
    answer: 1,
  },
  {
    question:"Which two countries were devastated by major earthquakes in February 2023?",
    choice1:" Libra-Egypt",
    choice2:"Turkey-Syria",
    choice3:" Iran-Iraq",
    choice4:"Canada-USA",
    answer: 2,
  },
  {
    question:" Who is the director of the Hindi film Pathaan, which stars Shah Rukh Khan?",
    choice1:"  Ali Abbas Zafar",
    choice2:" Siddharth Anand",
    choice3:"  Kabir Khan",
    choice4:"  Shakun Batra",
    answer: 2,
    
  },
  {
    question:"Who was awarded the Oscar for the Best Original Song for “Naatu Naatu” along with MM Keeravani?",
    choice1:" Vairamuthu",
    choice2:"  Gulzar",
    choice3:" Chandrabose",
    choice4:" SS Rajamouli",
    answer: 3,
  },
 
  {
    question:"The red sandalwood or red sanders trees, shown in the film “Pusha: The Rise”, are endemic to which region of India?",
    choice1:"Western Ghats",
    choice2:"Sundarbans",
    choice3:"Eastern Ghats",
    choice4:" Doaba",
    answer: 3,
  },
  {
    question:"What name has been given to the 216-feet statue of Sri Ramanujacharya, unveiled in Hyderabad in February 2022?",
    choice1:"Statue of Unity",
    choice2:"Statue of Freedom",
    choice3:"Statue of Fraternity",
    choice4:"Statue of Equality",
    answer: 4,
  },
  {
    question:"The 2022 Oscar-nominated Indian documentary “Writing With Fire” tells the story of the women journalists of which rural newspaper?",
    choice1:"Khabar Lahariya",
    choice2:"Gaon Connection",
    choice3:"Akhand Jyoti",
    choice4:"Kadambini",
    answer: 1,
  },
  {
    question:"The Australian spin legend Shane Warne captained which team to an IPL championship title? ",
    choice1:"Rajasthan Royals",
    choice2:"Deccan Chargers",
    choice3:"Sunrisers Hyderabad",
    choice4:"Kolkata Knight Riders",
    answer: 1,
  },
  {
    question:"Which of these is common to the CEOs of Adobe, Google, IBM, Microsoft, and Twitter?",
    choice1:"Graduated from IITs",
    choice2:"Persons of Indian Origin",
    choice3:" Chess prodigies",
    choice4:"Acted in movies",
    answer: 2,
  },
];


//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});


incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};


startGame();