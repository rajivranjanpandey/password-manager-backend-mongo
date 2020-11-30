const generateRandomNumber = (length = 3) => {
    let num10s = 1;
    let num1s = 1;
    for (let i = 1; i < length; i++) {
        num10s *= 10;
        num1s += num10s;
    }
    let generatedNum = Math.floor(num10s + Math.random() * (num1s * 9));
    const diff = generatedNum.toString().length - length;
    if (diff) {
        generatedNum = parseInt(generatedNum / 10 ** diff);
        return generatedNum;
    } else
        return Number(generatedNum);
}
module.exports = {
    generateRandomNumber
}