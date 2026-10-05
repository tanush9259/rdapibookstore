const Mobile = require('../models/Mobile')

 async function addMobile(req,res) {
    try {
         console.log(req.body)
        console.log(req.file)
        cloudinary.config({
            cloud_name: "dtnj3vjad",
            api_key: "836243925894637",
            api_secret: "z0rnS46iWj8QmEKtGeux95BLEpo"
        })
        const upload = await cloudinary.uploader.upload(req.file.path)
        console.log(upload)
        req.body.mobileImage = upload.secure_url;

        console.log(req.body)
        let mobile = new Mobile(req.body)
        await mobile.save();
        console.log("Data saved successfully...")
        res.status(200).send({ message: 'Data has been saved successfilly'})
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: 'Something went wrong' })

    }
}
async function getMobiles(req, res) {
    try {
       // let books = await Book.find({});
       // console.log(books)
       let totalMobiles = await Mobile.countDocuments({});
       console.log(totalMobiles, 'totalmobiles')
       
       let mobiles = await mobile.find({mobileName: new RegExp(req.query.searchMobile, "i") }).skip((req.query.pageNo - 1)*(req.query.mobilesPerPage)).limit(req.query.mobilesPerPage);
        res.status(200).send({ data: mobiles, totalMobiles: totalMobiles })

    } catch(err) {
        console.log(err)
        res.status(400).send({ message: err })

    }
}
async function deleteMobile(req, res) {
    try {
        id = req.params.id;
        await Mobile.deleteOne({ _id: id });
        res.status(200).send({ success: true })
    } catch (err) {
         console.log(err)
         res.status(400).send({ success: false })
        
    }
}
async function getMobileForEdit(req,res) {
    try {
        let id = req.params.id;
        console.log(id);
        let mobile = await Mobile.findOne({ _id: id });
        console.log(mobile)
        res.status(200).send({ data: mobile })
    } catch (err) {
        console.log(err)
        res.status(400).send({ data: err })
    }
}
async function editMobile(req,res) {
    try {
        let id = req.params.id;
        console.log(id)
        let mobile = req.body;
        console.log(mobile)
        await Book.updateOne({_id: id}, req.body)
        console.log("Mobile updated successfully..")
        res.status(200).send({ success: true })

    } catch (err) {
        console.log(err)
         res.status(400).send({ success: false })
    }
}
module.exports = {
    addMobile,
    getMobiles,
    deleteMobile,
    getMobileForEdit,
    editMobile
    

}
