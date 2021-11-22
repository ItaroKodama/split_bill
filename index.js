//todo
//空のときは0円処理
//保存時の金額をどっかに表示
//名前は変更できないようにする
//データ削除時はポップアップ喚起(終了ボタン押下→終了しますか？→はい→終了するとデータが削除されますがいいですか？→はい→データ削除)
//結果をポップアップ表示
//用途の入力をできるようにして履歴を見れるようにする

let numberOfPeople = 0;
let firstAccessFlg = true;
//TODO この2つはローカルストレージに保存するべきかな

//人数確定ボタン押下時処理（ローカルストレージを作成、人数分の入力欄を作成）
function confirmNumberOfPeople(){
    //人数を取得
    numberOfPeople = document.getElementById("numberOfPeople").value - numberOfPeople;

    //ローカルストレージを作成
    for(let i=0; i<numberOfPeople; i++){
        const tmpId = "paymentId" + i;
        localStorage.setItem(tmpId, 0);
    }

    //人数分の入力欄を作成
    for(let i = 0; i < numberOfPeople; i++){           
        //名前アイコン
        let memberImage = document.createElement('img');
        memberImage.setAttribute('class', 'memberImg');
        memberImage.setAttribute('src', '人物のアイコン素材.svg');

        //名前入力欄
        let personNameInput = document.createElement('input');
        personNameInput.setAttribute('id', 'personId' + i);
        personNameInput.setAttribute('class', 'personName');
        personNameInput.setAttribute('required', true);
        
        //財布アイコン
        let purseImage = document.createElement('img');
        purseImage.setAttribute('class', 'purseImg');
        purseImage.setAttribute('src', 'キュートながま口財布アイコン.svg');

        //金額入力欄
        let paymentInput = document.createElement('input');
        paymentInput.setAttribute('id', 'paymentId' + i);
        paymentInput.setAttribute('class', 'payment');
        paymentInput.setAttribute('required', true);

        //用途入力欄
        // let useFor = document.createElement('input');
        // useFor.setAttribute('id', 'useId' + i);
        // useFor.setAttribute('class', 'useFor');

        //合計金額表示欄
        let sumPayment = document.createElement('input');
        sumPayment.setAttribute('id', 'sumPayment' + i);
        sumPayment.setAttribute('class', 'sumPayment');
        sumPayment.setAttribute('readonly', true);
        const tmpId = "paymentId" + i;
        sumPayment.setAttribute('value', localStorage.getItem(tmpId));
        
        //div要素作成
        let divPerson = document.createElement('div');
        divPerson.setAttribute('class', 'personArea');

        //divに子要素を追加
        divPerson.appendChild(memberImage);
        divPerson.appendChild(personNameInput);
        divPerson.appendChild(purseImage);
        divPerson.appendChild(paymentInput);
        // divPerson.appendChild(useFor);
        divPerson.appendChild(sumPayment);

        //親要素にdivを追加
        paymentInputArea.appendChild(divPerson);
    }
    
    if(firstAccessFlg){
        //一時保存ボタン
        let saveTmpBtn = document.createElement('button');
        saveTmpBtn.setAttribute('id', 'saveTmp');
        saveTmpBtn.setAttribute('onclick', 'saveTmp()');
        let saveTmp = document.createTextNode('一時保存');
        saveTmpBtn.appendChild(saveTmp);

        //割り勘計算ボタン
        let splitBillBtn = document.createElement('button');
        splitBillBtn.setAttribute('id', 'splitBill');
        splitBillBtn.setAttribute('onclick', 'splitBill()');
        let splitBill = document.createTextNode('割り勘');
        splitBillBtn.appendChild(splitBill)
        ;

        //終了ボタン
        let finishBtn = document.createElement('button');
        finishBtn.setAttribute('id', 'finish');
        finishBtn.setAttribute('onclick', 'finish()');
        let finish = document.createTextNode('終了');
        finishBtn.appendChild(finish);

        //親要素に追加
        paymentButtonArea.appendChild(saveTmpBtn);
        paymentButtonArea.appendChild(splitBillBtn);
        paymentButtonArea.appendChild(finishBtn);
    }

    firstAccessFlg = false;
}

//一時保存ボタン押下時処理
function saveTmp(){
    for(let i=0; i<numberOfPeople; i++){
        const tmpId = "paymentId" + i; 

        //入力金額をローカルストレージに保存
        let tmpPayment = document.getElementById(tmpId).value;
        if(tmpPayment != ""){
            const sumPayment = parseInt(localStorage.getItem(tmpId)) + parseInt(tmpPayment);
            localStorage.setItem(tmpId, sumPayment);
        }

        //金額入力欄のリセット、合計金額の加算
        document.getElementById(tmpId).value = '';
        document.getElementById('sumPayment' + i).value = localStorage.getItem(tmpId);
    }
}

//割り勘ボタン押下時処理
function splitBill(){
    //全員の合計金額を算出
    let sumEveryone = 0;
    const paymentEach = new Array(numberOfPeople);
    for(let i = 0; i < numberOfPeople; i++){
        const tmpId = "paymentId" + i;
        let tmpPayment = document.getElementById(tmpId).value;
        if(tmpPayment == ""){
            tmpPayment = 0;
        }
        paymentEach[i] = parseInt(localStorage.getItem(tmpId)) + parseInt(tmpPayment);
        sumEveryone += paymentEach[i];
    }

    //平均との差額を計算
    const avg = sumEveryone / numberOfPeople;
    let difference = new Array(numberOfPeople);
    for(let i = 0; i < numberOfPeople; i++){
        difference[i] = [];
        difference[i][0] = i;
        difference[i][1] = paymentEach[i] - avg;
    }
    
    //差額を照準にソート
    difference.sort(comparePayment);

    //支払先を決定
    let str = "1人" + avg + "円<br><br>";
    let i = 0;
    let j = 1;
    while (difference[i][1] < 0) {
        if (Math.abs(difference[i][1]) < Math.abs(difference[difference.length - j][1])) {
            const nameId1 = "personId" + difference[i][0];

            const nameId2 = "personId" + difference[difference.length - j][0];
            str += document.getElementById(nameId1).value + "は" + document.getElementById(nameId2).value + "に" + Math.floor(Math.abs(difference[i][1])) + "円を支払う<br>";
            difference[difference.length - j][1] += difference[i][1];
            i++;
        } else if (Math.abs(difference[i][1]) > Math.abs(difference[difference.length - j][1])) {
            const nameId1 = "personId" + difference[i][0];

            const nameId2 = "personId" + difference[difference.length - j][0];
            str += document.getElementById(nameId1).value + "は" + document.getElementById(nameId2).value + "に" + Math.floor(Math.abs(difference[difference.length - j][1])) + "円を支払う<br>";
            difference[i][1] += difference[difference.length - j][1];

            j++;
        } else if (Math.abs(difference[i][1]) == Math.abs(difference[difference.length - j][1])) {
            const nameId1 = "personId" + difference[i][0];

            const nameId2 = "personId" + difference[difference.length - j][0];
            str += document.getElementById(nameId1).value + "は" + document.getElementById(nameId2).value + "に" + Math.floor(Math.abs(difference[i][1])) + "円を支払う<br>";

            i++;
            j++;
        }
    }
    document.getElementById("result").innerHTML = str;
}

//終了ボタン押下時処理
function finish(){
    localStorage.clear();
    //TODO入力欄も消す必要あり
}

function comparePayment(a, b) {
    return a[1] - b[1];
}
