function newton(_fun, _left, _right, _eps) {
    let data = []

    let f = 0,
        df = 0,
        x = 0,
        x0 = 0,
        fl = _fun.evaluate({ x: _left }),
        ddf = math.derivative(math.derivative(_fun, 'x'), 'x').evaluate({ x: _left })

    if (fl * ddf > 0)
        x0 = _left
    else
        x0 = _right

    x = x0 - _fun.evaluate({ x: x0 }) / math.derivative(_fun, 'x').evaluate({ x: x0 });
    while (Math.abs(x0 - x) > _eps) {
        x0 = x;

        x = x0 - _fun.evaluate({ x }) / math.derivative(_fun, 'x').evaluate({ x });

        data.push({ x, f })
    }

    const eps = (_eps - Math.abs(f)) / 2

    return { x, f, eps, data }
}

function dichotomies(_fun, _left, _right, _eps) {
    let data = []

    let f = 0,
        x = 0,
        l = _left,
        r = _right

    do {
        x = (l + r) / 2

        f = _fun.evaluate({ x })

        if (f > 0)
            r = x
        else
            l = x

        data.push({ x, f })

    } while (Math.abs(r - l) > _eps)

    const eps = (_eps - Math.abs(f)) / 2

    return { x, f, eps, data }
}