function dichotomies(_fun, _left, _right, _eps) {
    const data = []

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

    const eps = (_right - _left)  / 2

    return { data, eps }
} // READY

function chord(_fun, _left, _right, _eps) {
    const data = []

    let fl = _fun.evaluate({ x: _left }),
        fr = _fun.evaluate({ x: _right })

    let x0, x, f

    do {
        x = _left - fl * (_right - _left) / (fr - fl)
        f = _fun.evaluate({ x })

        if (fl * f <= 0) {
            x0 = _right
            _right = x
            fr = f
        } else {
            x0 = _left
            _left = x
            fl = f
        }

        data.push({ x, f })
    } while (Math.abs(f) > _eps || Math.abs(x - x0) > _eps)

    const eps = Math.abs(x - x0)

    return { data, eps }
} // READY?

function newton(_fun, _left, _right, _eps) {
    const data = []

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

    return { data, eps }
} // READY

function gold(_fun, _left, _right, _eps) {
    const data = [],
          y = (Math.sqrt(5) + 1) / 2

    let d = _left + (_right - _left) / y,
        c = _right - d + _left,
        fd = _fun.evaluate({ x: d }),
        fc = _fun.evaluate({ x: c }),
        fa = _fun.evaluate({ x: _left }),
        x, f
        
    do {
        if (fa * fd <= 0) {
            _right = d
            d = c
            fd = fc
            c = _right - d + _left
            fc = _fun.evaluate({ x: c })
        } else {
            _left = c
            fa = fc
            c = d
            fc = fd
            d = _right - c + _left
            fd = _fun.evaluate({ x: d })
        }

        x = (_left + _right) / 2
        f = _fun.evaluate({ x })

        data.push({ x, f })
    } while (Math.abs(f) > _eps || (_right - _left) / 2 > _eps)

    const eps = Math.abs((_right - _left)  / 2)

    return { data, eps }
} // READY

function iteration(_fun, _left, _right, _eps) {
    const data = []

    let fmax = _fun.evaluate({ x: _left }),
        step = _left + _eps, fs

    while (step < _right) {
        fs = _fun.evaluate({ x: step })
        fmax = Math.abs(fs) > Math.abs(fmax) ? fs : fmax
        step += _eps
    }

    let x = _left, x0,
        f = _fun.evaluate({ x })

    do {
        x0 = x

        x = x - f / fmax
        f = _fun.evaluate({ x })

        data.push({ x, f })
    } while(Math.abs(f) > _eps || Math.abs(x - x0) > _eps)

    const eps = Math.abs(x - x0)

    return { data, eps }
} // READY

function combination(_fun, _left, _right, _eps) {
    const data = []

    let fl = _fun.evaluate({ x: _left }),
        fr = _fun.evaluate({ x: _right }),
        ddfl = math.derivative(math.derivative(_fun, 'x'), 'x').evaluate({ x: _left }),
        dfl = math.derivative(_fun, 'x').evaluate({ x: _left }),
        dfr = math.derivative(_fun, 'x').evaluate({ x: _right })

    let x, f, c, fc

    do {
        x = _left - fl * (_right - _left) / (fr - fl)
        f = _fun.evaluate({ x })

        if (fl * ddfl > 0) {
            _right = x
            fr = f

            _left = _left - fl / dfl
            fl = _fun.evaluate({ x: _left })
            dfl = math.derivative(_fun, 'x').evaluate({ x: _left })
            ddfl = math.derivative(math.derivative(_fun, 'x'), 'x').evaluate({ x: _left })
        } else {
            _left = x
            fl = f

            _right = _right - fr / dfr
            fr = _fun.evaluate({ x: _right })
            dfr = math.derivative(_fun, 'x').evaluate({ x: _right })
        }

        c = (_left + _right) / 2
        fc = _fun.evaluate({ x: c })

        data.push({ x: c, f: fc })
    } while (Math.abs(fc) > _eps || (_right - _left) / 2 > _eps)

    const eps = (_right - _left) / 2

    return { data, eps }
} // READY?

// 2 - 3