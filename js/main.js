const options = {
    scales: {
        xAxes: [{
            type: 'linear'
        }]
    }
}
const data = {
    datasets: [{
        label: 'График функции',
        fill: false,
        pointRadius: 2,
        data: []
    }]
}

let ctx = document.querySelector('#myChart').getContext("2d")
const select = document.querySelector('.fields-wrapper select')

let chart = new Chart(ctx, { type: 'line', data, options })

function createData(fun, left = 0, right = 0) {
    let data = []

    for (let i = left - 10; i < right + 10; i++) {
        data.push({
            x: i,
            y: fun.evaluate({ x: i })
        })
    }

    return data
}

function updateChart(fun, left, right) {
    const newData = createData(fun, left, right)
    chart.data.datasets[0].data = newData
    chart.update()
}

function startCalculate() {
    const fun = document.querySelector('input#fun').value
    const left = document.querySelector('input#left').value
    const right = document.querySelector('input#right').value
    const eps = document.querySelector('input#eps').value
    const method = document.querySelector('select#method')
    const methodIndex = method.options.selectedIndex

    let myObj = new Equal(fun, left, right, eps)

    updateChart(myObj.fun, left, right)

    switch (methodIndex) {
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

class Equal {
    constructor(fun = '', left = 0, right = 0, eps = 0) {
        this.fun = math.parse(fun)
        this.left = Number(left)
        this.right = Number(right)
        this.eps = Number(eps)
    }

    createTable(data) {
        let wrapper = document.querySelector('.table .container')
        let table = document.querySelector('.table table')

        let html = '<tr><td>Значение X</td><td>Значение F(X)</td></tr>'

        data.forEach(item => {
            html += `<tr>
                        <td>${item.x}</td>
                        <td>${item.f}</td>
                    </tr>`
        })

        table.innerHTML = html

        wrapper.appendChild(table)
    }

    dichotomies() {
        let i = 0, f = 0, data = []

        let x = (this.left + this.right) / 2

        do {
            f = this.fun.evaluate({ x })

            if (f > 0)
            {
                this.right = x
            }
            else
            {
                this.left = x
            }

            x = (this.left + this.right) / 2

            data.push({ x, f })

            i++
        } while (Math.abs(f) > this.eps && i < 20000)

        this.createTable(data)

        return { x, f }
    }
}

select.addEventListener('change', startCalculate)
window.addEventListener('DOMContentLoaded', startCalculate)