export class ResturantDetail{
    public id:string
    public name:string
    public reviewsCount:number
    public featuredImageUrl:string
    public highlights:string[] = []
    public phoneNumber:string
    public cuisines:string
    public priceRange:number
    public timings:string[]
    public url:string
    public thumbnailUrl:string
    public resturantRating:ResturantRating
    public resturantLocation:ResturantLocation
    constructor(data?:any){
        if(!data)
            return
        this.id = data['id']
        this.name = data['name']
        this.reviewsCount = +data['all_reviews_count']
        this.featuredImageUrl = data['featured_image']
        this.highlights = data['highlights']
        this.phoneNumber = data['phone_numbers']
        this.priceRange = data['price_range']
        this.timings = data['timings'].split(',')
        this.cuisines = data['cuisines']
        this.thumbnailUrl = data['thumb']
        if(!this.thumbnailUrl){
            this.thumbnailUrl = 'assets/images/ic_resturant_default.png'
        }
        this.url = data['url']
        this.resturantRating = new ResturantRating(data['user_rating'])
        this.resturantLocation = new ResturantLocation(data['location'])
    }
}

export class ResturantRating{
    public rating:number
    public ratingText:string
    public votes:number
    constructor(data?:any){
        this.rating = +data['aggregate_rating']
        this.ratingText = data['rating_text']
        this.votes = +data['votes']
    }
}
export class ResturantLocation{
    public address:string
    public city:string
    public locality:string
    public latitude:string
    public longitude:string
    
    constructor(data?:any){
        if(!data)
            return
        this.address = data['address']
        this.city = data['city']
        this.locality = data['locality']
        this.latitude = data['latitude']
        this.longitude = data['longitude']
    }
}