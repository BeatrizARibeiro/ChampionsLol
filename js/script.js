async function start() {

    const database = await fetch('https://ddragon.leagueoflegends.com/cdn/14.20.1/data/pt_BR/champion.json')

    const data = await database.json()

    document.getElementById('loader').style.display = 'none'

    document.getElementById('container').style.display = 'grid'

    addCards(data.data)
}


async function info(id) {

    const database = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.19.1/data/pt_BR/champion/${id}.json`)

    const champion = await database.json()

    modal(champion.data)
}


const classes = {
    assassin: {
        id: "Assassin",
        image: "img/tags/assassin.png",
        description: "Assassino"
    },
    fighter: {
        id: "Fighter",
        image: "img/tags/fighter.png",
        description: "Lutador"
    },
    mage: {
        id: "Mage",
        image: "img/tags/mage.png",
        description: "Mago"
    },
    marksman: {
        id: "Marksman",
        image: "img/tags/marksman.png",
        description: "Atirador"
    },
    support: {
        id: "Support",
        image: "img/tags/support.png",
        description: "Suporte"
    },
    tank: {
        id: "Tank",
        image: "img/tags/tank.png",
        description: "Tanque"
    }
}


function addCards(champions) {

    const cards = document.getElementById('container')

    Object.values(champions).forEach(champion => {

        let tagsChampion = ""

        champion.tags.forEach(tag => {
            Object.keys(classes).forEach(className => {
                if (classes[className].id === tag) {
                    tagsChampion += `
                    <div class="tag-item">
                        <img src="${classes[className].image}" class="tag">
                        <span>${classes[className].description}</span>
                    </div>`
                }
            })
        })

        let card = `
            <div class="card" onclick="info('${(champion.id)}')">
                <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg" class="image">
                <h3 class="name" id="${champion.id}"> ${(champion.name).toUpperCase()} </h3>
                <p class="title"> ${(champion.title).toUpperCase()} </p>
                <hr>
                <div class="tags">
                    ${tagsChampion}
                </div>
            </div>`

        cards.innerHTML += card
    })
}


function modal(infos) {

    const modal = document.getElementById('modal')

    modal.innerHTML = ""

    let content = ""

    Object.values(infos).forEach(info => {
        content = `
        <div class="info">
            <div class="top">
                <h1>${(info.name).toUpperCase()}</h1>
                <svg width="40" viewBox="0 0 70 69" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="document.getElementById('modal').close()" class="close">
                    <g id="close">
                        <rect id="back" x="1" y="1" width="67.6104" height="66.7179" rx="14" fill="#0D2046" stroke="#C89B3C" stroke-width="2"/>
                        <g id="frame">
                            <path id="x" d="M22.3444 51.9127L18.7412 48.3095L32.0944 34.9564L18.7412 21.6032L22.3444 18L35.6976 31.3531L49.0507 18L52.6539 21.6032L39.3008 34.9564L52.6539 48.3095L49.0507 51.9127L35.6976 38.5596L22.3444 51.9127Z" fill="#C89B3C"/>
                        </g>
                    </g>
                </svg>
            </div>
            
            <h4>${(info.title).toUpperCase()}</h4>
            <hr>
            <img class="img" src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${info.id}_0.jpg" alt="${info.name}">
            <p>${info.lore}</p>
        </div>`
    })

    modal.innerHTML += content

    modal.showModal()
}


start()