


const { Item } = require('../models/item');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {;
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
    let filter = {};
    if (req.query.properties) {
        filter = { property: req.query.properties.split(',') };
    }

    const itemList = await Item.find(filter);


    if (!itemList) {
        res.status(500).json({ success: false });
    }
    res.send(itemList);
});

router.get(`/:id`, async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (!item) {
        res.status(500).json({ success: false });
    }
    res.send(item);
});

        router.post(`/`, uploadOptions.single(), async (req, res) => {
            const file = req.file;

            let item = new Item({
                property: req.body.property,
                bedroom: req.body.bedroom,
                furniture: req.body.furniture,

                price: req.body.price,
                note: req.body.note,
                date: req.body.text,
                reporter: req.body.reporter,
            });

            item = await item.save();

            if (!item) return res.status(500).send('The item cannot be created');

            res.send(item);
        });

router.put('/:id', uploadOptions.single(),async (req, res)=> {
    const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        {
            note: req.body.note
        },
        { new: true}
    )

    if(!updatedItem)
    return res.status(400).send('the cannot be update!')

    res.send(updatedItem);
})
router.delete('/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id)
        .then((item) => {
            if (item) {
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: 'the item is deleted!',
                    });
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: 'item not found!' });
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, error: err });
        });
});




module.exports =router;