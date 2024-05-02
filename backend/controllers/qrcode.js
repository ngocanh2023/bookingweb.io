const qr = require('qrcode');
const nodemailer = require('nodemailer');
const QRCode = require("../models/qrcode")

exports.generateQR = async (req, res, next) => {
    const email = req.query.email;

    const qrImage = await qr.toDataURL(email);
    // const qrBuffer = Buffer.from(qrImage.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    // console.log('QR code ', email, req.query);
    // console.log('qrimage', qrImage);
    // console.log('qrBuffer', qrBuffer)

    try {
        const existingQRCode = await QRCode.findOne({ email });
        if (existingQRCode) {
            await QRCode.deleteOne({ email });
        }
        const newQRCode = new QRCode({
            email: email,
            qrCode: qrImage,
            // image: qrBuffer,
        });
        await newQRCode.save();
        res.json({ qrImage })
    } catch (e) {
        console.log(e)
    }

}
exports.checkQRCode = async (req, res) => {
    const { qrCode } = req.body;
    let email;
    console.log('req.body', req.body)
    
const sendEmail = (email) => {
    if (email) {
        // Send email to confirm to the customer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'anhvnfx18783@funix.edu.vn',
                pass: 'rrde ggpg gowe dhoy',
            },
        });

        const mailOptions = {
            from: 'anhvnfx18783@funix.edu.vn',
            to: [`${email}`],
            subject: 'QR Code Confirmation',
            text: 'Your QR code has been confirmed.',
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.send(email);
    } else {
        res.send('QR code not found');
    }
}

QRCode.findOne({ qrCode })
        .then(result => { 
            email = result.email;
            sendEmail(email);
        })
        .catch(e => console.log(e))
    
}