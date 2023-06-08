const express = require('express'); 
//node.js 웹 프레임워크인 Express모듈을 가져옴

const req = require('express/lib/request'); 
//express 라이브러리에서 request 모듈을 가져와 
//http요청을 처리하기위한 추가기능 제공

const fs = require("fs");  
//파일 시스템과 상호작용하는 방법을 제공하는 내장 Node.js모듈을 fs를 가져옵니다.

const nunjucks = require('nunjucks'); 
//JavaScript용 강력한 템플릿 엔진인 nunjucks 모듈을 가져옵니다.
// 템플릿과 변수를 사용하여 HTML 페이지를 동적으로 생성할 수 있습니다.

const router = express.Router();
//이 줄은 Express 라우터의 인스턴스를 생성하며,
// 이를 통해 경로를 별도로 정의한 다음 애플리케이션에서 사용할 수 있습니다.
const env = require('dotenv').config();

const app = express(); //이 줄은 Express 애플리케이션의 인스턴스를 만듭니다.

const multer = require('multer'); 
//이 줄은 주로 웹 애플리케이션에서 파일을 업로드하는 데 사용되는
// multipart/form-data 처리용 미들웨어인 multer 모듈을 가져옵니다.

const path = require('path'); // 이 줄은 파일 및 디렉토리 경로 작업을 위한 유틸리티를 제공하는 
//내장 Node.js 모듈 path를 가져옵니다.

app.set('port', process.env.PORT || 8000); 
//이 코드 라인은 Express 애플리케이션의 포트 번호를 설정합니다. 
//PORT 환경 변수가 정의된 경우 해당 값을 사용합니다. 그렇지 않으면 기본적으로 포트 '8000'이 됩니다.

app.set('view engine', 'html'); 
//Express에서 뷰 엔진은 템플릿과 데이터를 결합하여
//동적 웹 페이지를 렌더링할 수 있는 템플릿 엔진입니다. 뷰 엔진을 'html'로 설정하면
//HTML 파일을 뷰 렌더링을 위한 템플릿으로 사용하도록 Express를 구성하는 것입니다.

app.use(express.static('views'))
//app.use()는 애플리케이션의 요청 처리 파이프라인에
//미들웨어 기능을 추가하는 데 사용되는 Express 메서드입니다.

nunjucks.configure('views',{
    autoescape: true,
    express: app
}); //템플릿 엔진을 구성하기 위해 Nunjucks 모듈에서 제공하는 메서드입니다.


const max = []; //max라는 상수 변수를 선언하고 JavaScript에서 빈 배열로 초기화합니다.
const min = [];
const avg = [];

var array1 =[
[[], [], [], [], []],
[[], [], [], [], []], //이 코드는 array1을 빈 하위 배열이 있는 그리드와 같은 구조로 초기화합니다.
[[], [], [], [], []], //그리드에는 5개의 행이 있으며 각 행은 빈 하위 배열로 표시됩니다. 
[[], [], [], [], []], //이 구조는 그리드 기반 형식으로 데이터를 저장하고 조작하는 데 사용할 수 있습니다.
[[], [], [], [], []]
]; 


function array2(rows, columns){ //함수 내에서 new Array(rows) 구문을 사용하여 arr이라는 새 배열이 생성
    for (var i = 0; i < rows; i++) { //지정된 행 수와 동일한 길이로 외부 배열을 초기화합니다.
        arr[i] = new Array(columns)
    }
    return arr;
}
 var arr = array2(50,5); //이 코드 라인은 arr 변수를 array2()
  // 함수에 의해 생성될 가능성이 있는 2차원 배열로 초기화합니다.

 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
}) //storage 개체는 업로드된 파일을 루트 디렉터리('./')에 
   //저장하고 원래 파일 이름을 유지하도록 구성됩니다.

const upload = multer({ storage: storage });


let number;
let name;
let max2;
let min2;
let avg2;

app.get('', (req, res, next) => {
    res.sendFile(__dirname + '/index.html'); //실행 화면인 index.file을 화면에 출력
}) 
app.post('/as', upload.single('user'), (req, res, next) => {
    try {
        // 파일 읽어오기
        let data = fs.readFileSync('inputFile.txt', 'utf8');
  
        


 //최대 최소 평균 값을 구해주는 함수. 
 //number값에 따라 최대 최소 평균값을 max min avg에 각각 넣어줌.       
if (req.params.number == '0') {
    for (let i = 0; i < array1.length; i++) { //array1의 요소를 반복하는 for 루프를 초기화.
        max2 = Math.max.apply(null, array1[0][i]);
        min2 = Math.min.apply(null, array1[0][i]);
        avg2 = average(array1[0][i]);
        max.push(max2);
        min.push(min2);
        avg.push(avg2);
    }
} else if (req.params.number == '1') {
    for (let i = 0; i < array1.length; i++) {
        max2 = Math.max.apply(null, array1[0][i]); //Math.max.apply() 메서드를 사용하여 array1[0][i]의 현재 요소에서 최대값(max2)를 계산
        min2 = Math.min.apply(null, array1[0][i]); //max 값과 같이 min 값도 계산합니다 
        avg2 = average(array1[0][i]);              //average()라는 함수를 호출하고 array1[0][i]의 현재 요소를 인수로 전달하여 평균값(avg2)을 계산합니다.
        max.push(max2);                            //push() 메서드를 사용하여 해당 배열(max,min,avg)에 추가합니다.
        min.push(min2);
        avg.push(avg2);
    }
} else if (req.params.number == '2') {
    for (let i = 0; i < array1.length; i++) {
        max2 = Math.max.apply(null, array1[0][i]);
        min2 = Math.min.apply(null, array1[0][i]);
        avg2 = average(array1[0][i]);
        max.push(max2);
        min.push(min2);
        avg.push(avg2);
    }
} else if (req.params.number == '3') {
    for (let i = 0; i < array1.length; i++) {
        max2 = Math.max.apply(null, array1[0][i]);
        min2 = Math.min.apply(null, array1[0][i]);
        avg2 = average(array1[0][i]);
        max.push(max2);
        min.push(min2);
        avg.push(avg2);
    }
} else if (req.params.number == '4') {
    for (let i = 0; i < array1.length; i++) {
        max2 = Math.max.apply(null, array1[0][i]);
        min2 = Math.min.apply(null, array1[0][i]);
        avg2 = average(array1[0][i]);
        max.push(max2);
        min.push(min2);
        avg.push(avg2);
    }
} else if (req.params.number == '5') {
    for (let i = 0; i < array1.length; i++) {
        max2 = Math.max.apply(null, array1[i][0]);
        min2 = Math.min.apply(null, array1[i][0]);
        avg2 = average(array1[i][0]);
        max.push(max2);
        min.push(min2);
        avg.push(avg2);
    }
} else if (req.params.number == '6') {
    for (let i = 0; i < array1.length; i++) {
        max2 = Math.max.apply(null, array1[i][0]);
        min2 = Math.min.apply(null, array1[i][0]);
        avg2 = average(array1[i][0]);
        max.push(max2);
        min.push(min2);
        avg.push(avg2);
    }
} else if (req.params.number == '7') {
    for (let i = 0; i < array1.length; i++) {
        max2 = Math.max.apply(null, array1[i][0]);
        min2 = Math.min.apply(null, array1[i][0]);
        avg2 = average(array1[i][0]);
        max.push(max2);
        min.push(min2);
        avg.push(avg2);
    }
} else if (req.params.number == '8') {
    for (let i = 0; i < array1.length; i++) {
        max2 = Math.max.apply(null, array1[i][0]);
        min2 = Math.min.apply(null, array1[i][0]);
        avg2 = average(array1[i][0]);
        max.push(max2);
        min.push(min2);
        avg.push(avg2);
    }
} else if (req.params.number == '9') {
    for (let i = 0; i < array1.length; i++) {
        max2 = Math.max.apply(null, array1[i][0]);
        min2 = Math.min.apply(null, array1[i][0]);
        avg2 = average(array1[i][0]);
        max.push(max2);
        min.push(min2);
        avg.push(avg2);
    }
}


res.render('chart2.html', { max: max, min: min, avg: avg });
} catch (err) { //넌적스을 이용하여, chart2.html에 값 전달.
console.log(err);
}
});

app.get('/as/:id/:name', (req, res) => { //경로 핸들러는 req(요청) 및 res(응답) 객체를 수신
    number = req.params.number;
    name = req.params.name; //req.params.number 및 req.params.name을 사용하여 URL에서 number 및 name 매개변수 값을 추출합니다
    console.log(number, name); //req.params.number 및 req.params.name 모두 URL 매개변수에서 값을 추출하고 응답을 처리하거나 
    max.splice(0);             //생성하기 위해 경로 핸들러 내에서 사용하는 방법제공
    min.splice(0);
    avg.splice(0);          //max, min 및 avg 배열은 시작 인덱스가 0인 splice() 메서드를 사용하여 지워진다.


    if (req.params.number == '0') {               //URL에서 '숫자' 매개변수를 처리하고, 배열1 의 해당 요소에 대한 계산을 수행하고
        for (let i = 0; i < array1.length; i++) { //결과를 별도의 배열에 저장하고, 계산된 값 및 기타 매개변수로 템플릿을 렌더링합니다. 
            max2 = Math.max.apply(null, array1[0][i]); //이 코드에서 수행하는 구체적인 계산은 URL에 전달된'숫자'값에 따라 다르다.
            min2 = Math.min.apply(null, array1[0][i]);
            avg2 = average(array1[0][i]);
            max.push(max2);
            min.push(min2);
            avg.push(avg2); //계산된 최대값, 최소값 및 평균값은 push() 메서드를 사용하여 해당 배열(max, min, avg)로 푸시됩니다.
        }
    } else if (req.params.number == '1') {
        for (let i = 0; i < array1.length; i++) {
            max2 = Math.max.apply(null, array1[1][i]);
            min2 = Math.min.apply(null, array1[1][i]);
            avg2 = average(array1[1][i]);
            max.push(max2);
            min.push(min2);
            avg.push(avg2);  
        }
    } else if (req.params.number == '2') {
        for (let i = 0; i < array1.length; i++) {
            max2 = Math.max.apply(null, array1[2][i]);
            min2 = Math.min.apply(null, array1[2][i]);
            avg2 = average(array1[2][i]);
            max.push(max2);
            min.push(min2);
            avg.push(avg2);
        }
    } else if (req.params.number == '3') {
        for (let i = 0; i < array1.length; i++) {
            max2 = Math.max.apply(null, array1[3][i]);
            min2 = Math.min.apply(null, array1[3][i]);
            avg2 = ave(array1[3][i]);
            max.push(max2);
            min.push(min2);
            avg.push(avg2);
        }
    } else if (req.params.number == '4') {
        for (let i = 0; i < array1.length; i++) {
            max2 = Math.max.apply(null, array1[4][i]);
            min2 = Math.min.apply(null, array1[4][i]);
            avg2 = average(array1[4][i]);
            max.push(max2);
            min.push(min2);
            avg.push(avg2);
        }
    } else if (req.params.number == '5') {
        for (let i = 0; i < array1.length; i++) {
            max2 = Math.max.apply(null, array1[i][0]);
            min2 = Math.min.apply(null, array1[i][0]);
            avg2 = average(array1[i][0]);
            max.push(max2);
            min.push(min2);
            avg.push(avg2);
        }
    } else if (req.params.number == '6') {
        for (let i = 0; i < array1.length; i++) {
            max2 = Math.max.apply(null, array1[i][1]);
            min2 = Math.min.apply(null, array1[i][1]);
            avg2 = average(array1[i][1]);
            max.push(max2);
            min.push(min2);
            avg.push(avg2);
        }
    } else if (req.params.number == '7') {
        for (let i = 0; i < array1.length; i++) {
            max2 = Math.max.apply(null, array1[i][2]);
            min2 = Math.min.apply(null, array1[i][2]);
            avg2 = average(array1[i][2]);
            max.push(max2);
            min.push(min2);
            avg.push(avg2);
        }
    } else if (req.params.number == '8') {
        for (let i = 0; i < array1.length; i++) {
            max2 = Math.max.apply(null, array1[i][3]);
            min2 = Math.min.apply(null, array1[i][3]);
            avg2 = average(array1[i][3]);
            max.push(max2);
            min.push(min2);
            avg.push(avg2);
        }
    } else if (req.params.number == '9') {
        for (let i = 0; i < array1.length; i++) {
            max2 = Math.max.apply(null, array1[i][4]);
            min2 = Math.min.apply(null, array1[i][4]);
            avg2 = average(arrchannel[i][4]);
            max.push(max2);
            min.push(min2);
            avg.push(avg2);
        }
    }
    res.render('chart2.html', { max: max, min: min, avg: avg, number: req.params.number, name: req.params.name });
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 에서 대기 중');
});
//평균을 계산해주는 함수
function average(array1) {
    let average = 0;
    let sum = 0;
    for (let i = 0; i < array1.length; i++) {
        sum += parseInt(array1[i]);
    }
    average = sum / array1.length;
    return average;
}
