import { Box, Button, TextField } from "@mui/material";
import "./contact.css";
import Typography from "@mui/material/Typography";
import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
import doneAnimation from "../../animation/animation-done.json";
import errorAnimation from "../../animation/error.json";
const Contact = () => {
  const [state, handleSubmit] = useForm("mrbgekgr");

  return (
    <>
      <section className="sec-contact container">
        <Box className="left-sec-contact">
          <Box className="tob-left-sec-contact">
            <Typography variant="h5">
              <span className="icon-phone1 icon-contact" /> Call To Us
            </Typography>
            <Typography variant="body1">
              We are available 27/10, 7 days a week
            </Typography>
            <Typography variant="body1">
              Phone: <a href="tel:01025526633">01025526633</a>
            </Typography>
          </Box>
          <Box className="bottom-left-sec-contact">
            <Typography variant="h5">
              <span className="icon-envelope-o icon-contact " /> Write To Us
            </Typography>
            <Typography variant="body1">
              Fill out the form, and we will contact you within 24 hours.
            </Typography>
            <Typography variant="body1">
              Email: youssefelbadry10@gmail.com
            </Typography>
          </Box>
        </Box>

        <Box
          className="right-sec-contact"
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box className="tob-right-sec-contact" component="div">
            <Box>
              <TextField
                required
                label="Your Name"
                variant="outlined"
                name="name"
                fullWidth
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
              />
            </Box>
            <Box>
              <TextField
                required
                label="Your Email"
                variant="outlined"
                type="email"
                name="email"
                fullWidth
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </Box>
            <Box>
              <TextField
                required
                label="Your Phone"
                variant="outlined"
                name="phone"
                fullWidth
              />
              <ValidationError
                prefix="Phone"
                field="phone"
                errors={state.errors}
              />
            </Box>
          </Box>
          <Box className="bottom-right-sec-contact">
            <TextField
              multiline
              required
              fullWidth
              label="Your Message"
              rows={6}
              variant="outlined"
              name="message"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {state.succeeded && (
                  <>
                    <Lottie
                      loop={false}
                      style={{ height: 70 }}
                      animationData={doneAnimation}
                    />

                    <span style={{ color: "green", fontSize: "20px" }}>
                      Your message has been successfully sent.
                    </span>
                  </>
                )}
                {state.errors && (
                  <>
                    <Lottie
                      loop={false}
                      style={{ height: 70 }}
                      animationData={errorAnimation}
                    />
                    <span style={{ color: "red", fontSize: "22px" }}>
                      Please fill in the fields
                    </span>
                  </>
                )}
              </div>

              <Button
                variant="contained"
                className="button-contact"
                type="submit"
                disabled={state.submitting}
              >
                {state.submitting
                  ? "Sending ..."
                  : state.succeeded
                  ? "Sended"
                  : "Send Message"}
              </Button>
            </Box>
          </Box>
        </Box>
      </section>
    </>
  );
};

export default Contact;
