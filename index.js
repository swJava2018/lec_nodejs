const express = require('express');
const app = express();
const axios = require('axios');

/**
 * 메인 웹 페이지 설정
 * public 폴더를 static 파일들(ex, html, css, jpg)을 위치로 지정한다.
 * 
 * example) 
 * http://127.0.0.1:3000
 * http://127.0.0.1:3000/index.html
 */
app.use(express.static('public'));

/**
 * 제곱된 결과 가져오기 REST API
 * 
 * example) 
 * http://127.0.0.1:3000/calculate/5/pow
 */
app.get('/calculate/:num/pow', function (req, res) {
    var num = req.params.num;
    var pow = num * num;

    var result = getResult(num, pow);
    res.send(result);
});

/**
 * 펙토리얼 결과 가져오기 REST API
 * 
 * example) 
 * http://127.0.0.1:3000/calculate/5/factorial
 */
app.get('/calculate/:num/factorial', function (req, res) {
    var num = req.params.num;
    var factorial = 1;
    for(var i=num; i>0; i--) {
        factorial *= i;
    }
    
    var result = getResult(num, factorial);
    res.send(result);
});

function getResult(num, result) {
    var jsonObj = {
        input: num,
        result: result
    };
    return JSON.stringify(jsonObj)
};

/**
 * 암호화폐 거래소의 특정 코인의 마지막 거래 정보 가져오기 REST API
 * 
 * BTC, ETH, DASH, LTC, ETC, XRP, BCH, XMR, ZEC, QTUM, BTG, EOS
 * example) 
 * http://127.0.0.1:3000/lastTransaction/BTC
 */
app.get('/lastTransaction/:currency', function (req, res) {
    var currency = req.params.currency;
    getData(currency)
    .then(function(data){
        res.send(data);
    }).catch(function(err) {
        console.error(err); 
    });
});

function getData(currency) {
    return new Promise(async function(resolve, reject) {
        var result = await axios.get(`https://api.bithumb.com/public/ticker/` + currency);
        resolve(result.data);
    });
};

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Server is working : PORT - ', port);
});