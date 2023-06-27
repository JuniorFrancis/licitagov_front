import AbstractService from "services/AbstractService";

class BiddingService extends AbstractService {

    getBids(publicationDate = null, page, size) {
       if(publicationDate){
        return this.get(`/bidding?publicationDate=${publicationDate}&page=${page}&size=${size}`);
       }
    
       return this.get(`/bidding?page=${page}&size=${size}`);
    }

    setBiddingAsVisualized(payload) {
        return this.post(`/bidding/visualize`, payload);
    }

}

export default new BiddingService();