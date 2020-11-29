const dbQuery = {
    selectFavorite: 'SELECT * FROM favorites WHERE user_id = $1',
    insertFavorite: 'INSERT INTO favorites(user_id, movie_id, movie_name, poster_url) VALUES ($1, $2, $3, $4) RETURNING *',
    deleteFavorite: 'DELETE FROM favorites WHERE user_id = $1 AND movie_id = $2',
}

const dbSelectFav = (db, userId, callback) => {
    console.log(db, userId, callback)
    db.query(dbQuery.selectFavorite, [userId], (err, res) => {
        if (err) {
            console.log(err)
            return callback(false);
        }
        if (res.rows) {
            return callback(true, res.rows);
        }
    });
}

const dbInsertFav = (db, favData, callback) => {
    const {userId, movieId, movieName, posterUrl} = favData;

    db.query(dbQuery.insertFavorite, [userId, movieId, movieName, posterUrl], (err, res) => {
        if (err) {
            console.log(err)
            return callback(false);
        }
        callback(true);
    });
}

const dbDeleteFav = (db, favData, callback) => {
    const {userId, movieId} = favData;
    db.query(dbQuery.deleteFavorite, [userId, movieId], (err, res) => {
        if (err) {
            return callback(false);
        }
        callback(true);
    })
}

module.exports = {dbSelectFav, dbInsertFav, dbDeleteFav}