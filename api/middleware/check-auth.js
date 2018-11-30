const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try{
        //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5pdCIsInVzZXJJZCI6IjViZWJlM2E1M2IxOWRjNjI2ZDhkNWY0MiIsImlhdCI6MTU0MjE5MTMzNiwiZXhwIjoxNTQyMTk0OTM2fQ.NebrNR_OoUmDSHzT7sc0H4A8fiBjFAJwJ7gTB4R42BI
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        req.userData = decoded;

        console.log(decoded);

        //successfully authenticated
        next(); 
    }catch(error){
        return res.status(401).json({
            message: "Athentication failed!!"
        });
    }
};