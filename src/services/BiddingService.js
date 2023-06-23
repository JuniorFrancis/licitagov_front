import AbstractService from "services/AbstractService";

class BiddingService extends AbstractService {

    getBids(publicationDate = null, page, size) {
       if(publicationDate){
        return this.get(`/bidding?publicationDate=${publicationDate}&page=0&size=10`);
       }
    
       return this.get(`/bidding?page=${page}&size=${size}`);
    }

    setVisible(payload) {
        return this.post(`/bidding`, payload);
    }

}

export default new BiddingService();