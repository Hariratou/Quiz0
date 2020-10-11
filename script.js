let category = document.getElementById('category');
let question = document.getElementById('question');
let vide = document.querySelectorAll('.vide');
let connaitreBonneReponse = document.getElementById('vrai');
let  connaitreMauvaiseReponse= document.getElementById('faux');
let check = document.getElementById ('check');
let btn = document.getElementById ('remove');
let vrai = 0;
let faux= 0;
let results;
let tru ;
let fals;
let answer;
let local = localStorage.getItem('vrai');
let local1 = localStorage.getItem('faux');


quiz();  

function quiz() {
   
   
fetch("https://opentdb.com/api.php?amount=1",)
.then(response => response.json())
.then(response => {
    
  question.innerHTML =  (response.results[0].question) ;
  category.innerHTML = (response.results[0].category);
  
 
  
 console.log(response.results[0]);
k = response.results[0].incorrect_answers.length > 1 ? 3 :1 ;
 if(k == 1){
    vide[2].innerHTML='';
    vide[3].innerHTML= '';
 }
 let l = 0 ;
 var rand = Math.round(Math.random() * k);
 for (var i = 0; i <= k; i++) {
    if (i == rand) {
        vide[i].innerHTML =`  
        <button type="button" class="  btn btn-info btn-lg  ">${response.results[0].correct_answer}</button>     `
    } else {
        vide[i].innerHTML =`
        <button type="button" class="  btn btn-info btn-lg ">  ${response.results[0].incorrect_answers[l]} </button>  `;
        l++ }
    }
    results = response.results[0];
    tru = results.correct_answer;
    fals = results.incorrect_answers;
    })
            
           
.catch(error => alert("Erreur : " + error));
}

vide.forEach((div) => { 
    div.addEventListener('click', (e) => {
        answer = e.target.textContent;
        e.target.style.backgroundColor = "#9fd32f";

    });

 });


function checkReponse(){

        if(answer == tru){
            vrai++;
            connaitreBonneReponse.textContent = vrai;
            quiz();
            save();
        }
        else{
            faux++;
            connaitreMauvaiseReponse.textContent = faux;
            quiz();
            save();
        }
}


function save(){
localStorage.setItem('vrai',  connaitreBonneReponse.textContent);
localStorage.setItem('faux', connaitreMauvaiseReponse.textContent);
};

if( connaitreBonneReponse.textContent !== 0 || connaitreMauvaiseReponse.textContent!== 0) 
{
    connaitreBonneReponse.textContent = local;
    connaitreMauvaiseReponse.textContent = local1;
}

function clearAll(){
    localStorage.clear()
    vrai = 0;
    faux = 0;
    connaitreBonneReponse.textContent = 0;
    connaitreMauvaiseReponse.textContent = 0;

}
check.addEventListener('click',checkReponse);
btn.addEventListener('click',clearAll)