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
    const playerID = req.params.id;
    try {
        const player = req.body;
        const updatedPlayer = await Player.findByIdAndUpdate(playerID, player);
        updatedPlayer ? res.status(200).send({ player: updatedPlayer }) : res.status(404).send({ message: 'Player not found.'});
    } catch (error) {
        res.status(500).send({ message: ERR_MESSAGE });
    }
}

async function Delete( req, res ) {
    const playerID = req.params.id;
    try {
        const deletedPlayer = await Player.findByIdAndRemove(playerID);
        deletedPlayer ? res.status(200).send({ player: deletedPlayer }) : res.status(404).send({ message: 'Player not found.'});
    } catch (error) {
        res.status(500).send({ message: ERR_MESSAGE });
    }
}

async function GetById( req, res ) {
    const playerID = req.params.id;
    try {
        const player = await Player.findById(playerID);
        player ? res.status(200).send({ player: player }) : res.status(404).send({ message: 'Player not found.'});

    } catch (error) {
        res.status(500).send({ message: ERR_MESSAGE });
    }
}

function GetAll( req, res ) {
    const pageNumber = req.query.page || 1;
    Player.paginate({}, { page: pageNumber, limit: 20 }).then((players) => {
        ( players && players.docs.length > 0 ) ? res.status(200).send({ players: players }) : res.status(404).send({ message: 'No players found.'});
    })
    .catch((error) => res.status(500).send({ message: ERR_MESSAGE }));
}

module.exports = {
    Create,
    Update,
    Delete,
    GetAll,
    GetById
}