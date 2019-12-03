export class ResturantReview {
    public rating:number
    public reviewText:string
    public reviewTimeFriendly:string
    public reviewUser:ReviewUser
    constructor(data?:any) {
        if(!data){
            return
        }
        data = data['review']
        this.rating = data['rating']
        this.reviewText = data['review_text']
        this.reviewTimeFriendly = data['review_time_friendly']
        this.reviewUser = new ReviewUser(data['user'])
    }
}

export class ReviewUser{
    public name:string
    public profileImageUrl:string
    constructor(data?:any) {
        if(!data){
            return
        }
        this.name = data['name']
        this.profileImageUrl = data['profile_image']
    }
}