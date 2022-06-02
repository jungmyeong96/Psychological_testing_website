const main = document.querySelector("#main");
const qna = document.querySelector("#qna"); //document객체 안에 html이 들어있음.
const result = document.querySelector("#result");
const endPoint = 12;
let select = [];

/* id의 스타일값의 애니메이션이 css에서 정의한 동작(사라짐)을 1초동안 하게하는 함수 */
/*function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation  = "fadeOut 1s";
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    //main.style.display = "none";
    //qna.style.display = "block";
}*/
function calResult() {
    let pointArray = [
        { name : 'mouse', value: 0, key : 0 },
        { name : 'cow', value: 0, key : 1 },
        { name : 'tiger', value: 0, key : 2 },
        { name : 'rabbit', value: 0, key : 3 },
        { name : 'dragon', value: 0, key : 4 },
        { name : 'snake', value: 0, key : 5 },
        { name : 'horse', value: 0, key : 6 },
        { name : 'sheep', value: 0, key : 7 },
        { name : 'monkey', value: 0, key : 8 },
        { name : 'chick', value: 0, key : 9 },
        { name : 'dog', value: 0, key : 10 },
        { name : 'pig', value: 0, key : 11 }
    ]
    for (let i = 0; i < endPoint; i++) {
        let target = qnaList[i].a[select[i]];
        for (let j = 0; j < target.type.length; j++) {
            for (let k = 0; k < pointArray.length; k++) {
                if(target.type[j] === pointArray[k].name) {
                    pointArray[k].value += 1;
                }
            }
        }
    }

    var resultArray = pointArray.sort((a,b) => {
        if (a.value > b.value) {
            return -1;
        }
        if (a.value < b.value) {
            return 1;
        }
        return 0;
    })
    let resultword = resultArray[0].key;
    return resultword;

}

function setResult()
{
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    let resultImg = document.createElement('Img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
    qna.style.WebkitAnimation  = "fadeOut 1s";
    qna.style.animation  = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block"; //블록을 밖으로 뺄 경우 페이드인 적용안됨 비동기처리
        }, 450);
    }, 0);
    setResult();
}

function addAnswer(answerText, qIdx, idx) {
    let a = document.querySelector('.answerBox');
    let answer = document.createElement('button'); // <div> 에 button이라는 요소를 추가한 뒤, 해당 버튼에 스트링을 추가
    answer.classList.add('answerList'); //버튼에 클래스 설정 
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto'); //가운데 정렬
    answer.classList.add('fadeIn');
    a.appendChild(answer);
    answer.innerHTML = answerText;
    answer.addEventListener("click", function(){ //이게 꼭 이 위치여야하나?
        let children = document.querySelectorAll('.answerList');
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true; //동장하지않고 보이지 않게
            children[i].style.WebkitAnimation  = "fadeOut 0.5s";
            children[i].style.animation  = "fadeOut 0.5s";
            //children[i].style.display = 'none';
        }
        setTimeout(() => {
            select[qIdx] = idx; 
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 400)
        console.log(select);
        //goNext(++qIdx); 비동기 처리 때문에 위로 올라감
     }, false);
}

function goNext(qIdx) {
    if (qIdx === endPoint) {
        goResult();
        return ;
    }
    let q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q; //참조가 어떻게되는거지 같은 위치면 참조가되는건가
    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    let status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx + 1) + '%';
}

function begin() {
    if (select.length === 0) {
        main.style.WebkitAnimation  = "fadeOut 1s";
        main.style.animation  = "fadeOut 1s";
        setTimeout(() => {
            qna.style.WebkitAnimation = "fadeIn 1s";
            qna.style.animation = "fadeIn 1s";
            setTimeout(() => {
                main.style.display = "none";
                qna.style.display = "block"; //블록을 밖으로 뺄 경우 페이드인 적용안됨 비동기처리
            }, 450);
            let qIdx = 0;
            select = [];
            goNext(qIdx);
        }, 450);
   }
   else {
        result.style.WebkitAnimation  = "fadeOut 1s";
        result.style.animation  = "fadeOut 1s";
        setTimeout(() => {
            main.style.WebkitAnimation = "fadeIn 1s";
            main.style.animation = "fadeIn 1s";
            setTimeout(() => {
                result.style.display = "none";
                main.style.display = "block"; //블록을 밖으로 뺄 경우 페이드인 적용안됨 비동기처리
            }, 450);
            let qIdx = 0;
            select = [];
            goNext(qIdx);
        }, 450);
    }
} //fadeout -> qna.block -> fadein -> main.none