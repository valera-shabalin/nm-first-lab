class Equal {
    constructor(fun = '', left = 0, right = 0, eps = 0) {
        this.set(fun, left, right, eps)
    }

    dichotomies() {
        let f = 0,
            x = 0,
            l = this.left,
            r = this.right,
            data = []

        do {
            x = (l + r) / 2

            f = this.fun.evaluate({ x })

            if (f > 0)
                r = x
            else
                l = x

            data.push({ x, f })

        } while (Math.abs(r - l) > this.eps)

        const eps = (this.eps - Math.abs(f)) / 2

        return { f, x, eps, data }
    }

    newton() {
        let f = 0,
            df = 0,
            x = 0,
            h = 0,
            data = [],
            fl = this.fun.evaluate({ x: this.left }),
            ddf = math.derivative(this.fun, 'x')

        ddf = math.derivative(ddf, 'x').evaluate({ x: this.left })

        if (fl * ddf > 0)
            x = this.left
        else
            x = this.right

        do {
            f = this.fun.evaluate({ x })
            df = math.derivative(this.fun, 'x').evaluate({ x })

            x = x - f / df

            data.push({ x, f })

        } while(Math.abs(f) > this.eps)

        const eps = (this.eps - Math.abs(f)) / 2

        return { f, x, eps, data }
    }

    set(fun, left, right, eps) {
        this.fun = math.parse(fun)
        this.left = +left
        this.right = +right
        this.eps = +eps
    }
}