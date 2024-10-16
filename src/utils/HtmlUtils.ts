
function toTop(): void{
    document.body.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

function getTime(tiem: string){
    const date = new Date(Date.parse(tiem))
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDay()
        + " " + date.getHours() + ":" + date.getMinutes()
}

export { toTop, getTime }