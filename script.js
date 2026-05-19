
const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");

const questionImage = document.getElementById("questionImage");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");

const numbers = [4,5,6,7,8,9,10,11,12,13];

startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    nextQuiz();
});

function shuffle(array){
    return array.sort(() => Math.random() - 0.5);
}

function nextQuiz(){
    resultDiv.textContent = "";
    answersDiv.innerHTML = "";

    const correct = numbers[Math.floor(Math.random() * numbers.length)];

    questionImage.src = `assets/${correct}Q.jpeg`;

    let wrongs = numbers.filter(n => n !== correct);
    shuffle(wrongs);

    const choices = [correct, wrongs[0], wrongs[1]];
    shuffle(choices);

    choices.forEach(num => {
        const box = document.createElement("div");
        box.className = "answerBox";

        const img = document.createElement("img");
        img.src = `assets/${num}A.jpeg`;

        const mark = document.createElement("div");
        mark.className = "mark";
        mark.innerHTML = num === correct ? "◯" : "✕";

        box.appendChild(img);
        box.appendChild(mark);

        box.addEventListener("click", () => {
            const allMarks = document.querySelectorAll(".mark");

            allMarks.forEach(m => m.style.display = "none");

            if(num === correct){
                resultDiv.textContent = "◯ 正解";
                mark.style.display = "block";
                mark.classList.add("correct");
            }else{
                resultDiv.textContent = "✕ ハズレ";
                mark.style.display = "block";
                mark.classList.add("wrong");

                document.querySelectorAll(".answerBox").forEach((b, i) => {
                    if(choices[i] === correct){
                        b.querySelector(".mark").style.display = "block";
                        b.querySelector(".mark").classList.add("correct");
                    }
                });
            }

            document.querySelectorAll(".answerBox").forEach(b => {
                b.style.pointerEvents = "none";
            });

            setTimeout(() => {
                nextQuiz();
            }, 5000);
        });

        answersDiv.appendChild(box);
    });
}
