//todo
//名前がない場合どうするかor必須入力にするか
//データ削除時はポップアップ喚起(終了ボタン押下→終了しますか？→はい→終了するとデータが削除されますがいいですか？→はい→データ削除)
//結果をポップアップ表示
//用途の入力をできるようにして履歴を見れるようにする
//名前もローカルストレージに保存する必要あり

let firstAccessFlg = true;
//TODO ローカルストレージに保存するべきかな,というより不要か（別のやり方ありそう）

function initialDisplay(){
    if(localStorage.getItem('numberOfPeople') != null){
        for(i = 0; i < localStorage.getItem('numberOfPeople'); i++){
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

            //合計金額タイトル
            let txtSumPayment = document.createTextNode('合計金額：');

            //合計金額表示欄
            let sumPayment = document.createElement('input');
            sumPayment.setAttribute('id', 'sumPayment' + i);
            sumPayment.setAttribute('class', 'payment sumPayment');
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
            divPerson.appendChild(txtSumPayment);
            divPerson.appendChild(sumPayment);

            //親要素にdivを追加
            paymentInputArea.appendChild(divPerson);
        }

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
}

//人数確定ボタン押下時処理（ローカルストレージを作成、人数分の入力欄を作成）
function confirmNumberOfPeople(){
    if(localStorage.getItem('numberOfPeople') == null){
        localStorage.setItem('numberOfPeople', 0);
    }
    //人数を取得
    const numberOfPeople = document.getElementById("numberOfPeople").value;
    localStorage.setItem('numberOfPeople', numberOfPeople);

    //ローカルストレージを作成
    for(let i = 0; i < numberOfPeople; i++){
        const tmpId = "paymentId" + i;
        if(localStorage.getItem(tmpId) == null){
            localStorage.setItem(tmpId, 0);
        }
    }

    //人数分の入力欄を作成
    for(let i = 0; i < numberOfPeople; i++){           
        if(document.getElementById('personId' + i) == null){            
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

            //合計金額タイトル
            let txtSumPayment = document.createTextNode('合計金額：');

            //合計金額表示欄
            let sumPayment = document.createElement('input');
            sumPayment.setAttribute('id', 'sumPayment' + i);
            sumPayment.setAttribute('class', 'payment sumPayment');
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
            divPerson.appendChild(txtSumPayment);
            divPerson.appendChild(sumPayment);

            //親要素にdivを追加
            paymentInputArea.appendChild(divPerson);
        }
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
    for(let i = 0; i < localStorage.getItem('numberOfPeople'); i++){
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
    saveTmp();

    numberOfPeople = localStorage.getItem('numberOfPeople');

    //前回データの削除
    document.getElementById('paymentResult').remove();
    let paymentResult = document.createElement('div');
    paymentResult.setAttribute('id', 'paymentResult');
    resultDisplayArea.appendChild(paymentResult);

    //全員の合計金額
    let sumEveryone = 0;
    //各メンバーの支払金額
    const paymentEach = new Array(numberOfPeople);

    //合計金額の算出
    for(let i = 0; i < numberOfPeople; i++){
        const tmpId = "paymentId" + i;
        paymentEach[i] = parseInt(localStorage.getItem(tmpId));
        sumEveryone += paymentEach[i];
    }

    //各メンバーの支払い金額と平均金額との差額を計算
    const avg = Math.floor(sumEveryone / numberOfPeople);
    let difference = new Array(numberOfPeople);
    for(let i = 0; i < numberOfPeople; i++){
        difference[i] = [];
        difference[i][0] = i;
        difference[i][1] = paymentEach[i] - avg;
    }
    
    //差額を昇順にソート
    difference.sort(comparePayment);

    //平均金額の表示
    let txtAveragePayment = document.createTextNode('1人' + avg + '円');
    let averagePayment = document.createElement('label');
    averagePayment.setAttribute('class', 'averagePayment');
    averagePayment.appendChild(txtAveragePayment);
    paymentResult.appendChild(averagePayment);

    //支払先の決定
    let i = 0;
    let j = 1;
    while (difference[i][1] < 0) {
        const nameId1 = "personId" + difference[i][0];
        const nameId2 = "personId" + difference[difference.length - j][0];

        //支払金額を算出
        let payment = 0;
        if (Math.abs(difference[i][1]) < Math.abs(difference[difference.length - j][1])) {
            payment = Math.floor(Math.abs(difference[i][1]));
            difference[difference.length - j][1] += difference[i][1];
            i++;
        } else if (Math.abs(difference[i][1]) > Math.abs(difference[difference.length - j][1])) {
            payment = Math.floor(Math.abs(difference[difference.length - j][1]));
            difference[i][1] += difference[difference.length - j][1];
            j++;
        } else if (Math.abs(difference[i][1]) == Math.abs(difference[difference.length - j][1])) {
            payment = Math.floor(Math.abs(difference[i][1]));
            i++;
            j++;
        }

        //支払内容の表示
        let txtPaymentFor = document.createTextNode(document.getElementById(nameId1).value + 'は' + document.getElementById(nameId2).value + 'に' + payment + '円支払う');
        let paymentFor = document.createElement('label');
        paymentFor.setAttribute('class', 'paymentFor');
        paymentFor.appendChild(txtPaymentFor);
        paymentResult.appendChild(paymentFor);
    }
}

//終了ボタン押下時処理
function finish(){
    localStorage.clear();
    //TODO入力欄も消す必要あり
    //TODOポップアップ表示
}

function comparePayment(a, b) {
    return a[1] - b[1];
}
