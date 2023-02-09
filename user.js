function getServerData() {
    let main = document.getElementById("user-container")
    main.innerHTML = null
    axios.get(`https://json-server-firstapi.onrender.com/cart`).then((res) => {
        console.log(res.data);
        let data = res.data;
        data.map((each) => {
            let eachbookdiv = document.createElement("div")
            let bimgdiv = document.createElement("div")
            let bimg = document.createElement("img")
            bimgdiv.append(bimg)
            bimg.src = each.image_url
            let bname = document.createElement("h2")
            bname.innerHTML = each.book_name
            let bauther = document.createElement("p")
            bauther.innerHTML = each.author
            let bgenre = document.createElement("p")
            bgenre.innerHTML = each.genre
            let bedition = document.createElement("p")
            bedition.innerHTML = each.edition
            let bpublisher = document.createElement("p")
            bpublisher.innerHTML = each.publisher
            let bcost = document.createElement("p")
            bcost.innerHTML = each.cost
            let borrowbtn = document.createElement("button")
            borrowbtn.innerHTML = "Borrow"
            if (!each.borrowed) {
                borrowbtn.style.backgroundColor = "green"
            } else {
                borrowbtn.style.backgroundColor = "red"
            }
            eachbookdiv.append(bimgdiv, bname, bauther, bgenre, bedition, bpublisher, bcost, borrowbtn)
            main.append(eachbookdiv)
        })
    })
}
getServerData()