import { formatISO9075 } from "date-fns";

/**
 * log middleware
 */
 export const logger = (req, res, next) => {
  const formatted_date = formatISO9075(new Date());
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  let log = `[${formatted_date}] ${method}:${url} ${status}`;
  console.log(log);
  next();
 };



