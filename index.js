// document.getElementById("peopleCntConfirm").onclick = function() {
let peopleCnt = 0;
function count(){
    //人数を取得
    peopleCnt = document.getElementById("peopleCnt").value;

    //人数分の入力欄を出力
    let str = "";
    for(let i=1; i<=peopleCnt; i++){
        str += 
            "<div>" +
                i + "人目：名前<input type=\"text\" id=\"name" + i + "\" class=\"name\">&emsp;" +
                "支払金額<input type=\"text\" id=\"money" + i + "\" class=\"money\">" +
            "</div><br>";
    }
    str += "<button id=\"spritingBills\" onclick=\"sprit()\">割り勘</button>";
    document.getElementById("nameAndMoney").innerHTML = str;
}

function sprit(){
    //全員の合計金額を算出
    let sum = 0;
    const payment = new Array(peopleCnt);
    for(let i=0; i<peopleCnt; i++){
        const moneyId = "money" + (i+1);
        payment[i] = parseInt(document.getElementById(moneyId).value);
        sum += payment[i];
    }

    //平均との差額を計算
    const avg = sum / peopleCnt;
    let difference = new Array(peopleCnt);
    for(let i=0; i<peopleCnt; i++){
        difference[i] = [];
        difference[i][0] = i+1;
        difference[i][1] = payment[i] - avg;
    }
    
    //差額を照準にソート
    (difference.sort(comparePayment));
    for(let i=0; i<peopleCnt; i++){
    }

    //支払先を決定
    let str = "1人" + Math.floor(avg) + "円<br><br>";
    let i = 0;
    let j = 1;
    while(difference[i][1] < 0){
        if(Math.abs(difference[i][1]) < Math.abs(difference[difference.length-j][1])){
            const nameId1 = "name" + difference[i][0];
            const nameId2 = "name" + difference[difference.length-j][0];
            str += document.getElementById(nameId1).value  + "は" + document.getElementById(nameId2).value + "に" + Math.floor(Math.abs(difference[i][1])) + "円を支払う<br>";
            difference[difference.length-j][1] += difference[i][1];
            i++;
        }
        else if(Math.abs(difference[i][1]) > Math.abs(difference[difference.length-j][1])){
            const nameId1 = "name" + difference[i][0];
            const nameId2 = "name" + difference[difference.length-j][0];
            str += document.getElementById(nameId1).value  + "は" + document.getElementById(nameId2).value + "に" + Math.floor(Math.abs(difference[difference.length-j][1])) + "円を支払う<br>";
            difference[i][1] += difference[difference.length-j][1];
            j++;
        }
        else if(Math.abs(difference[i][1]) == Math.abs(difference[difference.length-j][1])){
            const nameId1 = "name" + difference[i][0];
            const nameId2 = "name" + difference[difference.length-j][0];
            str += document.getElementById(nameId1).value  + "は" + document.getElementById(nameId2).value + "に" + Math.floor(Math.abs(difference[i][1])) + "円を支払う<br>";
            i++;
            j++;
        }
    }
    document.getElementById("result").innerHTML = str;
}

function comparePayment(a, b) {
    return a[1] - b[1];
}