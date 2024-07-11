const db = require('../Utils');

const router = require('express').Router();


//create
router.post("/create", (req, res, next) => {
    try {
        console.log(req.body)
        const { heading, disc, img, priority } = req.body;
        const sql = 'INSERT INTO users (heading,discription,image,priority) VALUES(?)';
        console.log(req.body)

        const values = [heading, disc, img, priority];

        db.query(sql, [values], (err, data) => {
            if (err) {
                console.log(err)
                return res.json("ERRROOOO>>>00")
            }
            return res.json({
                "success": true
            })
        })

    }
    catch (err) {

    }
})


//getdata
router.get("/getdata", (req, res, next) => {
    try {
        const sql = "SELECT * FROM users";
        db.query(sql, (err, data) => {
            if (err) {
                return res.json("ERROR>>>")
            }

            return res.json(
                {
                    data: data,
                    length: data.length
                })
        })

    } catch (err) {



    }
})

//getByID
router.post("/getById", (req, res, next) => {

    try {
        const { id } = req.body;
        const sql = 'SELECT * FROM users WHERE id = ?';
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.json("ERROR>>>")
            }
            console.log(data[0])
            return res.json(data[0])
        })


    } catch (err) {

    }

})


//updateByID 
router.put("/upadteById", (req, res, next) => {

    try {

        const { heading, disc, img, priority, id } = req.body;
        console.log(req.body)
        const values = [heading, disc, img, priority, id];
        const sql = "UPDATE users SET heading = ? ,discription = ? , image = ? , priority = ? WHERE id = ? ";

        db.query(sql, [...values, id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json("ERRROOOOupdate>>>")
            }
            return res.json({
                success: true
            })
        })

    } catch (err) {

    }

})


//deletAPi
router.delete("/delete", (req, res, next) => {
    const { id } = req.body;
    console.log(id)
    const sql = 'delete from users where id = ? ';
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.log(err)
            return res.json("DeleteERror>>>")
        }
        return res.json({
            success: true,
            message: "Delete User successfullyyyy!!!"
        })
    })

})


// filterthedata

router.post("/filter", (req, res, next) => {
    try {
        const { filterdata } = req.body;

        if (filterdata === 'all') {
            try {
                const sql = "SELECT * FROM users";
                db.query(sql, (err, data) => {
                    if (err) {
                        return res.json("ERROR>>>")
                    }

                    return res.json(
                        {
                            data: data,
                            length: data.length
                        })
                })

            } catch (err) {
            }
        }
        else {
            const sql = "SELECT * from users WHERE priority = ?"
            db.query(sql, [filterdata], (err, data) => {
                if (err) {
                    return res.json("ERROR>>>")
                }

                return res.json(
                    {
                        data: data,
                        length: data.length
                    })
            })
        }

    } catch (err) {

    }

})




module.exports = router;