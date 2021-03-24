class Equal {
    constructor(fun = '', left = 0, right = 0, eps = 0) {
        this.set(fun, left, right, eps)
    }

    createTable(data, eps) {
        let table = document.querySelector('.table table')

        let html = `<tr>
                        <td><strong>Значение X</strong></td>
                        <td><strong>Значение F(X)</strong></td>
                    </tr>`

        data.forEach(item => {
            html += `<tr>
                        <td>${item.x}</td>
                        <td>${item.f}</td>
                    </tr>`
        })

        html += `<tr>
                    <td colspan="2"><strong>Погрешность:</strong> ${eps}</td>
                </tr>`

        table.innerHTML = html

        return true
    }

    dichotomies() {
        let i = 0,
            f = 0,
            x = 0,
            l = this.left,
            r = this.right,
            data = []

        do {
            x = (l + r) / 2

            f = this.fun.evaluate({ x })

            if (f > 0)
            {
                r = x
            }
            else
            {
                l = x
            }

            data.push({ x, f })

            i++
        } while (Math.abs(f) > this.eps)

        const resEps = (this.eps - Math.abs(f)) / 2

        this.createTable(data, resEps)

        return { x, f, resEps }
    }

    set(fun, left, right, eps) {
        this.fun = math.parse(fun)
        this.left = Number(left)
        this.right = Number(right)
        this.eps = Number(eps)
    }
}