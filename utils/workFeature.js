class workFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const fil = ["sort", "page", "limit", "fields"];
    const reqObj = { ...this.queryString };
    // console.log(this.queryString);
    fil.forEach((el) => {
      if (reqObj[el]) delete reqObj[el];
    });
    this.query = this.query.find(reqObj);
    return this;
  }

  sorted() {
    if (this.queryString.sort)
      this.query = this.query.sort(this.queryString.sort.split(",").join(" "));
    else this.query = this.query.sort("-createdAt");
    return this;
  }
  paginate() {
    const limit = this.queryString.limit || 4;
    const page = this.queryString.page || 1;
    const skip = limit * (page - 1);
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
  limitField() {
    const { fields } = this.queryString;
    if (fields) {
      this.query = this.query.select(fields.split(",").join(" "));
    }
    return this;
  }
}

module.exports = workFeature;
