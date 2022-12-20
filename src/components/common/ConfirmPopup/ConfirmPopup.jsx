import classNames from "classnames";
import React from "react";
import { useLanguageData } from "../../../context/LanguageProvider";
import { Popup } from "../../UI";
import classes from "./ConfirmPopup.module.scss";

const ConfirmPopup = ({
  text = "",
  title = "",
  onYes = () => {},
  onNo = () => {},
  yesText = "Yes",
  noText = "No",
}) => {
  const { t } = useLanguageData();

  return (
    <Popup close={onNo} title={title}>
      <div>
        {text && <div className={classes.text}>{t[text]}</div>}
        <div className={classes.buttonGroup}>
          <button
            onClick={onYes}
            className={classNames(classes.button, classes.button_green)}
          >
            {t[yesText]}
          </button>
          <button
            onClick={onNo}
            className={classNames(classes.button, classes.button_blue)}
          >
            {t[noText]}
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default ConfirmPopup;
