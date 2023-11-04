export type Game = {
    name: string,
    created_at: string,
    id: string,
    gametype: string,
    description?: string,
    cover?: string,
}

export type Raffle = {
    id: string,
    game_id: string,
    price_name: string,
    created_at: string,
    graphics: string,
    ticket_price: number,
    max_ticket: number,
    draw_type: string,
    draw_date_time: string,
    created_count: number,
    drawn_at: string,
    updated_at: string,
}

export type RaffleTicket = {
    id: string,
    raffle_id: string,
    user_id: string,
    t_key: string,
    purchased_at: string,
    email: string,
}

export type RaffleResult = {
    id: string,
    raffle_id: string,
    winning_key: string,
    drawn_at: string,
}

export type RaffleWinner = {
    id: string,
    raffle_id: string,
    winning_key: string,
    drawn_at: string,
    prize: string,
    created_at: string,
    email: string,
}