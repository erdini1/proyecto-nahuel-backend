import moment from "moment-timezone";

const timezone = "America/Argentina/Ushuaia";

const formatDate = (date) => {
	return moment(date).tz(timezone).format("YYYY-MM-DD HH:mm:ss");
}

export default formatDate;