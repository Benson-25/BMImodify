//DOM元素
var list = document.querySelector('.list');
var sendData = document.querySelector('.send');
var heightText = document.querySelector('.height');
var weightText = document.querySelector('.weight');
var colorData = document.querySelector('.color');
var msgData = document.querySelector('.msg');
var data = JSON.parse(localStorage.getItem('listData')) ||[];
var level = ''
//建立資料 li列表
function updateList(data){
    var str = '';
    var el = data.length;
    for(var i=0;i<el;i++){
    var content = '<li class="color">'+data[i].Color +'</li>'+
    '<div class="Change"></div>'+
    '<h2 class="msg">'+data[i].msg+'</h2>'+
    '<div>'+
   '<small class="Script">BMI</small>'+
   '<span>'+data[i].bmi+'</span>'+
   '</div>'+
   '<div>'+
   '<small class="Script">weight</small>'+
   '<span>'+data[i].weight+'</span>'+
   '</div>'+
   '<div>'+
   '<small class="Script">height</small>'+
   '<span>'+data[i].height+'</span>'+
   '</div>' 
   str+=content
   }
  
   list.innerHTML = str
   console.log(str)
}


//計算BMI
function BMIcalc() {
    var height = parseInt(heightText.value) / 100;
    var weight = parseInt(weightText.value);
    var bmi = Math.round(weight / Math.pow(height,2) * 100) / 100;

    BMIstatus(bmi);
    var bmiData = {
      bmi: bmi,
      weight: weightText.value,
      height: heightText.value,
      Color: resultMsg.textContent,
      level: level
    };
    heightText.value = "";
    weightText.value = "";
    data.unshift(bmiData); 
  
}
//資料+畫面:判斷
function BMIstatus(data){
     var statusGroup = {
        Ideal:{
            Color:'.ideal',
            msg:'標準體重',
            level:'Ideal'
        },
        underWeight:{
            Color:'.underweight',
            msg:'體重過輕',
            level:'underWeight'
        },
        overWeight:{
            Color:'.overweight',
            msg:'體重過重',
            level:'overWeight'
        },
        lighfat:{
            Color:'.lightFat',
            msg:'輕度肥胖',
            level:'lightfat'
        },
        mediumfat:{
            Color:'.mediumFat',
            msg:'中度肥胖',
            level:'mediumfat'
        },
        overfat:{
            Color:'.overFat',
            msg:'重度肥胖',
            level:'overfat'
        }
    };
    var filterStatus = function filterStatus(value) {
        var msg = statusGroup[value].msg;
        console.log(msg)
        msgData.textContent = statusGroup[value].msg;
        level = statusGroup[value].level;
        var msg = statusGroup[value].msg;
        return{
            Color:Color,
            level:level,
            msg:msg
        };
    };

    if (data <= 18.5){
        filterStatus('underWeight');
    }else if(data <= 25){
        filterStatus('Ideal');
    }else if (data <= 30){
        filterStatus('overWeight');
    }else if(data <= 35){
        filterStatus('lightfat');
    }else if(data <= 40){
        filterStatus('mediumfat');
    }else{
        filterStatus('overfat');
    }
    localStorage.setItem('listData',JSON.stringify(data))
   updateList(data)
}
//按鈕
function addData(){
BMIcalc();

}




// //監聽與更新
//list.addEventListener('click',toggleDone);//刪除紀錄
sendData.addEventListener('click',addData);
updateList(data);