import React, { useState } from "react";
import { Fade, Slide } from "react-reveal";
import emailjs from '@emailjs/browser';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';

function Contact(props) {
    if (!props.data) return null;

    const name = props.data.name;
    const street = props.data.address.street;
    const city = props.data.address.city;
    const state = props.data.address.state;
    const zip = props.data.address.zip;
    const phone = props.data.phone;
    const message = props.data.contactmessage;

    const serviceId = "service_w5jno5n";
    const templateId = "template_f65n4i8";
    const publicKey = "VaZDp9kX7NFewtdE5"; 

    const [showLoader, setShowLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const [emailMsg, setEmailMsg] = useState("");

    const [emailData, setEmailData] = useState({name: "", email: "", subject: "", message: ""});

    const handleClose = () => {
      setOpen(false);
    };

    const checkEmailSend = () => {
      if(emailData.name == "") {
        setEmailMsg('Name is required to send an email');
        setOpen(true);
        return false;
      }
      else if(emailData.email == "") {
        setEmailMsg('Email is required to send an email');
        setOpen(true);
        return false;
      }
      else if(emailData.message == "") {
        setEmailMsg('Message body cannot be empty');
        setOpen(true);
        return false;
      }
      return true;
    }

    console.log(emailData)

    const sendEmail = () => {
      event.preventDefault();
      setShowLoader(true);

      if(checkEmailSend()){
        emailjs.send(serviceId, templateId, emailData, publicKey)
        .then(response => {
          setShowLoader(false);
          setEmailMsg('Email sent successfully!');
          setOpen(true);
        }, error => {
          setShowLoader(false);
          setEmailMsg('Some error occurred while sending an email, we will get back to you!');
          setOpen(true);
        });
      }
      else{
        setShowLoader(false);
      }
    }

    const handleChange = () => {
      var id = event.target.id;
      var value = event.target.value; 
      if(id == "contactName"){
        setEmailData({...emailData, name: value});
      }else if(id == "contactEmail"){
        setEmailData({...emailData, email: value});
      }else if(id == "contactSubject"){
        setEmailData({...emailData, subject: value});
      }else if(id == "contactMessage"){
        setEmailData({...emailData, message: value});
      }
    }

    return (
      <section id="contact">
        <Fade bottom duration={1000}>
          <div className="row section-head">
            <div className="two columns header-col">
              <h1>
                <span>Get In Touch.</span>
              </h1>
            </div>

            <div className="ten columns">
              <p className="lead">{message}</p>
            </div>
          </div>
        </Fade>

        <div className="row">
          <Slide left duration={1000}>
            <div className="eight columns">
              <form action="" method="post" id="contactForm" name="contactForm">
                <fieldset>
                  <div>
                    <label htmlFor="contactName">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={emailData.name}
                      size="35"
                      id="contactName"
                      name="contactName"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={emailData.email}
                      size="35"
                      id="contactEmail"
                      name="contactEmail"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactSubject">Subject</label>
                    <input
                      type="text"
                      defaultValue={emailData.subject}
                      size="35"
                      id="contactSubject"
                      name="contactSubject"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactMessage">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      cols="50"
                      rows="15"
                      id="contactMessage"
                      name="contactMessage"
                      onChange={handleChange}
                      defaultValue={emailData.message}
                    ></textarea>
                  </div>

                  <div>
                    {
                      <button className="submit" onClick={sendEmail}>{showLoader ? <CircularProgress /> : "Submit"}</button>
                    }
                      <span id="image-loader">
                        <img alt="" src="images/loader.gif" />
                      </span>
                  </div>
                </fieldset>
              </form>

              <div id="message-warning"> Error boy</div>
              <div id="message-success">
                <i className="fa fa-check"></i>Your message was sent, thank you!
                <br />
              </div>
            </div>
          </Slide>

          <Slide right duration={1000}>
            <aside className="four columns footer-widgets">
              <div className="widget widget_contact">
                <h4>Address and Phone</h4>
                <p className="address">
                  {name}
                  <br />
                  {street} <br />
                  {city}, {state} {zip}
                  <br />
                  <span>{phone}</span>
                </p>
              </div>

              <div className="widget widget_tweets" style={{display: "none"}}>
                <h4 className="widget-title">Latest Tweets</h4>
                <ul id="twitter">
                  <li>
                    <span>
                      This is Photoshop's version of Lorem Ipsum. Proin gravida
                      nibh vel velit auctor aliquet. Aenean sollicitudin, lorem
                      quis bibendum auctor, nisi elit consequat ipsum
                      <a href="./">http://t.co/CGIrdxIlI3</a>
                    </span>
                    <b>
                      <a href="./">2 Days Ago</a>
                    </b>
                  </li>
                  <li>
                    <span>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi
                      <a href="./">http://t.co/CGIrdxIlI3</a>
                    </span>
                    <b>
                      <a href="./">3 Days Ago</a>
                    </b>
                  </li>
                </ul>
              </div>
            </aside>
          </Slide>
        </div>
        <Snackbar
          anchorOrigin = {{ vertical: 'top', horizontal: 'right' }}
          open={open}
          onClose={handleClose}
          message={emailMsg}
          key={'topRight'}
          autoHideDuration= {3000}
        />

      </section>
      
    );
}

export default Contact;



