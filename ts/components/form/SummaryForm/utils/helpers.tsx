export const validateNotEmpty = (
    value: string | number
): string | undefined => {
    let error

    if (!value) {
        error = 'To pole nie powinno być puste'
    }
    return error
}

export const validateMinCharacters = (
    value: string | number,
    min: number
): string | undefined => {
    let error
    const valueString = `${value}`

    if (valueString.length < min) {
        error = `Minimum ${min} znaków`
    }
    return error
}

export const validateMaxCharacters = (
    value: string | number,
    max: number
): string | undefined => {
    let error

    const valueString = `${value}`
    if (valueString.length > max) {
        error = 'To pole jest za długie'
    }
    return error
}

export const validateLength = (
    value: string | number,
    length: number
): string | undefined => {
    let error: string | undefined

    const valueString = `${value}`

    if (valueString.length !== length) {
        error = `To pole musi mieć ${length} znaków`
    }

    return error
}

export const validateRegon = (value: string | number): string | undefined => {
    //REGON is a 9 or 14 digit number. Last digit is control digit from equation:
    // [ sum from 1 to (9 or 14) (x[i]*w[i]) ] mod 11; where x[i] is pointed NIP digit and w[i] is pointed digit
    //from [8 9 2 3 4 5 6 7] for 9 and [2 4 8 5 0 9 7 3 6 1 2 4 8] for 14 digits.

    const valueString = `${value}`
    let error: string | undefined
    const n = valueString.length
    const regex = /^([\d]{9}|[\d]{14})$/
    if (n === 0) {
        return
    }
    const validateLength = regex.test(valueString)
    let w
    let cd = 0 // Control digit (last digit)

    if (n === 9) {
        w = [8, 9, 2, 3, 4, 5, 6, 7]
    } else {
        w = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8]
    }

    for (let i = 0; i < n - 1; i++) {
        cd += w[i] * parseInt(valueString.charAt(i))
    }

    cd %= 11

    if (cd === 10) {
        cd = 0
    }

    if (!validateLength) {
        error = 'To pole musi mieć 9 lub 14 znaków'
    } else if (cd !== parseInt(valueString.charAt(n - 1))) {
        error = 'REGON nie jest poprawny'
    }

    return error
}

export const validateEmail = (value: string | number): string | undefined => {
    let error: string | undefined
    const valueString = `${value}`
    const regex =
        // eslint-disable-next-line no-useless-escape
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,7})+$/
    if (!regex.test(valueString)) {
        error = 'Email nie jest poprawny'
    }

    return error
}
