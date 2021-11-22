//todo
//金額の必須チェックor空のときは0円処理
//保存時の金額をどっかに表示
//内容を任意で入力できるようにする
//名前は変更できないようにする
//データ削除時はポップアップ喚起


let peopleCnt = 0;
//人数確定ボタン押下時
function count(){
    //人数を取得
    peopleCnt = document.getElementById("peopleCnt").value;

    //人数分の入力欄を出力
    let str = "";
    for (let i = 0; i < peopleCnt; i++) {
        str += "<div><img class=member src=/Users/user/training/kodama/spriting_bills/人物のアイコン素材.svg width=28px margin-right=5px top=50%><input type=\"text\" id=\"name" + i + "\" class=\"name\">&emsp;" +
            "<img class=saifu src=/Users/user/training/kodama/spriting_bills/キュートながま口財布アイコン.svg width=28px margin-right=5px><input type=\"number\" id=\"money" + i + "\" class=\"money\"></div>&emsp;";
        str += "<div>合計金額" + "10000円" + "</div>"
    }
    str += "<button id=\"saveMoneyTmp\" onclick=\"saveTmp()\">一時保存</button>"
    str += "<button id=\"spritBills\" onclick=\"sprit()\">割り勘</button>"
    str += "<button id=\"clearLocalStorage\" onclick=\"clear()\">保存データ削除</button>";
    document.getElementById("nameAndMoney").innerHTML = str;

    //ローカルストレージを作成
    for(let i=0; i<peopleCnt; i++){
        const tmpId = "money" + i;
        localStorage.setItem(tmpId, 0);
    }
}

//一時保存ボタン押下時
function saveTmp(){
    for(let i=0; i<peopleCnt; i++){
        const tmpId = "money" + i; 
        const tmpMoney = parseInt(localStorage.getItem(tmpId)) + parseInt(document.getElementById(tmpId).value);
        localStorage.setItem(tmpId, tmpMoney);
    }
}

//割り勘ボタン押下時
function sprit(){
    //全員の合計金額を算出
    let sum = 0;
    const payment = new Array(peopleCnt);
    for(let i=0; i<peopleCnt; i++){
        const tmpId = "money" + i;
        payment[i] = parseInt(localStorage.getItem(tmpId)) + parseInt(document.getElementById(tmpId).value);
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
    let str = "1人" + avg + "円<br><br>";
    let i = 0;
    let j = 1;
    while (difference[i][1] < 0) {
        if (Math.abs(difference[i][1]) < Math.abs(difference[difference.length - j][1])) {
            const nameId1 = "name" + difference[i][0];

            const nameId2 = "name" + difference[difference.length - j][0];
            str += document.getElementById(nameId1).value + "は" + document.getElementById(nameId2).value + "に" + Math.floor(Math.abs(difference[i][1])) + "円を支払う<br>";
            difference[difference.length - j][1] += difference[i][1];
            i++;
        } else if (Math.abs(difference[i][1]) > Math.abs(difference[difference.length - j][1])) {
            const nameId1 = "name" + difference[i][0];

            const nameId2 = "name" + difference[difference.length - j][0];
            str += document.getElementById(nameId1).value + "は" + document.getElementById(nameId2).value + "に" + Math.floor(Math.abs(difference[difference.length - j][1])) + "円を支払う<br>";
            difference[i][1] += difference[difference.length - j][1];

            j++;
        } else if (Math.abs(difference[i][1]) == Math.abs(difference[difference.length - j][1])) {
            const nameId1 = "name" + difference[i][0];

            const nameId2 = "name" + difference[difference.length - j][0];
            str += document.getElementById(nameId1).value + "は" + document.getElementById(nameId2).value + "に" + Math.floor(Math.abs(difference[i][1])) + "円を支払う<br>";

            i++;
            j++;
        }
    }
    document.getElementById("result").innerHTML = str;

    //localStorageデータ削除
    localStorage.clear();
}

function comparePayment(a, b) {
    return a[1] - b[1];
}

function clear(){
    localStorage.clear();
}