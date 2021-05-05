/* Slider options */
const mySliderOptions = {
    scales: {
        yAxes: [
            {
                type: 'linear',
            }
        ],
        xAxes: [
            {
                type: 'linear',
            }
        ]
    }
}
const mySliderData = {
    datasets: [
        {
            label: 'График функции',
            pointBackgroundColor: '#3498db',
            borderColor: '#3498db',
            fill: false,
            data: []
        }
    ]
}

/* Interface */
const select = document.querySelector('.fields-wrapper select')
const form = document.querySelector('.fields-wrapper')

/* Chart */
let ctx = document.querySelector('#myChart').getContext("2d")
let chart = new Chart(ctx, {
        type: 'line',
        data: mySliderData,
        options: mySliderOptions
})

/* Function for create data */
function createData(fun, left, right) {
    let data = []

    for (let i = left - 4; i < right + 4; i++) {
        data.push({
            x: +i,
            y: +fun.evaluate({ x: i })
        })
    }

    return data
}

/* Function for updating chart */
function updateChart(data = [], index = 0) {
    chart.data.datasets[index].data = data
    chart.update()

    return true
}

/* Function for create the table with results */
function createTable(data, eps) {
    let table = document.querySelector('.table table')

    let html = `<tr>
                    <td class="number"><strong>№</strong></td>
                    <td><strong>Значение X</strong></td>
                    <td><strong>Значение F(X)</strong></td>
                </tr>`

    data.forEach((item, index) => {
        html += `<tr>
                     <td class="number">${++index}</td>
                     <td>${item.x.toFixed(5)}</td>
                     <td>${item.f.toFixed(5)}</td>
                 </tr>`
    })

    html += `<tr>
                 <td colspan="3"><strong>Погрешность:</strong> ${eps.toExponential(3)}</td>
             </tr>`

    table.innerHTML = html

    return true
}

/* Main function which start calculation */
function startCalculate(event) {
    event.preventDefault()

    const _fun = document.querySelector('input#fun').value
    const left = +document.querySelector('input#left').value
    const right = +document.querySelector('input#right').value
    const eps = +document.querySelector('input#eps').value
    const method = select.options.selectedIndex

    if (!_fun || !left || !right || !eps)
        return false

    let fun = math.parse(_fun)

    const chartData = createData(fun, left, right)
    updateChart(chartData)

    switch (method) {
        case 0:
        {
            const result = dichotomies(fun, left, right, eps)
            createTable(result.data, result.eps)
            break
        }
        case 1:
        {
            const result = chord(fun, left, right, eps)
            createTable(result.data, result.eps)
            break
        }
        case 2:
        {
            const result = gold(fun, left, right, eps)
            createTable(result.data, result.eps)
            break
        }
        case 3:
        {
            const result = newton(fun, left, right, eps)
            createTable(result.data, result.eps)
            break
        }
        case 4:
        {
            const result = iteration(fun, left, right, eps)
            createTable(result.data, result.eps)
            break
        }
        case 5:
        {
            const result = combination(fun, left, right, eps)
            createTable(result.data, result.eps)
            break
        }
        default:
        {
            break
        }
    }
}

/* DOM events */
window.addEventListener('DOMContentLoaded', startCalculate)
select.addEventListener('change', startCalculate)
form.addEventListener('submit', startCalculate)
