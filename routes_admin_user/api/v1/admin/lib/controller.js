const fs = require("fs");
exports.getdata = (req, res) => {
  const userdata = req.userdata;
  const page = parseInt(req.query.page) || 1;
  const pagelimit = parseInt(req.query.pagelimit) || 3;
  const startIndex = (page - 1) * pagelimit;
  const endIndex = page * pagelimit;

  const paginateuser = userdata.slice(startIndex, endIndex);
  const pagesize = Math.ceil(userdata.length / pagelimit);
  if (page > pagesize)
    return res.status(400).json({ Message: "Page not available!" });
  return res
    .status(200)
    .json({ page_no:page, totalpages: pagesize, paginateuser });
};
