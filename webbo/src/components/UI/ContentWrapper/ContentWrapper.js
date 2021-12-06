import "./ContentWrapper.css";
import Paper from "../Paper";
import Title from "../Title";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "../../UI/TitleStyle";
import ActionValidator from "../../../validators/ActionValidator";
import FloatingButton from "../../UI/FloatingButton/FloatingButton";
import { useMediaQuery } from "react-responsive";

/**
 *
 * @property {string} size width of wrapper. Values: extraSmall, small, medium, large
 * @property {string} title
 * @returns
 */

const ContentWrapper = (props) => {
    let history = useHistory();
	const classes = useStyles();
	const isMobile = useMediaQuery({ query: `(max-width: 768px)` });


    return (
        <form className={"contentWraper " + props.size}>
            <Paper elevation={1}>
                {props.title && (
                    <Title>
                        {props.roleId && (
                            <IconButton
                                className={classes.arrowBack}
                                onClick={() => {
                                    history.replace(
                                        props.enteredFromAdd
                                            ? "/administration/roles/rolesManagement"
                                            : "/administration/roles/roleForm/" +
                                                  props.roleId
                                    );
                                }}
                            >
                                <ArrowBack />
                            </IconButton>
                        )}
                        {props.back && (
                            <IconButton
                                className={classes.arrowBack}
                                onClick={() => {
                                    history.goBack();
                                }}
                            >
                                <ArrowBack />
                            </IconButton>
                        )}
                        {props.link && (
                            <IconButton
                                className={classes.arrowBack}
                                onClick={() => {
                                    history.push(props.link);
                                }}
                            >
                                <ArrowBack />
                            </IconButton>
                        )}
                        <span className={classes.title}>{props.title}</span>
                        {ActionValidator(props.validator) && props.linkAdd && (
                            <div
                                className={classes.newWrapper}
                                onClick={() =>
                                    history.push(
                                        props.linkAdd
                                    )
                                }
                            >
                                <span hidden={isMobile} className={classes.newItem}>
                                    {props.text}
                                </span>
                                <FloatingButton elevation={5}></FloatingButton>
                            </div>
                        )}
                    </Title>
                )}{" "}
                <div className={"contentWrapper_content"}>{props.children}</div>
            </Paper>
        </form>
    );
};

export default ContentWrapper;
