const axios = require("axios");

const sendEmailController = async (req, res) => {
  try {
    const {name, email, msg} = req.body;

    // validation
    if (!name || !email || !msg) {
      return res
        .status(500)
        .send({success: false, message: "Please Provide All Fields"});
    }

    // Web3Forms API key
    const web3formsApiKey = process.env.API_WEB3FORMS;

    // email submission data
    const emailData = {
      access_key: web3formsApiKey,
      subject: "Regarding MERN Portfolio App",
      from_name: name,
      from_email: email,
      message: msg,
      reply_to: email,
      to: "condorialvaro95@gmail.com",
    };

    // Send email via Web3Forms
    const response = await axios.post(
      "https://api.web3forms.com/submit",
      emailData
    );

    // Check response
    if (response.data.success) {
      return res.status(200).send({
        success: true,
        message: "Your Message Sent Successfully",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Failed to send message",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({success: false, message: "Send Email API Error", error});
  }
};

module.exports = {sendEmailController};
