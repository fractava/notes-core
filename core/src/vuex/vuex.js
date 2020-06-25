export default {
    state: {
        debug: false,
    },
    mutations: {
        setDebug(debug, value) {
            console.log("setting debug to "+value);
            debug = value;
        },
    },
};
