const domain = "https://gamer.adefemigreat.com"

export const game = {
    create: `${domain}/game/create`,
    list: `${domain}/game`,
    detail: `${domain}/game/get/`,
}

export const raffle = {
    create: `${domain}/raffle/create-price`,
    list: `${domain}/raffle`, // takes query params game_id, and optional limit and offset
    detail: `${domain}/raffle/get/`, // takes uri param raffle_id,
    draw: `${domain}/raffle/draw`,
    getTickets: `${domain}/raffle/tickets`, // takes query params raffle_id, and optional limit and offset
    getResults: `${domain}/raffle/results`, // takes query params raffle_id, and optional limit and offset
    getWinners: `${domain}/raffle/winners`, // takes query params raffle_id, and optional limit and offset
}

export const auth = {
    login: `${domain}/auth/login`,
}