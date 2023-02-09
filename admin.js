//localStorage.setItem("authd", JSON.stringify(false))
let isAuth = JSON.parse(localStorage.getItem("authd")) || false;
console.log(isAuth);
if (!isAuth) {
    location.href = "./login.html";
}

document.getElementById("login-form").addEventListener("submit", getFormdata);
function getFormdata(e) {
    e.preventDefault();
    let payload = {
        image_url:
            document.getElementById("image_url").value ||
            "https://m.media-amazon.com/images/I/5165He67NEL.jpg",
        book_name: document.getElementById("book_name").value || "",
        author: document.getElementById("author").value || "",
        genre: document.getElementById("genre").value || "",
        edition: document.getElementById("edition").value || "",
        publisher: document.getElementById("publisher").value || "",
        cost: document.getElementById("cost").value || "",
        borrowed: document.getElementById("borrowed").value || false,
    };
    let {
        image_url,
        book_name,
        author,
        genre,
        edition,
        publisher,
        cost,
        borrowed,
    } = payload;
    if (
        image_url &&
        book_name &&
        author &&
        genre &&
        edition &&
        publisher &&
        cost &&
        borrowed
    ) {
        axios
            .post(`https://json-server-firstapi.onrender.com/cart`, payload)
            .then((res) => {
                alert("posted on server");
                console.log(res.data);
                getServerData();
            });
    } else {
        alert("fill the empty filed then try again");
    }
}

// function createTableRow(data) {
//     return `<tr><td>${data.image_url}</td><td>${data.book_name}</td><td>${data.author}</td><td>${data.genre}</td>
//         <td>${data.edition}</td>
//         <td>${data.publisher}</td>
//         <td>${data.cost}</td>
//         <td>${data.borrowed}</td>
//         <td><button>Edit</button></td>
//         <td><button>Delete</button></td>
//     </tr>`
// }

function getServerData() {
    axios.get(`https://json-server-firstapi.onrender.com/cart`).then((res) => {
        console.log(res.data);
        let data = res.data;
        let tabelbody = document.getElementById("tbody");
        tabelbody.innerHTML = null
        data.map((el) => {
            let tr = document.createElement("tr")

            let bookImg = document.createElement("img")
            bookImg.src = el.image_url
            bookImg.setAttribute("width", "100px")
            bookImg.setAttribute("height", "100px")

            let name = document.createElement("td")
            name.innerText = el.book_name

            let author = document.createElement("td")
            author.innerText = el.author

            let genre = document.createElement("td")
            genre.innerText = el.genre

            let edition = document.createElement("td")
            edition.innerText = el.edition

            let publisher = document.createElement("td")
            publisher.innerText = el.publisher

            let price = document.createElement("td")
            price.innerText = el.cost

            let borrowed = document.createElement("td")
            borrowed.innerText = el.borrowed
            let editbuttontd = document.createElement("td")
            let Edit = document.createElement("button");
            Edit.innerText = "Edit";

            Edit.setAttribute("id", "edit");
            Edit.onclick = function (event) {
                editing(el);
            };
            editbuttontd.append(Edit)
            let deletebuttontd = document.createElement("td")

            let Delete = document.createElement("button")
            deletebuttontd.append(Delete)
            Delete.innerText = "Delete"
            Delete.addEventListener("click", function () {
                // console.log(el.id,"el.id")
                axios.delete(`https://json-server-firstapi.onrender.com/cart/${el.id}`).then((res) => {
                    getServerData()
                    alert("deleted successfully")
                })
            })



            tr.append(bookImg, name, author, genre, edition, publisher, price, borrowed, editbuttontd, deletebuttontd)

            document.getElementById("tbody").append(tr)

        });
    });
}
getServerData();


function editing(el) {
    // console.log(e)
    let modal = document.getElementById("modal")
    modal.style.visibility = "visible"
    let closebtn = document.getElementById("closebtn")
    closebtn.addEventListener("click", () => {
        modal.style.visibility = "hidden"
    })


    document.getElementById("bookImgedit").value = el.image_url;
    document.getElementById("nameedit").value = el.book_name;
    document.getElementById("authoredit").value = el.author;
    document.getElementById("genreedit").value = el.genre;
    document.getElementById("editionedit").value = el.edition;
    document.getElementById("publisheredit").value = el.publisher;
    document.getElementById("priceedit").value = el.cost;
    document.getElementById("borrowededit").value = el.borrowed

    let submit = document.getElementById("formedit")
    submit.addEventListener("submit", upadateForm)

    function upadateForm(e) {
        e.preventDefault()
        let id = el.id
        // console.log(id)
        let payload = {
            image_url:
                document.getElementById("bookImgedit").value ||
                "https://m.media-amazon.com/images/I/5165He67NEL.jpg",
            book_name: document.getElementById("nameedit").value || "",
            author: document.getElementById("authoredit").value || "",
            genre: document.getElementById("genreedit").value || "",
            edition: document.getElementById("editionedit").value || "",
            publisher: document.getElementById("publisheredit").value || "",
            cost: document.getElementById("priceedit").value || "",
            borrowed: document.getElementById("borrowededit").value || false,
        }
        axios.patch(`https://json-server-firstapi.onrender.com/cart/${id}`, payload).then((res) => {
            getServerData()
            alert("updated successfully")
            modal.style.visibility = "hidden"
        })
        console.log(payload)
    }
}
