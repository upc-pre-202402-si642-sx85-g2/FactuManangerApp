export class Letra {
    constructor(_id, carteraId, razon_social, ruc, fecha_emision, fecha_descuento, fecha_vencimiento, valor_nominal, createdAt, updateAt) {
        this._id = _id;
        this.carteraId = carteraId;
        this.razon_social = razon_social;
        this.ruc = ruc;
        this.fecha_emision = fecha_emision;
        this.fecha_descuento = fecha_descuento;
        this.fecha_vencimiento = fecha_vencimiento;
        this.valor_nominal = valor_nominal;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
    }
}