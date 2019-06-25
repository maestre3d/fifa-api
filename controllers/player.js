const Player = require('../models/player');
const ERR_MESSAGE = 'An error ocurred.';

async function Create( req, res ) {
    const params = req.body;
    try {
        if ( !params.name || !params.surname || !params.nation ) return res.status(400).send({message: 'Fill all the fields.'});

        const playerFound = await Player.findOne({$and: [ { name: params.name }, { surname: params.surname } ]});
        if (playerFound) return res.status(400).send({ message: 'Player already exists.' });



        const player = new Player({
            name: params.name,
            surname: params.surname,
            nation: params.nation,
            alias: params.alias,
            age: params.age,
            birthdate: params.birthdate,
            team: params.team
        });

        const newPlayer = await player.save();

        newPlayer ? res.status(200).send({ player: newPlayer }) : res.status(404).send({ message: 'Error while creating player.'});

    } catch (error) {
        res.status(500).send({ message: ERR_MESSAGE + error.message });
    }
}

async function Update( req, res ) {

}

async function Delete( req, res ) {

}

async function GetById( req, res ) {

}

async function GetAll( req, res ) {
    try {
        const players = await Player.find().limit(250);
        ( players && players.length > 0 ) ? res.status(200).send({ players: players }) : res.status(404).send({ message: 'No players found.'});
    } catch (error) {
        res.status(500).send({ message: ERR_MESSAGE });
    }
}

module.exports = {
    Create,
    Update,
    Delete,
    GetAll,
    GetById
}