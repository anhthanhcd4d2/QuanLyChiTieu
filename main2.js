function amountMoneyExistence2(arrayList) {
    const array = []; //
    const arrayTimeDay = []; // timeDay
    const arrayMoneyTargets = [];// số tiền chi
    const arrayMoney = [];// số tiền ban đầu;
    const arrrayHieu = [];
    arrayMoney.push(parseInt($("button[id='0']").textContent));
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
        document.getElementById("a").textContent
        arrrayHieu.push({
            sotienTb: array[i],
            sotienHieu: array[i] - arrayMoneyTargets[i]
        });
    }
    return arrrayHieu;
}
