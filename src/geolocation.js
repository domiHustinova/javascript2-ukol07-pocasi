export default class Geolocation {

    getLocation() {
        return new Promise(resolve => {
            if ('geolocation' in navigator) {

                navigator.geolocation.getCurrentPosition(position => {
                    console.log(position.coords.latitude, position.coords.longitude);

                    resolve(position)
                });
            } else {
                console.log('Smůla, nevím, kde jsi!');
            }
        });


    }
}