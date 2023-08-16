import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import photo from "../../assets/images/manager.jpg";
import arrow from "../../assets/svg/arrow.svg";
import { ADMIN_PATHES } from "../../utils/constants";
import styles from "./Admin.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Admin: FunctionComponent = () => {
  const admin = {
    name: "Jacob Jones",
    phone: "405 555 0128",
    role: "manager",
    photo: { photo },
  };
  return (
    <div className={styles.wrapper}>
      <Paper className={styles.container}>
        <img className={styles.photoWidth} src={photo} alt="main manager" />
        <div className={styles.mainInfo}>
          <h1>{admin.name}</h1>
          <p>{admin.phone}</p>
        </div>
        <div>{admin.role}</div>
      </Paper>
      <Paper className={styles.actions}>
        <h2>Actions</h2>
        <div>
          <ul>
            {ADMIN_PATHES.map((item) => {
              const { path, text } = item;

              return path !== "/admin" ? (
                <li key={path} className={styles.action_type}>
                  <Button>
                    <Link to={path} className={styles.link}>
                      {text}
                    </Link>
                    <img src={arrow} alt="" />
                  </Button>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </Paper>
      <Paper className={styles.privacy}>
        {/* <h2>Privacy</h2> */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h2>Privacy</h2>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={styles.privacy_description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
};
