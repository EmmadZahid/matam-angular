export class ResturantCity {
    public id: string
    public name: string
    public countryName: string
    public countryFlagUrl: string
    constructor(id?: string, name?: string, countryName?: string, countryFlagUrl?: string) {
        this.id = id
        this.name = name
        this.countryName = countryName
        this.countryFlagUrl = countryFlagUrl
    }
}