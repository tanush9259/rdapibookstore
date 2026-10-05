const User = require('./models/User')
const bcrypt = require('bcrypt')

async function createAdmin() {
    try {
        let user = await User.findOne({ email: 'tanu1116766@gmail.com' });
        if (user) {
            console.log('user updated successfully...');

        } else {
            user = new User();
            user.firstName = 'Tanu';
            user.lastName = 'Sharma';
            user.mobileNo = '9259158633';
            user.email = 'tanu1116766@gmail.com';
            let password = bcrypt.hashSync('92591586',10);
            user.password = password;
            user.userType = 'admin';
            await user.save();
            console.log("user created successfully...");
        }

    } catch(err) {
        console.log(err);
    }
}
module.exports = createAdmin 

