class Equal {
    constructor(fun = '', left = 0, right = 0, eps = 0) {
        this.fun = math.parse(fun)
        this.left = Number(left)
        this.right = Number(right)
        this.eps = Number(eps)
        this.ctx = document.querySelector('#myChart').getContext("2d")
        this.data = []

        this.createChart()
    }

    createData() {
        for (let i = this.left - 10; i < this.right + 10; i++) {
            this.data.push({
                x: i,
                y: this.fun.evaluate({ x: i })
            })
        }
    }

    createChart() {
        this.createData()

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
                data: this.data
            }]
        }

        this.chart = new Chart(this.ctx, { type: 'line', data, options })
    }

    dichotomies() {
        let i = 0, f = 0

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

            console.log(`x = ${x}, f(x) = ${f}`)

            i++
        } while (Math.abs(f) > this.eps)

        return { x, f }
    }
}

function startCalculate() {
    const fun = document.querySelector('input#fun').value
    const left = document.querySelector('input#left').value
    const right = document.querySelector('input#right').value
    const eps = document.querySelector('input#eps').value
    const method = document.querySelector('select#method')
    const methodIndex = method.options.selectedIndex

    let myObj = new Equal(fun, left, right, eps)

    console.log(method[methodIndex].label)
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

window.addEventListener('DOMContentLoaded', () => {
    startCalculate()

    const fields = document.querySelectorAll('.fields-wrapper input')
    const select = document.querySelector('.fields-wrapper select')

    fields.forEach(item => {
        item.addEventListener('input', startCalculate)
    })
    select.addEventListener('change', startCalculate)
})