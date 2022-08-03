class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        //Product.find({name:"Samosa"})
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {}


        // console.log(keyword)
        this.query = this.query.find(keyword);
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        // If we would do queryCopy=this.queryStr then the reference will be copies which means the original this.queryStr object is also getting affected and with the ... operator a new copy of the object will be assigned tot he object

        const removeFileds = ['keyword', 'page', 'limit'];



        removeFileds.forEach((key) => {
            delete queryCopy[key];
        })

        //Filter for price and Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, function (key) {
            return '$' + key;
        })

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page);
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.find(this.query).limit(resultPerPage).skip(skip)
        return this;
    }



} // class finish


module.exports = ApiFeatures;