const cnn = require('../data_static/conectionDB');

userMethods = {
    insert: async (jsonparam) => {
        const response = await cnn.query("insert into privatedata (pddocumenttype, pdcard, pdcsv, pdcountry, pddirection,"
            + "users_id_user, pdexpiredate, pdidentification) values('Card','"+jsonparam.pdcard+"','"+jsonparam.card_csv+"'," 
            +"'Ecuador', '" + jsonparam.pddirection+"'," + jsonparam.iduser + ", '"+jsonparam.pdexpirate+"', '0705288523')");
        return response;
    },
    select: async (id_user) => {
        const response = await cnn.query("select * from privatedata where users_id_user = " + id_user); 
        return response.rows;
    },
    login: async (jsonparam) => {
        const response = await cnn.query("select * from users where email_user = '"+jsonparam.email_user+"' and password_user = '"+jsonparam.password_user+"'"); 
        return response.rows;
    },
    deleteCard: async (id) => {
        const response = await cnn.query("delete from privatedata where pdid = " + id); 
        return response.rows;
    }
}

module.exports = userMethods;