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
let equal = new Equal()

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
    console.group("Update chart")
    console.log(data)
    console.log(`Dataset[${index}]`)
    console.groupEnd()

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
                     <td>${item.x}</td>
                     <td>${item.f}</td>
                 </tr>`
    })

    html += `<tr>
                 <td colspan="3"><strong>Погрешность:</strong> ${eps}</td>
             </tr>`

    table.innerHTML = html

    return true
}

/* Main function which start calculation */
function startCalculate(event) {
    event.preventDefault()

    const fun = document.querySelector('input#fun').value
    const left = +document.querySelector('input#left').value
    const right = +document.querySelector('input#right').value
    const eps = +document.querySelector('input#eps').value
    const method = select.options.selectedIndex

    if (!fun || !left || !right || !eps)
        return false

    equal.set(fun, left, right, eps)

    const chartData = createData(equal.fun, left, right)
    updateChart(chartData)

    switch (method) {
        case 0:
        {
            const result = equal.dichotomies()
            createTable(result.data, result.eps)
            break
        }
        case 1:
        {
            const result = equal.newton()
            createTable(result.data, result.eps)
            break
        }
        case 2:
            break
        default:
            break
    }
}

/* DOM events */
window.addEventListener('DOMContentLoaded', startCalculate)
select.addEventListener('change', startCalculate)
form.addEventListener('submit', startCalculate)
