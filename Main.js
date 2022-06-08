const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function app(key) {
    let storage = JSON.parse(localStorage.getItem(key)) ?? [];

    function save() {
        localStorage.setItem(key, JSON.stringify(storage));
    }

    return {
        getAll() {
            return storage;
        },
        add(value) {
            let stringDate = new Date();
            storage.push({
                ...value,
                timeDate: stringDate
            })
            save()
        },
        get(key) {
            return storage[key]
        },
        remove(key) {
            console.log(key)
            storage.splice(key, 1);
            save()
        },
        edit(key ,value) {

            storage[key] = {
                ...JSON.parse(JSON.stringify(value))
            }
            save();
        }
    }
}
function appp4() {
    let app4 = app("QuanLyChiTieu");
    app4.edit(1, "nhacnho", {name: "Thanh"})
    console.log(app4)
}


function appMoney(key) {
    let storage = JSON.parse(localStorage.getItem(key));

    function save() {
        localStorage.setItem(key, JSON.stringify(storage));
    }

    return {
        add(value) {
            storage = value;
            save()
        },
        get() {
            return storage;
        },
        edit( value) {
            storage=value;
            save()
        }
    }
}
function appMessage() {
    let storage = JSON.parse(localStorage.getItem("message")) ?? [];

    function save() {
        localStorage.setItem("message", JSON.stringify(storage));
    }
    return {
        add(value) {
            storage.push(value);
            save();
        },
        get() {
            return storage;
        },
        edit(key, value) {
            storage[key] = value;
            save()
        }
    }
}
(function () {
    let buttonAdd = $('#add');
    let closeButton = $('#close');
    let valueSelect = $('select[id="danhmuc__chitiet"]')
    let inputValueTime = $('input[id="time__option"]');
    let search_button = $('button[id="search"]');
    let idvalue = $('div[id="id1"]');
    let idMoneySpend = $('th[id="sotien"]');
    let thNumberMoney = $('th[id="th__numberMoney"]');
    let inputConten = $('p[id="0"]');
    let chanquaroi = $('input[id="valueMoney"]');
    buttonAdd.setAttribute("onclick", "addValueOnchange()");
    closeButton.setAttribute("onclick", "displayNoneClose()");
    $('th[id="danhmuc"]').setAttribute("onclick", "display_options()");
    valueSelect.addEventListener("click", value__stopPropagation)
    inputValueTime.addEventListener("click", value__time__search);
    search_button.addEventListener("click", searchButton);
    idMoneySpend.addEventListener("click", sortMoney);
    thNumberMoney.addEventListener("click", setNumberMoney);
    idMoneySpend.setAttribute("name", "giam");
    function value__stopPropagation(e) {
        e.stopPropagation();
        let value = valueSelect.value;
        console.log(value)
        if (value === "time") {
            idvalue.classList.toggle("display__none");
            valueSelect.value = $('option[value="search"]').value;
        }
        if (value === "sort") {
            sortTimeDate();
            valueSelect.value = $('option[value="search"]').value;
        }
    }

    function value__time__search(e) {
        e.stopPropagation();// chỉ chặn nỏi bọt searchButton
    }

    function searchButton(e) {
        let valueDateTiem = $('input[type="date"]').value;
        e.stopPropagation();
        let valueInput2 = valueDateTiem.split("-").join("/").toLocaleLowerCase();
        if (valueDateTiem === "") {
            alert("vui lòng nhập đúng tháng/ngày/năm")
            return;
        }
        let newdateInput = new Date(valueInput2.split("/").reverse().join("/")).toLocaleDateString();
        let callback = app("QuanLyChiTieu");
        let getList = JSON.parse(JSON.stringify(callback.getAll()));
        let newList = getList.filter((value) => {
            let check = new Date(value.timeDate);
            let newValue = check.toLocaleDateString()
            return newdateInput === newValue;
        });
        console.log(newList)
        if (newList.length === 0) {
            alert("không có chi tiêu ngày ")
        } else {
            getListLocalStorage(newList);
        }
    }

    function sortTimeDate() {
        let callback = app("QuanLyChiTieu");
        let getList = JSON.parse(JSON.stringify(callback.getAll()));
        getList.sort((a, b) => -b.timeDate + a.timeDate);
        console.log(getList)
        getListLocalStorage(getList)
    }


    function sortMoneyreduce() {
        let callback = app("QuanLyChiTieu");
        let getList = JSON.parse(JSON.stringify(callback.getAll()));
        getList.sort((a, b) => a.soTienChi - b.soTienChi);
        getListLocalStorage(getList);
    }

    function sortMoneyAugment() {
        let callback = app("QuanLyChiTieu");
        let getList = JSON.parse(JSON.stringify(callback.getAll()));
        getList.sort((a, b) => b.soTienChi - a.soTienChi);
        getListLocalStorage(getList);
    }

    function sortMoneys() {
        let callback = app("QuanLyChiTieu");
        let getList = JSON.parse(JSON.stringify(callback.getAll()));
        getList.sort((a, b) => a.soTienChi - b.soTienChi);
        getListLocalStorage(getList);
    }

    function sortMoney() {
        if (idMoneySpend.getAttribute("name") === "giam") {

            sortMoneyreduce();
            idMoneySpend.setAttribute("name", "tang");
            return;
        }
        sortMoneyAugment();
        idMoneySpend.setAttribute("name", "giam");
    }
})();

function setNumberMoney() {
    const inputConten = $('p[id="0"]');
    inputConten.outerHTML = `<input type="text" id="valueMoney">`
    let chanquaroi = $('input[id="valueMoney"]');
    console.log(chanquaroi)
    chanquaroi.addEventListener("blur", onchangeSetnumbermoney)
}

function onchangeSetnumbermoney() {
    let chanquaroi = $('input[id="valueMoney"]');
    let valuey = chanquaroi.value;
    let app = appMoney("numberMoney");
    if (parseInt(valuey)) {
        app.add(valuey);
    }
    chanquaroi.outerHTML = `<p id="0" >${app.get()}</p>`
    getListLocalStorage();
}
//add
function addValueOnchange() {
    let input1 = $('#mucChiTieu');// mục chi tiêu
    let input2 = $('#soTienDaChi');//Sô Tiền Chi Tiêu
    if (parseInt(input2.value) > 1000 && input1.value.length > 5) {
        let obcjet = {
            mucChiTieu: input1.value,
            soTienChi: input2.value,
            sotienconlai: "",
            nhacnho:"",
            chitiet:[],
        }
        let callback = app("QuanLyChiTieu");
        callback.add(obcjet);
        displayNoneClose();
        getListLocalStorage();
    } else {
        if (parseInt(input2.value) < 1000) {
            input2.placeholder = input2.value
            input2.value = ""
            alert("vui lòng nhập lại số tiền");
        } else {
            if (parseInt(input1.value) <= 5) {
                input1.placeholder = input1.value;
                input1.value = ""
                alert("vui lòng nhập Chi Tiết");
            } else {
                input1.placeholder = input1.value;
                input1.value = "";
                alert("Vui Lòng Nhập đúng  Thông Tin");
            }
        }
    }
}

//setNumberMoney
//close
function displayNoneClose() {
    let closeButton = $('#texi__input');
    closeButton.setAttribute('value', "true")
    closeButton.setAttribute("style", "display:none");
}

function abc() {
    const inputConten = $('p[id="0"]');
    let app2 = appMoney("numberMoney");
    inputConten.innerHTML = parseInt(app2.get());
    getListLocalStorage()
}
abc();
function getListLocalStorage(list) {
    amountMoneyExistence()
    let getLocalStorage = app("QuanLyChiTieu").getAll();
    let buttonID0 = parseInt($("p[id='0']").textContent);
    $("#x").innerHTML = ""
    if (list === undefined) {
        list = getLocalStorage;
    }
    for (let i = 0; i < list.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute("class", "showListr");
        tr.innerHTML = `
        <td class="stt_">${i} </td>
        <td class="showList">
            <div>
                <p>${list[i].mucChiTieu.toUpperCase()} </p>(${new Date(list[i].timeDate).toLocaleDateString()})
            </div>
        </td>
        <td class="showList">
            <p>${list[i].soTienChi} </p>
        </td>
        <td id="${i}td" class="showList" name="showListEven">
            <p id="${i}p">${list[i].chitiet[i] === undefined ? "CLICK vào để thêm thông tin" : list[i].chitiet[i]}</p>
        </td>
        <td class="showList">
            <p>${list[i].nhacnho.message}</p>
        </td>
        <td style="display:flex">
            <button id="edit" style="width:50% ; height: 50px"  type="button">Edit</button>
            <button id="delete" onclick="deleteContent(${i})" style="width:50%; height:50px" type="button">Delete</button>
        </td>
    `
        $('#x').append(tr)
    }
    checkMoney();
}
getListLocalStorage();

function deleteContent(key) {
    console.log(key)
    let getLocalStorage = app("QuanLyChiTieu");
    getLocalStorage.remove(key);
    getListLocalStorage()
}

//check_show_Money
function amountMoneyExistence() {
    let arrayListnew = amountMoneyExistence2();
    let app2 = app("QuanLyChiTieu");
    const MESSAGE__GOOD = "Good Limit Reached ";
    const ERROR_MESSAGE = " Day Limit Exceeded !!!";
    for (let i = 0; i < arrayListnew.length; i++) {
        if (arrayListnew[i].sotienHieu > 0) {
            let objcet = {
                ...app2.getAll()[i],
                nhacnho: {
                    message: `<h3 style="line-height:30px; ">${MESSAGE__GOOD}</h3> <hr> <p style="background-color:#d1d127;" >${Math.floor(arrayListnew[i].sotienHieu)}</p>`,
                    sotien: Math.floor(arrayListnew[i].sotienTb)
                }
            }
            app2.edit(0, objcet)
        } else {
            let objcet = {
                ...app2.getAll()[i],
                nhacnho: {
                    message: `<h3 style="line-height:30px; ">${ERROR_MESSAGE}</h3> <hr> <p style="background-color:#e20606;" >${Math.floor(arrayListnew[i].sotienHieu)}</p>`,
                    sotien: Math.floor(arrayListnew[i].sotienTb)
                }
            }
            app2.edit(i,objcet)
        }
    }
}

    function checkMoney() {
        let getLocalStorage = app("QuanLyChiTieu").getAll();

        let buttonID1 = $("button[id='1']");
        let count = getLocalStorage.reduce((count, item) => {
            return count + parseInt(item.soTienChi);
        }, 0);
        let buttonID0 = parseInt($("p[id='0']").textContent);
        buttonID1.innerHTML = count;

        let buttonID2 = parseInt(`${parseInt(buttonID0) - count < 0 ? parseInt(buttonID0) - count : 0}`);
        $('button[id="2"]').innerHTML = buttonID2
        //số tiền còn lại
        $('button[id="3"]').innerHTML = buttonID0 - count - buttonID2;
    }

    function display_options(e) {
        let inputValueTime = $('input[id="time__option"]');
        let idvalue = $('div[id="id1"]')
        let a = $('select[id="danhmuc__chitiet"]')
        if (!a.classList.contains("display__none" && !inputValueTime.classList.contains("display__none")) && !idvalue.classList.contains("display__none")) {
            idvalue.classList.toggle("display__none")
        }
        a.classList.toggle("display__none");
    }

    function amountMoneyExistence2() {
        let arrayList = app("QuanLyChiTieu").getAll();
        const array = []; //
        const arrayTimeDay = []; // timeDay
        const arrayMoneyTargets = [];// số tiền chi
        const arrayMoney = [];// số tiền ban đầu;
        const arrrayHieu = [];
        arrayMoney.push(parseInt($("p[id='0']").textContent));
        let item = 0;
        let count = 0;
        const day = 31;
        for (const item of arrayList) {

            arrayTimeDay.push(new Date(item.timeDate).getUTCDate().toString());
            arrayMoneyTargets.push(item.soTienChi);
        }
        for (i = 0; i < arrayTimeDay.length; i++) {
            if (day - arrayTimeDay[i] * 1 === (day - arrayTimeDay[i + 1] * 1) || arrayTimeDay[i + 1] === undefined) {
                array.push(arrayMoney[count] / (day - arrayTimeDay[i] * 1));
                item += arrayMoneyTargets[i] * 1;
            } else {
                array.push(arrayMoney[count] / (day - arrayTimeDay[i] * 1));
                item += arrayMoneyTargets[i] * 1;
                arrayMoney.push(arrayMoney[count] - item);
                item = 0;
                count++;
            }
            arrrayHieu.push({
                sotienTb: array[i],
                sotienHieu: array[i] - arrayMoneyTargets[i]
            });
        }
        return arrrayHieu;
    }



//hàm thêm mục  chi tiêu
    $('button[id="check"]').onclick = function () {
        let a = $('#texi__input');
        if (a.getAttribute("value")) {
            a.style = "display:flex"
            a.value = false;
        }
    }
    //nội dụng chi tiết
let tdName=$$('td[name="showListEven"]')
for (let i = 0; i < tdName.length; i++) {
    tdName[i].onclick =function (e) {
        let app1=app("QuanLyChiTieu").getAll();
        e.stopPropagation();
        $(`p[id="${i}p"]`).outerHTML=`<textarea id="${i}p"></textarea>`
        let a=$(`textarea[id="${i}p"]`);
            a.onblur=function(e){
                e.stopPropagation();
                let obcjet={
                    ...app1[i],
                }
                obcjet.chitiet[i]=a.value;
                console.log(obcjet)
                let app2=app("QuanLyChiTieu")
                app2.edit(i,obcjet);
                resetsmessage(i)
            }
    }
}
function resetsmessage(key) {
    let app2 = app("QuanLyChiTieu").getAll();
    let b = $(`textarea[id="${key}p"]`)
    b.outerHTML = `<p id="${key}p">${app2[key].chitiet[key]}</p>`
}