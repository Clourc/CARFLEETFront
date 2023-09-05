export class vehicleAdd {
    brand: string;

    licencePlate: string;
    model_id: number;
    fleet_id: number;

    constructor(brand: string, model_id: number) {
        this.brand = brand;
        this.licencePlate = '';
        this.model_id = model_id;
        this.fleet_id = 0;
    }

}


export const catalogueVehicle = [
    new vehicleAdd("Peugeot",6),


    /* new vehicleAdd("Renault", "BB-123-BB", { image: "https://www.renault.fr", type: "Berline", energy: "Essence", modelName: "Clio", nbDoors: "5", nbSeats: "5" }),


     new vehicleAdd("Citroen", "CC-123-CC", { image: "https://www.citroen.fr", type: "citadine", energy: "electric", modelName: "C3", nbDoors: "5", nbSeats: "5" }),

     new vehicleAdd("Peugeot", "DD-123-DD", { image: "https://www.peugeot.fr", type: "Berline", energy: "Essence", modelName: "208", nbDoors: "5", nbSeats: "5" }),

     new vehicleAdd("Renault", "EE-123-EE", { image: "https://www.renault.fr", type: "Berline", energy: "Essence", modelName: "Megane2", nbDoors: "5", nbSeats: "5" })*/
]


