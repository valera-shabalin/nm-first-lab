const options = {
    scales: {
        yAxes: [{
            type: 'linear',
        }],
        xAxes: [{
            type: 'linear',
        }]
    }
}
const data = {
    datasets: [{
        label: 'График функции',
        fill: false,
        borderColor: '#3498db',
        pointRadius: 2,
        data: []
    }]
}

const select = document.querySelector('.fields-wrapper select')
let ctx = document.querySelector('#myChart').getContext("2d")
let chart = new Chart(ctx, { type: 'line', data, options })
let myObj = new Equal()

function updateChart(fun, left, right) {
    let data = []

    for (let i = left; i < right; i++) {
        data.push({
            x: i,
            y: fun.evaluate({ x: i })
        })
    }

    chart.data.datasets[0].data = data
    chart.update()

    return true
}

function startCalculate() {
    const fun = document.querySelector('input#fun').value
    const left = document.querySelector('input#left').value
    const right = document.querySelector('input#right').value
    const eps = document.querySelector('input#eps').value
    const method = document.querySelector('select#method')

    if (!fun || !left || !right || !eps)
        return false

    myObj.set(fun, left, right, eps)

    updateChart(myObj.fun, left, right)

    switch (method.options.selectedIndex) {
        case 0:
            const data = myObj.dichotomies()
            console.log(data)
            break
        case 1:

            break
        case 2:
            break
        default:
            break
    }
}

window.addEventListener('DOMContentLoaded', startCalculate)
select.addEventListener('change', startCalculate)
