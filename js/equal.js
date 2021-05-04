function dichotomies(_fun, _left, _right, _eps) {
    let data = []

    let x = (_left + _right) / 2,
        f = _fun.evaluate({ x }),
        fl = _fun.evaluate({ x: _left })
    data.push({ x, f })

    while (Math.abs(f) > _eps || (_right - _left) / 2 > _eps) {
        if (fl * f <= 0) {
            _right = x
        } else {
            _left = x
            fl = f
        }

        x = (_left + _right) / 2
        f = _fun.evaluate({ x })

        data.push({ x, f })
    }

    const eps = Math.abs((_right - _left)  / 2)

    return { x, f, data, eps }
} // READY

function chord(_fun, _left, _right, _eps) {
    let data = []

    let fl = _fun.evaluate({ x: _left }),
        fr = _fun.evaluate({ x: _right })

    let x0, x = _left - fl * (_right - _left) / (fr - fl),
        f = _fun.evaluate({ x })
    data.push({ x, f })

    do {
        x0 = x

        if (fl * f <= 0) {
            _right = x
            fr = f
        } else {
            _left = x
            fl = f
        }

        x = _left - fl * (_right - _left) / (fr - fl)
        f = _fun.evaluate({ x })

        data.push({ x, f })
    } while (Math.abs(f) > _eps || Math.abs(x - x0) > _eps)

    const eps = Math.abs(x - x0)

    return { x, f, data, eps }
} // READY?

function newton(_fun, _left, _right, _eps) {
    let data = []

    let x, x0, f, df,
        f0 = _fun.evaluate({ x: _left }),
        ddf = math.derivative(math.derivative(_fun, 'x'), 'x').evaluate({ x: _left })

    if (f0 * ddf > 0) {
        x = _left
        f = f0
    } else {
        x = _right
        f = _fun.evaluate({ x: _right })
    }

    do {
        x0 = x

        df = math.derivative(_fun, 'x').evaluate({ x })
        x = x - f / df
        f = _fun.evaluate({ x })

        data.push({ x, f })
    } while (Math.abs(f) > _eps || Math.abs(x - x0) > _eps)

    const eps = Math.abs(x - x0)

    return { x, f, data, eps }
} // READY?

function gold(_fun, _left, _right, _eps) {
    let data = []

    let y = (Math.sqrt(5) + 1) / 2,
        c = _left + (_right - _left) / Math.pow(y, 2),
        d = _left + (_right - _left) / y,
        x = (_left + _right) / 2,
        f = _fun.evaluate({ x })

    while (Math.abs(f) > _eps || (_right - _left) / 2 > _eps) {
        if () {

        } else {

        }
    }
}
