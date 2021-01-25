
const addButton = document.getElementById('addButton');
const inputForm = document.getElementsByTagName('input');
// const removeButton = document.getElementsByClassName('removePosition')
console.log(inputForm)
var rows = [];
let accSize=0;
let risk=0;

function verifyInput(){
    let symbol = '';
    let entryPrice=0;
    let stopPrice=0;

    for(let i = 0; i < inputForm.length; i++){
        let item = inputForm.item(i);
        var valid = item.validity.valid;

        if (! valid){
            item.style.backgroundColor = 'rgb(255, 227, 23)';
            setTimeout(() => {
                item.style.backgroundColor = 'transparent';
            }, 700);
            return null;
        }
        switch (item.name){
            case 'risk':
                risk = parseFloat(item.value);
                break;
            case 'accountSize':
                accSize = parseFloat(item.value);
                break;
            case 'entryPrice':
                entryPrice = parseFloat(item.value);
                break;
            case 'stopPrice':
                stopPrice = parseFloat(item.value);
                break;
            case 'symbol':
                symbol = item.value.toUpperCase();
                break;
        }
    }
    rows.push({'symbol':symbol, 'entry':entryPrice, 'stop':stopPrice});
    return {'symbol':symbol, 'entry':entryPrice, 'stop':stopPrice};
}
function update(){
    let list = document.getElementById('list');
    while (list.firstChild){
        list.removeChild(list.firstChild);
    }
    for(let i = 0; i<rows.length; i++){
        var li = document.createElement('li');
        li.className = 'list-group-item my-2 rounded';
        var string = `${rows[i]['symbol'].toUpperCase()} | Entry price: ${rows[i]['entry']} | Stop price: ${rows[i]['stop']} | Position size: ${rows[i]['pos']} <span class="material-icons 
        removePositition" onclick="deleteRow(this)" style="position: absolute; right:10px; top:27%; font-variant: normal; cursor: pointer; user-select: none;">close</span>`
        li.innerHTML = string;
        li.style.fontVariant = 'small-caps';
        li.style.fontWeight = '500';
        li.style.overflowX = 'hidden';
        li.style.backgroundColor = 'rgb(245,245,245)';
        list.append(li);
    }
    return true;
}
function deleteRow(cross){
    var list = document.getElementById('list');
    var rowToDelete = cross.parentElement; 
    var index = Array.prototype.indexOf.call(list.children, rowToDelete);
    var animation = animate(rowToDelete, direction=0);
    animation.onfinish = function (){
        list.removeChild(rowToDelete);
    };
    rows.splice(index, 1);
    calculate();
    return update();
}
function calculate(){
    var riskPerStock = (accSize / rows.length) * risk;
    for(let i=0; i<rows.length; i++){
        var item = rows[i];
        var stop = item['stop'];
        var entry = item['entry'];
        var R = Math.abs(stop - entry);
        var pSize = (riskPerStock / R) > (accSize / rows.length) ? (accSize / rows.length) / R : (riskPerStock / R);
        rows[i]['pos'] = pSize;
    }
}

function animate(element, direction=1){
    var from = direction ? 0 : 1;
    var to = direction ? 1 : 0;
    return element.animate([{ // from
                            opacity: from,
                            },
                            { // to
                            opacity: to,
                            } 
                            ], 400);
}

addButton.addEventListener('click', function(event){
    var inputData = verifyInput();
    if (inputData){
        calculate();
        return update();
    }
})

