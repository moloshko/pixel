let header = document.querySelector("header")
let start_btn = document.querySelector("#start_btn")
let main = document.querySelector("main")
let canvas = document.querySelector("#canvas")
let input = document.querySelector("#colorpicker")
let save_btn = document.querySelector("#save_btn")
let fill_btn = document.querySelector("#fill_btn")
let erase_btn = document.querySelector("#erase_btn")
let reset_btn = document.querySelector("#reset_btn")
let draw_btn = document.querySelector("#draw_btn")

let current_color = "black"
let is_erasing = false

// обработка клика на кнопке -- Start --
start_btn.addEventListener("click", () => {
    header.style.display="none"
    main.style.display="flex"
    document.querySelector("body").style.backgroundColor="#64A8D1"
    create_canvas()
})

// Сохранение -- color --
input.addEventListener("input", (e) => {
    current_color=e.target.value
    is_erasing = false
})
// Добавляем Квадроберский холст

function create_canvas() {
    canvas.innerHTML = "";
    for (let i = 0; i < 900; i++) {
        let cage = document.createElement("div");
        cage.classList.add("cage");
        cage.style.backgroundColor = "white";
        // закрашивание при 1 клике
        cage.addEventListener("mousedown", () => {
            cage.style.backgroundColor = is_erasing ? "white" : current_color;
        });
        // закрашивание при зажатие мыши
        cage.addEventListener("mouseover", () => {
            if (is_mousedown) {
                cage.style.backgroundColor = is_erasing ? "white" : current_color;
            }
        });
        canvas.appendChild(cage);
    }

    // Загружаем сохранённый рисунок, если он есть
    const savedDrawing = JSON.parse(localStorage.getItem("save_img"));
    if (savedDrawing) {
        document.querySelectorAll(".cage").forEach((cage, index) => {
            cage.style.backgroundColor = savedDrawing[index] || "white";
        });
    }
}
   

// Кнопка для рисования квадроберов
draw_btn.addEventListener("click", () => {
    is_erasing = false
    current_color = input.value
})

// Кнопка для стирания квадроберов

erase_btn.addEventListener("click", () => {
    is_erasing = true
    current_color = "white"
})
// кнопка для сброса

reset_btn.addEventListener("click", ()=> {
    let cages = document.querySelectorAll(".cage")
    cages.forEach(cage => {
        cage.style.backgroundColor = "white"
    })
})
// кнопка для зажатие краски мыши квадробера
let is_mousedown = false
document.addEventListener("mousedown", () => {
    is_mousedown = true
})
document.addEventListener("mouseup", () => {
   is_mousedown = false
})
// кнопка для заливки квадробера
fill_btn.addEventListener("click", () => {
    let cages = document.querySelectorAll(".cage")
    cages.forEach((cage,index) => { 
    
        anime({
            targets: cage,
            backgroundColor: current_color,
            duration: 5000,
            delay: index*10,
            easing:  "easeInOutQuad"
        })
     cage.style.backgroundColor = current_color   
     })
})
//устранить баг

save_btn.addEventListener("click", ()=> {
    let cages = document.querySelectorAll(".cage") // клетки в виде массива
    let cage_color = [] // пустой массив
    cages.forEach(cage=> {
        cage_color.push(cage.style.backgroundColor || "white") 
    })

    localStorage.setItem("save_img", JSON.stringify(cage_color))
})

