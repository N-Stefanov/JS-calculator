window.onload = function() {
    var result,
        numbersLength,
        textArea,
        zero,
        operator,
        point,
        limit;
    var finalResult = document.getElementById('finalResult');
    var elem = document.querySelectorAll(".allOperators");
    var stopOperator = document.querySelectorAll(".stopOperator");
    var stopOperatorLenght = stopOperator.length;
    var mainOperators = document.querySelectorAll(".mainOperators");


    for (var i = 0; i < stopOperatorLenght; i++) {
        stopOperator[i].disabled = true;
    }
    var operatorsLength = elem.length;

    result = document.getElementById('result');
    var listNumber = document.querySelectorAll('.number');
    numbersLength = listNumber.length;
    var count = 0;
    for (var i = 0; i < numbersLength; i++) {
        listNumber[i].addEventListener("click", function() {

            for (var i = 0; i < stopOperatorLenght; i++) {
                stopOperator[i].disabled = false;
            }

            document.getElementById('zero').disabled = false;
            count++;

            var numValue = this.value;
            if (result.innerHTML === "0") {
                textArea = result.innerHTML = numValue;
            } else { textArea = result.innerHTML += numValue; }

            limit = count;
            if (limit >= 10) {
                for (var i = 0; i < numbersLength; i++) {
                    listNumber[i].disabled = true;
                }
            }
            for (var i = 0; i < mainOperators.length; i++) {
                mainOperators[i].disabled = false;
            }
        });
    }


    document.querySelector(".zero").addEventListener("click", function() {
        zero = this.value;
        count++;
        limit = count;
        if (limit <= 10) {
            if (result.innerHTML === "") {
                document.getElementById('zero').disabled = true;
                textArea = result.innerHTML = zero;
            } else if (result.innerHTML === textArea) {
                textArea = result.innerHTML += zero;

            } else if (/./.test(textArea)) {
                textArea = result.innerHTML += zero;
            }
            var textAreaTest = [].slice.apply(textArea);
            for (var i = 0; i < textAreaTest.length; i++) {
                var reg = new RegExp('^[1-9.]$');
                if (/\+|\-|\*|\//.test(textAreaTest[i])) {
                    if (textAreaTest[i + 1] === "0") {
                        document.getElementById('zero').disabled = true;
                        result.innerHTML = result.innerHTML + "."
                        document.getElementById('point').disabled = true;
                    }
                    if (reg.test(textAreaTest[i + 2])) {
                        document.getElementById('zero').disabled = false;
                    }
                }
            }
        } else {
            document.getElementById('zero').disabled = true;
        }
        for (var i = 0; i < stopOperatorLenght; i++) {
            stopOperator[i].disabled = false;
        }
        for (var i = 0; i < mainOperators.length; i++) {
            mainOperators[i].disabled = false;
        }
    });

    document.querySelector(".equal").addEventListener("click", function() {
        for (var i = 0; i < numbersLength; i++) {
            listNumber[i].disabled = false;
        }

        for (var i = 0; i < stopOperatorLenght; i++) {
            stopOperator[i].disabled = false;
        }

        count = 0;
        if (result.innerHTML === textArea) {
            var fixResult = eval(textArea);
            parseInt(fixResult);

            finalResult.innerHTML = Math.round(fixResult * 1000) / 1000;

            result.innerHTML = "";
            if (finalResult.innerHTML === "Infinity") {
                alert('Cannot divide by zero');
                finalResult.innerHTML = "";

            }
            document.getElementById('zero').disabled = false;


        } else {
            result.innerHTML = "";
        }
        for (var i = 0; i < stopOperatorLenght; i++) {
            stopOperator[i].disabled = true;
        }
        for (var i = 0; i < mainOperators.length; i++) {
            mainOperators[i].disabled = false;
        }
    });


    document.querySelector(".delete").addEventListener("click", function() {
        for (var i = 0; i < numbersLength; i++) {
            listNumber[i].disabled = false;
        }
        result.innerHTML = "";
        finalResult.innerHTML = "";
        textArea = "";
        count = 0;
        document.getElementById('point').disabled = false;
        document.getElementById('zero').disabled = false;
        for (var i = 0; i < stopOperatorLenght; i++) {
            stopOperator[i].disabled = true;
        }
        for (var i = 0; i < mainOperators.length; i++) {
            mainOperators[i].disabled = false;
        }
    });


    //OPERATORI !!!
    for (var i = 0; i < operatorsLength; i++) {

        elem[i].addEventListener("click", function() {
            allOperators = this.value;
            for (var i = 0; i < numbersLength; i++) {
                listNumber[i].disabled = false;
            }
            for (var i = 0; i < mainOperators.length; i++) {
                mainOperators[i].disabled = true;
            }
            count = 0;

            document.getElementById('point').disabled = false;

            if (result.innerHTML === "" || textArea) {
                result.innerHTML = result.innerHTML.concat(allOperators);
            } else if (result.innerHTML === "+" || result.innerHTML === "-") {
                result.innerHTML = textArea.concat(operator);
            }
            document.querySelectorAll('.divide').disabled = true;
        });
    }


    //POINT !!!
    document.querySelector(".point").addEventListener("click", function() {
        document.getElementById('point').disabled = true;
        point = this.value;

        if (result.innerHTML === "") {

            textArea = result.innerHTML = result.innerHTML.concat("0.");

        } else if (result.innerHTML === textArea) {

            result.innerHTML = result.innerHTML.concat(".");

        }

        for (var i = 0; i < stopOperatorLenght; i++) {
            stopOperator[i].disabled = false;
        }
        document.getElementById('zero').disabled = false;
    });
}