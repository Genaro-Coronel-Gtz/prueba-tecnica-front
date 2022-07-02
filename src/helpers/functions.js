import moment from "moment";
import "moment/locale/es";

export const formatDate = (date) => {
  return moment(date).format("DD MMMM YYYY, h:mm:ss a");
};
