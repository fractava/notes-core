import FractavaNotes from './components/FractavaNotes.vue';

export default {
    install: function (Vue, options) {
        Vue.component("FractavaNotes", FractavaNotes);

        Vue.filter('coordinatesToSvgString', function (coordinates) {
            console.log(coordinates);
            let output = "";

            for(let coordinate of coordinates) {
                output += coordinates[coordinate].x + ", " + coordinates[coordinate].y;

                if(coordinate != coordinates.length-1) {
                    output += ", ";
                }
            }
            console.log(output);
            return output;
        });
    }
}
