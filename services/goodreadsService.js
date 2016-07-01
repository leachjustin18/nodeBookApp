const http = require('http');
const xml2js = require('xml2js');
const parser = xml2js.Parser({
    explicitArray: false
});

var str;

var goodreadsService = () => {

    var getBookById = (id, cb) => {
        var options = {
            host: 'www.goodreads.com',
            path: '/book/show?format=xml&key=q3LLHH1Ax8I6Go0AruSw&id=' + id
        };

        //Goodread callback 
        var callback = (response) => {
            str = '';
            response.on('data',

                (returnData) => {
                    str += returnData
                });

            response.on('end', () => {
                parser.parseString(str,
                    (err, result) => {
                        cb(null, result.GoodreadsResponse.book);
                    });
            });
        };

       http.request(options, callback).end();
    };

    return {
        getBookById: getBookById
    };

};

module.exports = goodreadsService;