export function getCookie(key) {

    if (document?.cookie === '') {
        return null
    }

    let value;

    document?.cookie?.split(';')?.forEach((item) => {
        if (item.split('=')[0] === key) {
            value = item.split('=')[1]
        }
    })

    let token = window.atob(value)

    return token
}


export function setCookie(cookiename, cookiedata) {

    let data = window.btoa(cookiedata)

    const maxAge = 60 * 60 * 24; // 24 hour in seconds

    document.cookie = `${cookiename}=${data}; max-age=${maxAge}; path=/`

}


export function deleteCookie(cookiename) {

    document.cookie = `${cookiename}==; max-age=0; path=/`

}