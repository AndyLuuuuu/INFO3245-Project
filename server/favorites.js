const dbQuery = {
    selectFavorite: 'SELECT id, movie_id FROM favorites WHERE user_id = $1',
    insertFavorite: 'INSERT INTO favorites(user_id, movie_id) VALUES ($1, $2) RETURNING *',
    deleteFavorite: 'DELETE FROM favorites WHERE id = $1',
}

const dbSelectFav = (db, userId, callback) => {
    
    db.query(dbQuery.selectFavorite, [userId], (err, res) => {
        if (err) {
            return callback(false);
        }
        if (res.rows.length) {
            const favorites = [];
            res.rows.forEach(fav => {
                favorites.push(fav);
            });

            return callback(true, favorites);
        }
    });
}

const dbInsertFav = (db, favData, callback) => {
    const {userId, movieId} = favData;

    db.query(dbQuery.insertFavorite, [userId, movieId], (err, res) => {
        if (err) {
            return callback(false);
        }
        callback(true);
    });
}

const dbDeleteFav = (db, favId, callback) => {
    db.query(dbQuery.deleteFavorite, [favId], (err, res) => {
        if (err) {
            return callback(false);
        }
        callback(true);
    })
}

module.exports = {dbSelectFav, dbInsertFav, dbDeleteFav}