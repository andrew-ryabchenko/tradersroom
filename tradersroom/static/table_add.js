const list = document.getElementById('list');
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
    // var rowsDict = {};
    // rowsDict.symbol = symbol;
    // rowsDict.entryPrice = entryPrice;
    // rowsDict.stopPrice = stopPrice;
    // rows.push(rowsDict);
    rows.push([symbol,entryPrice,stopPrice]);
    return [symbol,entryPrice,stopPrice];
}
function createRow(inputData){
    var li = document.createElement('li');
    li.className = 'list-group-item my-2 rounded';
    var string = `${inputData[0].toUpperCase()} | Entry price: ${inputData[1]} | Stop price: ${inputData[2]} <span class="material-icons 
    removePositition" onclick="deleteRow(this)" style="position: absolute; right:10px; top:27%; font-variant: normal; cursor: pointer; user-select: none;">close</span>`
    li.innerHTML = string;
    li.style.fontVariant = 'small-caps';
    li.style.fontWeight = '500';
    li.style.overflowX = 'hidden';
    if (list.childNodes.length % 2 == 0){
        li.style.backgroundColor = 'rgba(46, 43, 40, 0.3)';
    }
    else{
        li.style.backgroundColor = 'rgba(46, 43, 40, 0.05)';
    }
    return li;
}
function deleteRow(cross){
    var rowToDelete = cross.parentElement; 
    var index = Array.prototype.indexOf.call(list.children, rowToDelete);
    var animation = animate(rowToDelete, direction=0);
    animation.onfinish = function (){
        list.removeChild(rowToDelete);
    };
    delete rows[index];
    console.log(rows);

}

function calculate(){
    // for(let i=0; i<rows.length; i++){
    //     console.log(rows[i]);
    // }
    var splitSize = accSize / rows.length;
    for(let i=0; i<rows.length; i++){
         
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
        var li = createRow(inputData);
        list.append(li);
        animate(li);
        li.scrollIntoView();
        
    }
})

